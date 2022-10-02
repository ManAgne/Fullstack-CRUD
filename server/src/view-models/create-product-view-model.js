const createProductViewModel = (productDoc) => ({
  id: productDoc._id.toString(),
  title: productDoc.title,
  description: productDoc.description,
  categoryId: productDoc.categoryId.toString(),
  img: productDoc.img,
  price: productDoc.price,
});

module.exports = createProductViewModel;