const createProductPopulatedViewModel = (productPopulatedDoc) => ({
  id: productPopulatedDoc._id.toString(),
  title: productPopulatedDoc.title,
  description: productPopulatedDoc.description,
  price: productPopulatedDoc.price,
  img: productPopulatedDoc.img,
  categoryId: productPopulatedDoc.categoryId.id,
  category: productPopulatedDoc.categoryId.title,
});

module.exports = createProductPopulatedViewModel;