const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getTag = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.json(getTag);
  } catch (err) {
    res.json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if(!getTag) {
      res.json({ message: "Not Found"});
    }
    res.json(getTag)
  } catch (err) {
    res.json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const postTag = await Tag.create(req.body);
    res.json(postTag);
  } catch (err) {
    res.json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const putTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!putTag) {
    res.json({ message: "Not Found" });
    }
    res.json(putTag);
  } catch (err) {
    res.json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destory({
      where: {
        id: req.params.id
      }
    });
    if(!deleteTag) {
      res.json({ message: "Not Found" });
    }
    res.json(deleteTag)
  } catch (err) {
    res.json(err)
  }
});

module.exports = router;
