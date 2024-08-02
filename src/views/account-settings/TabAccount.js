// ** React Imports
import { useState, useEffect } from "react";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { updateUserDetails } from "@/features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TabAccount = () => {
  // ** State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [statePlace, setStatePlace] = useState("");
  const [district, setDistrict] = useState("");

  const dispatch = useDispatch();

  const fetchAdmin = async () => {
    let userEmail = localStorage.getItem("loggedEmail");
    setEmail(userEmail);
    console.log("The current email is: ", userEmail);
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ token: localStorage.getItem("token") }), // body data type must match "Content-Type" header
    });
    let response = await res.json();
    // console.log("The response is: " , res)
    console.log("The required user is: ", response);

    setName(response.name);
    setAddress(response.address);
    setPincode(response.pincode);
    setPhone(response.phone);

    getPinCode(response.pincode);
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const getPinCode = async (pin) => {
    if (pin.length == 6) {
      let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
      let pinJson = await pins.json();
      if (Object.keys(pinJson.pincodes).includes(pin)) {
        setStatePlace(pinJson.pincodes[pin][1]);
        setDistrict(pinJson.pincodes[pin][0]);
      } else {
        setStatePlace("");
        setDistrict("");
      }
    } else {
      setStatePlace("");
      setDistrict("");
    }
  };

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      getPinCode(e.target.value);
    }
  };

  const handleUserSubmit = async () => {
    // e.preventDefault()
    let response = await dispatch(
      updateUserDetails({
        token: localStorage.getItem("token"),
        address,
        name,
        pincode,
        phone,
      })
    );
    console.log(response);
    if (response.payload.success) {
      toast.success("Successfully Updated Details", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Error While Updating Details", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // const onChange = file => {
  //   const reader = new FileReader()
  //   const { files } = file.target
  //   if (files && files.length !== 0) {
  //     reader.onload = () => setImgSrc(reader.result)
  //     reader.readAsDataURL(files[0])
  //   }
  // }

  return (
    <CardContent>
      <form>
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
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box> */}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="name"
              onChange={handleChange}
              value={name}
              type="text"
              label="Name"
              placeholder=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              name="email"
              // onChange={handleChange}
              value={email}
              placeholder=""
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              name="address"
              onChange={handleChange}
              value={address}
              type="text"
              label="Address"
              placeholder=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="phone"
              onChange={handleChange}
              value={phone}
              type="text"
              label="Phone"
              placeholder=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="pincode"
              onChange={handleChange}
              value={pincode}
              type="text"
              label="Pincode"
              placeholder=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="state"
              value={statePlace}
              type="text"
              label="State"
              placeholder=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="district"
              value={district}
              type="text"
              label="District"
              placeholder=""
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={handleUserSubmit}
              variant="contained"
              sx={{ marginRight: 3.5 }}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default TabAccount;
