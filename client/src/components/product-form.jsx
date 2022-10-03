import * as React from 'react';
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import ProductService from '../services/product-service';

const ProductForm = ({
  onSubmit,
  initValues,
  formTitle,
  submitText,
  flexDirectionValue,
  widthValue,
}) => {
  const [categories, setCategories] = React.useState([]);
  const [title, setTitle] = React.useState(initValues?.title ?? '');
  const [category, setCategory] = React.useState(initValues?.categoryId ?? '');
  const [price, setPrice] = React.useState(initValues?.price ?? '');
  const [description, setDescription] = React.useState(initValues?.description ?? '');
  const [img, setImg] = React.useState(initValues?.img ?? '');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title,
      description,
      categoryId: category,
      price: Number(price),
      img,
    });
    setTitle('');
    setDescription('');
    setCategory('');
    setPrice('');
    setImg('');
  };

  React.useEffect(() => {
    (async () => {
      const fethedCategories = await ProductService.fetchCategories();
      setCategories(fethedCategories);
    })();
  }, []);

  return (
    <Paper component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
      <Typography variant="h5" sx={{ textAlign: 'center', m: 1 }}>{formTitle}</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: flexDirectionValue,
        width: widthValue,
        gap: 5,
        p: 2,
      }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: 5,
          width: '100%',
        }}
        >
          <TextField
            label="Title"
            name="title"
            fullWidth
            variant="filled"
            size="small"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            label="Category"
            name="category"
            fullWidth
            select
            variant="filled"
            size="small"
            required
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map(({ id, title: categoryTitle }) => (
              <MenuItem key={id} value={id}>{categoryTitle}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: 5,
          width: '100%',
        }}
        >
          <TextField
            label="Price €"
            name="price"
            fullWidth
            variant="filled"
            type="number"
            size="small"
            required
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <TextField
            label="Image link"
            name="imageLink"
            fullWidth
            variant="filled"
            size="small"
            required
            value={img}
            onChange={(event) => setImg(event.target.value)}
          />
        </Box>
        <TextField
          label="Description"
          name="description"
          fullWidth
          variant="filled"
          required
          multiline
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Box>
      <Button type="submit" variant="contained" sx={{ alignSelf: 'center', mb: 2 }}>{submitText}</Button>
    </Paper>
  );
};

export default ProductForm;
