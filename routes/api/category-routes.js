const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const getCategory = await Category.findAll();
    res.json(getCategory);
  } catch (err) {
    res.json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!getCategory) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.json(getCategory);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const postCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(postCategory);
  } catch (err) {
    res.json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const putCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!putCategory) {
      res.json({ message: "Not Found" });
    }
    res.json(putCategory);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      return res.json({ message: "Not Found" });
    }
    res.json(deleteCategory);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
