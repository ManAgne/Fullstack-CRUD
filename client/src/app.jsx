import * as React from 'react';
import { Box, Grid, Modal } from '@mui/material';
import ProductService from 'services/product-service';
import { ProductCard, ProductForm } from './components';

const App = () => {
  const [products, setProducts] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [productInEdit, setProductInEdit] = React.useState(null);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const fetchAllProducts = async () => {
    const fetchedProducts = await ProductService.fetchAll();
    setProducts(fetchedProducts);
  };

  const createProduct = async (productProps) => {
    await ProductService.create(productProps);
    await fetchAllProducts();
  };

  const editProduct = (id) => {
    const foundProduct = products.find((x) => x.id === id);
    setProductInEdit(foundProduct);

    handleModalOpen();
  };

  const updateProduct = async (productProps) => {
    await ProductService.update(productInEdit.id, productProps);
    await fetchAllProducts();

    handleModalClose();
  };

  const removeProduct = async (id) => {
    const itemRemoved = await ProductService.remove(id);
    if (itemRemoved) {
      const fetchedProducts = await ProductService.fetchAll();
      setProducts(fetchedProducts);
    }
  };

  React.useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <Box>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        >
          <ProductForm
            onSubmit={updateProduct}
            submitText="Save and exit"
            formTitle="Edit product"
            initValues={productInEdit}
            flexDirectionValue="column"
            widthValue="50vw"
          />
        </Box>
      </Modal>

      <Box>
        <ProductForm
          onSubmit={createProduct}
          submitText="Add new Product"
          formTitle="New product creation"
        />
      </Box>
      <Grid container spacing={3} sx={{ p: 5 }}>
        {products.map(({
          id,
          title,
          description,
          category,
          price,
          img,
        }) => (
          <Grid key={id} item xs={6} sm={4} md={3} lg={2.4} xl={2} sx={{ gridAutoRows: 'max-content' }}>
            <ProductCard
              id={id}
              title={title}
              description={description}
              category={category}
              price={price}
              img={img}
              onDelete={() => removeProduct(id)}
              onEdit={() => editProduct(id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default App;
