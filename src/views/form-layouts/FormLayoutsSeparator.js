// ** React Imports
import { forwardRef, useState } from "react";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// ** MUI Imports
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useDispatch } from "react-redux";
import { addProduct } from "@/features/productsSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const FormLayoutsSeparator = () => {
  // ** States
  const [open, setOpen] = useState(false);
  const [formdata, setFormdata] = useState({
    title: "",
    slug: "",
    desc: "",
    img: "",
    category: "",
    size: "",
    color: "",
    price: 0,
    availableQty: 0,
  });
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    let response = await dispatch(addProduct(formdata))
    console.log("This is response" , response)
    if(response.payload.success){
      toast.success("Product added Successfully!", {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      setFormdata({
        title: "",
        slug: "",
        desc: "",
        img: "",
        category: "",
        size: "",
        color: "",
        price: 0,
        availableQty: 0,
      })
    }
    else{
      toast.error("Error while Adding the Product!", {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  };

  const handleChange = (e) => {
    setFormdata({...formdata, [e.target.name]: e.target.value})
  };

  return (
    <Card>
      <ToastContainer 
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      {/* <CardHeader title='Add New Product' style={{textAlign: "center"}} titleTypographyProps={{ variant: 'h1' }} /> */}
      <h1 className="text-xl font-semibold text-center mb-2 mt-4">
        Add New Product
      </h1>
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleSubmitProduct}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Product Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="title"
                value={formdata.title}
                onChange={handleChange}
                type="text"
                label="Title"
                placeholder=""
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="text" name="slug" value={formdata.slug} onChange={handleChange} label="Slug" placeholder="" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="desc"
                value={formdata.desc}
                onChange={handleChange}
                label="Description"
                placeholder=""
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  label="Category"
                  defaultValue=""
                  name="category"
                  value={formdata.category}
                  onChange={handleChange}
                  id="category"
                  labelId="category"
                >
                  <MenuItem value="tshirt">T-Shirt</MenuItem>
                  <MenuItem value="hood">Hood</MenuItem>
                  <MenuItem value="sticker">Sticker</MenuItem>
                  <MenuItem value="mug">Mug</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="size">Size</InputLabel>
                <Select
                  label="Size"
                  defaultValue=""
                  name="size"
                  // value={formdata.size}
                  onChange={handleChange}
                  id="size"
                  labelId="size"
                >
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="XL">XL</MenuItem>
                  <MenuItem value="XXL">XXL</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="color">Color</InputLabel>
                <Select
                  label="Color"
                  defaultValue=""
                  name="color"
                  // value={formdata.color}
                  onChange={handleChange}
                  id="color"
                  labelId="color"
                >
                  <MenuItem value="red">Red</MenuItem>
                  <MenuItem value="blue">Blue</MenuItem>
                  <MenuItem value="black">Black</MenuItem>
                  <MenuItem value="green">Green</MenuItem>
                  <MenuItem value="yellow">Yellow</MenuItem>
                  <MenuItem value="purple">Purple</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="Number"
                name="price"
                value={formdata.price}
                onChange={handleChange}
                label="Price"
                placeholder=""
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="Number"
                label="Available Quantity"
                name="availableQty"
                value={formdata.availableQty}
                onChange={handleChange}
                placeholder=""
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ButtonStyled
                component="label"
                variant="contained"
                htmlFor="account-settings-upload-image"
                onClick={handleClickOpen}
              >
                Upload Product Image
              </ButtonStyled>
            </Grid>
            <Grid item xs={12} sm={6}>
              {formdata.img && <img
                src={`${formdata.img}`}
                alt=""
                className="mx-auto w-[70%] h-80"
              />}
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size="large" type="submit" sx={{ mr: 2 }} variant="contained">
            Submit
          </Button>
        </CardActions>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can add only one Image for your Product. Please! Paste the Link of the Image Here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="image"
            name="img"
            value={formdata.img}
            onChange={handleChange}
            label="Product Image"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default FormLayoutsSeparator;
