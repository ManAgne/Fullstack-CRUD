const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const ProductModel = require('../models/product-model');
const createProductPopulatedViewModel = require('../view-models/create-product-populated-view-model');
const createProductViewModel = require('../view-models/create-product-view-model');

const createProductNotFoundError = (productId) => createNotFoundError(`Product with id '${productId}' was not found`);

const fetchAll = async (req, res) => {
  try {
    const productPopulatedDocs = await ProductModel.find().populate('categoryId');

    res.status(200).json(productPopulatedDocs.map(createProductPopulatedViewModel));
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newProductData = req.body;

  try {
    await ProductModel.validate(newProductData);

    const newProductDoc = await ProductModel.create(newProductData)

    res.status(201).json(createProductViewModel(newProductDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const productId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newProductData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
    await ProductModel.validateUpdate(newProductData);

    const updatedProductDoc = await ProductModel.findByIdAndUpdate(
      productId,
      newProductData,
      { new: true }
    );

    if (updatedProductDoc === null) throw createProductNotFoundError(productId);

    res.status(200).json(createProductViewModel(updatedProductDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProductDoc = await ProductModel.findByIdAndDelete(productId);
    if (deletedProductDoc === null) createProductNotFoundError(productId);

    res.status(200).json(createProductViewModel(deletedProductDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  create,
  update,
  remove,
};
