const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ model: Product, through: ProductTag }]
  }).then((tags) => {
    res.status(200).json(tags);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
      include: [
        { 
          model: Product,
          through: ProductTag
        }
      ]
    }).then((tag) => {
      res.status(200).json(tag)
    }).catch ((err) => {
    res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then((tag) => {
    res.status(200).json(tag);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.findByPk(req.params.id).then((tag) => {
    if (!tag) {
      res.status(404).json({ message: 'No tag with this id' });
      return;
    }
    return tag.update(req.body);
  }).then((updatedTag) => {
    res.status(200).json(updatedTag);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.findByPk(req.params.id).then((tag) => {
    if (!tag) {
      res.status(404).json({ message: 'No tag with this id' });
      return;
    }
    return tag.destroy();
  }).then(() => {
    res.status(200).json({ message: 'Tag was OBLITERATED' });
  }).catch((err) => {
    res.status(500).json(err);
  });
});

module.exports = router;
