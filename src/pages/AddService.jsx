import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// components
import PackageInput from "../components/PackageInput";

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
  standardDeliveryTime: yup
    .number()
    .min(1)
    .max(30)
    .required("required(1 - 30)"),
  premiumPrice: yup.number().min(300).required("required"),
  premiumDeliveryTime: yup.number().min(1).max(30).required("required(1 - 30)"),
});

const AddService = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [formError, setFormError] = useState(null);
  const [category, setCategory] = useState("");
  const [imageInputState, setImageInputState] = useState("");
  const [images, setImages] = useState(null);
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

  // preview image
  const previewImage = (image) => {
    if (previewSource && previewSource.length >= 3)
      return setFormError("Max 3 images allowed!");
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreviewSource((prev) =>
        prev ? [...prev, reader.result] : [reader.result]
      );
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
      setBasicFeatures((prev) => {
        return prev ? [...prev, features.basic] : [features.basic];
      });
      setFeatures((prev) => {
        return { ...prev, basic: "" };
      });
    } else if (packageName === "standard") {
      setStandardFeatures((prev) => {
        return prev ? [...prev, features.standard] : [features.standard];
      });
      setFeatures((prev) => {
        return { ...prev, standard: "" };
      });
    } else if (packageName === "premium") {
      setPremiumFeatures((prev) => {
        return prev ? [...prev, features.premium] : [features.premium];
      });
      setFeatures((prev) => {
        return { ...prev, premium: "" };
      });
    }
  };

  // onChange handler packageInput
  const onChangeFeatureHanlder = (packageName, value) => {
    if (packageName === "basic") {
      setFeatures((prev) => {
        return { ...prev, basic: value };
      });
    } else if (packageName === "standard") {
      setFeatures((prev) => {
        return { ...prev, standard: value };
      });
    } else if (packageName === "premium") {
      setFeatures((prev) => {
        return { ...prev, premium: value };
      });
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

    console.log({
      previewSource,
      data,
      category,
      basicFeatures,
      standardFeatures,
      premiumFeatures,
    });
  };

  return (
    <Container
      maxWidth="lg"
      component="section"
      className={classes.formContainer}
    >
      <Box mt={4}>
        <Typography variant="h4" align="center">
          Add a Service
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Box mb={3}>
          {formError && <Alert severity="error">{formError}</Alert>}
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
              <img
                key={idx}
                src={image}
                alt="choosen"
                className={classes.hover}
                style={{
                  width: "150px",
                  minWidth: "100px",
                  height: "150px",
                  minHeight: "100px",
                }}
                onClick={() => {
                  setFormError(null);
                  setPreviewSource((prev) =>
                    prev.filter((img) => img !== image)
                  );
                }}
              />
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
          error={errors.title ? true : false}
          variant="outlined"
          className={classes.formInput}
        />
        <TextField
          {...register("about")}
          label="About"
          helperText={errors.about?.message}
          error={errors.about ? true : false}
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

        <Button type="submit" variant="outlined" color="primary" size="large">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddService;
