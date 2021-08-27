import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
// actions
import { addService } from "../../actions/serviceAction";
import SiteLayout from "../../components/layouts/SiteLayout";
// components
import PackageInput from "../../components/PackageInput";
import SweetAlert from "../../components/SweetAlert";
// styles
const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: 50,
    marginBottom: 50,
    width: "80%",

    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  errorText: {
    marginTop: 10,
  },
  form: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& button": {
      marginTop: 20,
    },
  },
  formInput: {
    marginBottom: 20,
    width: "100%",
  },
  select: {
    width: "100%",
    marginBottom: 10,
  },
  hover: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

// form schema
const schema = yup.object().shape({
  title: yup.string().max(50).required("required"),
  about: yup.string().required("required"),
  basicPrice: yup.number().min(300).required("required"),
  basicDeliveryTime: yup.number().min(1).max(30).required("required(1 - 30)"),
  standardPrice: yup.number().min(300).required("required"),
  standardDeliveryTime: yup.number().min(1).max(30).required("required(1 - 30)"),
  premiumPrice: yup.number().min(300).required("required"),
  premiumDeliveryTime: yup.number().min(1).max(30).required("required(1 - 30)"),
});

const AddService = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [formError, setFormError] = useState(null);
  const [category, setCategory] = useState("");
  const [imageInputState, _] = useState("");
  const [previewSource, setPreviewSource] = useState(null);
  const [features, setFeatures] = useState({
    basic: "",
    standard: "",
    premium: "",
  });
  const [basicFeatures, setBasicFeatures] = useState(null);
  const [standardFeatures, setStandardFeatures] = useState(null);
  const [premiumFeatures, setPremiumFeatures] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const { token, uid } = useSelector((state) => state.auth);
  const { error, res, isLoading } = useSelector((state) => state.services);

  // check for error and success
  useEffect(() => {
    if (error) {
      setFormError(error);
    }

    if (res) {
      SweetAlert.fire({
        icon: "success",
        title: "Success",
        timer: 2000,
        timerProgressBar: true,
        position: "bottom-left",
        toast: true,
        showConfirmButton: false,
      });
      reset();
      setCategory("");
      setBasicFeatures(null);
      setStandardFeatures(null);
      setPremiumFeatures(null);
      setPreviewSource(null);

      setTimeout(() => {
        history.push(`/user-profile/${uid}`);
      }, 2500);
    }

    return () => dispatch({ type: "RESET_SERVICES" });
  }, [error, res, reset, dispatch, uid, history]);

  // preview image
  const previewImage = (image) => {
    if (previewSource && previewSource.length >= 3) return setFormError("Max 3 images allowed!");
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreviewSource((prev) => (prev ? [...prev, reader.result] : [reader.result]));
    };
  };

  // file input hanlder
  const fileInputHanlder = (e) => {
    setFormError(null);
    const image1 = e.target.files[0];
    previewImage(image1);

    const image2 = e.target.files[1];
    if (image2) {
      previewImage(image2);
    }

    const image3 = e.target.files[2];
    if (image3) {
      previewImage(image3);
    }
  };

  // set features handler for pakcageInput
  const setFeaturesHandler = (packageName) => {
    if (packageName === "basic") {
      setBasicFeatures((prev) => (prev ? [...prev, features.basic] : [features.basic]));
      setFeatures((prev) => ({ ...prev, basic: "" }));
    } else if (packageName === "standard") {
      setStandardFeatures((prev) => (prev ? [...prev, features.standard] : [features.standard]));
      setFeatures((prev) => ({ ...prev, standard: "" }));
    } else if (packageName === "premium") {
      setPremiumFeatures((prev) => (prev ? [...prev, features.premium] : [features.premium]));
      setFeatures((prev) => ({ ...prev, premium: "" }));
    }
  };

  // onChange handler packageInput
  const onChangeFeatureHanlder = (packageName, value) => {
    if (packageName === "basic") {
      setFeatures((prev) => ({ ...prev, basic: value }));
    } else if (packageName === "standard") {
      setFeatures((prev) => ({ ...prev, standard: value }));
    } else if (packageName === "premium") {
      setFeatures((prev) => ({ ...prev, premium: value }));
    }
  };

  // submit hanlder
  const submitHandler = async (data) => {
    setFormError(null);
    if (!previewSource || previewSource.length <= 0) {
      return setFormError("Images cannot be empty!");
    }
    if (!category) {
      return setFormError("Category cannot be empty!");
    }

    const finalData = {
      images: previewSource,
      title: data.title,
      about: data.about,
      category,
      packages: [
        {
          name: "Basic",
          price: data.basicPrice,
          deliveryTime: data.basicDeliveryTime,
          features: basicFeatures,
        },
        {
          name: "Standard",
          price: data.standardPrice,
          deliveryTime: data.standardDeliveryTime,
          features: standardFeatures,
        },
        {
          name: "Premium",
          price: data.premiumPrice,
          deliveryTime: data.premiumDeliveryTime,
          features: premiumFeatures,
        },
      ],
    };

    await dispatch(addService(finalData, token));
    return null;
  };

  return (
    <SiteLayout>
      <Container maxWidth="lg" component="section" className={classes.formContainer}>
        <Box mt={4}>
          <Typography variant="h4" align="center">
            Add a Service
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <Box mb={3}>
            {formError && <Alert severity="error">{formError}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gridGap={5}
            flexWrap="wrap"
          >
            {previewSource &&
              previewSource.map((image, idx) => (
                <Box
                  key={idx}
                  onClick={() => {
                    setFormError(null);
                    setPreviewSource((prev) => prev.filter((img) => img !== image));
                  }}
                >
                  <img
                    src={image}
                    alt="choosen"
                    className={classes.hover}
                    style={{
                      width: "150px",
                      minWidth: "100px",
                      height: "150px",
                      minHeight: "100px",
                    }}
                  />
                </Box>
              ))}
          </Box>
          <Box m={3}>
            <Button variant="outlined" color="secondary" component="label">
              Choose Images (max. 3)
              <input
                type="file"
                multiple
                value={imageInputState}
                onChange={fileInputHanlder}
                hidden
              />
            </Button>
          </Box>

          <TextField
            {...register("title")}
            label="Title"
            helperText={errors.title?.message}
            error={!!errors.title}
            variant="outlined"
            className={classes.formInput}
          />
          <TextField
            {...register("about")}
            label="About"
            helperText={errors.about?.message}
            error={!!errors.about}
            variant="outlined"
            multiline
            rows={6}
            className={classes.formInput}
          />
          <FormControl variant="outlined" className={classes.select}>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              label="Category"
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={classes.select}
            >
              <MenuItem value="web-developement">Web Developement</MenuItem>
              <MenuItem value="mobile-developement">Mobile Developement</MenuItem>
              <MenuItem value="graphics-designing">Graphics Designing</MenuItem>
            </Select>
          </FormControl>

          {/* basic package */}
          <PackageInput
            classes={classes}
            register={register}
            errorsPrice={errors.basicPrice}
            errorsDeliveryTime={errors.basicDeliveryTime}
            packageName="basic"
            features={features.basic}
            setFeatures={setFeaturesHandler}
            onChangeFeatureHanlder={onChangeFeatureHanlder}
            typeFeatures={basicFeatures}
            setTypeFeatures={setBasicFeatures}
          />

          {/* standard package */}
          <PackageInput
            classes={classes}
            register={register}
            errorsPrice={errors.standardPrice}
            errorsDeliveryTime={errors.standardDeliveryTime}
            packageName="standard"
            features={features.standard}
            setFeatures={setFeaturesHandler}
            onChangeFeatureHanlder={onChangeFeatureHanlder}
            typeFeatures={standardFeatures}
            setTypeFeatures={setStandardFeatures}
          />

          {/* premium package */}
          <PackageInput
            classes={classes}
            register={register}
            errorsPrice={errors.premiumPrice}
            errorsDeliveryTime={errors.premiumDeliveryTime}
            packageName="premium"
            features={features.premium}
            setFeatures={setFeaturesHandler}
            onChangeFeatureHanlder={onChangeFeatureHanlder}
            typeFeatures={premiumFeatures}
            setTypeFeatures={setPremiumFeatures}
          />

          {isLoading ? (
            <CircularProgress color="primary" />
          ) : (
            <Button type="submit" variant="outlined" color="primary" size="large">
              Submit
            </Button>
          )}
        </form>
      </Container>
    </SiteLayout>
  );
};

export default AddService;
