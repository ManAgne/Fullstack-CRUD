const { Router } = require('express');
const {
  fetchAll,
  create,
  update,
  remove,
} = require('../controllers/products-controller');

const productsRouter = Router();

productsRouter.get('/', fetchAll);

productsRouter.post('/', create);

productsRouter.patch('/:id', update);

productsRouter.delete('/:id', remove);

module.exports = productsRouter;
