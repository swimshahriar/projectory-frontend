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
import { AiFillDelete } from "react-icons/ai";

// components
import RoundedBox from "../components/RoundedBox";

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

  // submit hanlder
  const submitHandler = async (data) => {
    console.log("looged");
    setFormError(null);
    if (previewSource || previewSource.length <= 0) {
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
        <Box width="100%" mt={3}>
          <Box mb={2}>
            <Typography align="center" variant="h6">
              Package - Basic
            </Typography>
          </Box>

          <TextField
            {...register("basicPrice")}
            label="Price"
            helperText={errors.basicPrice?.message}
            error={errors.basicPrice ? true : false}
            variant="outlined"
            type="number"
            className={classes.formInput}
          />
          <TextField
            {...register("basicDeliveryTime")}
            label="Delivery Time (days)"
            helperText={errors.basicDeliveryTime?.message}
            error={errors.basicDeliveryTime ? true : false}
            variant="outlined"
            type="number"
            className={classes.formInput}
          />
          {/* features */}
          <Box width="100%">
            <Box display="flex" justifyContent="center" alignItems="center">
              <TextField
                label="Features"
                helperText="5 revision, 3 pages, source code, etc"
                variant="outlined"
                value={features.basic}
                onChange={(e) =>
                  setFeatures((prev) => {
                    return { ...prev, basic: e.target.value };
                  })
                }
                className={classes.formInput}
              />
              <Box ml={1} mt={-7}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    if (features.basic === "") return;
                    setBasicFeatures((prev) =>
                      prev ? [...prev, features.basic] : [features.basic]
                    );

                    setFeatures((prev) => {
                      return { ...prev, basic: "" };
                    });
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>
            <Box display="flex" flexWrap="wrap">
              {!basicFeatures || basicFeatures.length <= 0 ? (
                <Typography>Not yet added.</Typography>
              ) : (
                basicFeatures.map((feature, idx) => (
                  <Box
                    className={classes.hover}
                    onClick={() =>
                      setBasicFeatures((prev) =>
                        prev.filter((item) => item !== feature)
                      )
                    }
                  >
                    <RoundedBox
                      key={idx}
                      light={true}
                      icon={true}
                      borderColor={
                        idx % 2 == 0 ? "primary.main" : "secondary.main"
                      }
                    >
                      {feature}
                      <AiFillDelete />
                    </RoundedBox>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
        {/* standard package */}
        <Box width="100%" mt={3}>
          <Box mb={2}>
            <Typography align="center" variant="h6">
              Package - Standard
            </Typography>
          </Box>

          <TextField
            {...register("standardPrice")}
            label="Price"
            helperText={errors.standardPrice?.message}
            error={errors.standardPrice ? true : false}
            variant="outlined"
            type="number"
            className={classes.formInput}
          />
          <TextField
            {...register("basicDeliveryTime")}
            label="Delivery Time (days)"
            helperText={errors.basicDeliveryTime?.message}
            error={errors.basicDeliveryTime ? true : false}
            variant="outlined"
            type="number"
            className={classes.formInput}
          />
          {/* features */}
          <Box width="100%">
            <Box display="flex" justifyContent="center" alignItems="center">
              <TextField
                label="Features"
                helperText="5 revision, 3 pages, source code, etc"
                variant="outlined"
                value={features.standard}
                onChange={(e) =>
                  setFeatures((prev) => {
                    return { ...prev, standard: e.target.value };
                  })
                }
                className={classes.formInput}
              />
              <Box ml={1} mt={-7}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    if (features.standard === "") return;
                    setStandardFeatures((prev) =>
                      prev ? [...prev, features.standard] : [features.standard]
                    );

                    setFeatures((prev) => {
                      return { ...prev, standard: "" };
                    });
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>
            <Box display="flex" flexWrap="wrap">
              {!standardFeatures || standardFeatures.length <= 0 ? (
                <Typography>Not yet added.</Typography>
              ) : (
                standardFeatures.map((feature, idx) => (
                  <Box
                    className={classes.hover}
                    onClick={() =>
                      setStandardFeatures((prev) =>
                        prev.filter((item) => item !== feature)
                      )
                    }
                  >
                    <RoundedBox
                      key={idx}
                      light={true}
                      icon={true}
                      borderColor={
                        idx % 2 == 0 ? "primary.main" : "secondary.main"
                      }
                    >
                      {feature}
                      <AiFillDelete />
                    </RoundedBox>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
        {/* premium package */}
        <Box width="100%" mt={3}>
          <Box mb={2}>
            <Typography align="center" variant="h6">
              Package - Premium
            </Typography>
          </Box>

          <TextField
            {...register("premiumPrice")}
            label="Price"
            helperText={errors.premiumPrice?.message}
            error={errors.premiumPrice ? true : false}
            variant="outlined"
            type="number"
            className={classes.formInput}
          />
          <TextField
            {...register("premiumDeliveryTime")}
            label="Delivery Time (days)"
            helperText={errors.premiumDeliveryTime?.message}
            error={errors.premiumDeliveryTime ? true : false}
            variant="outlined"
            type="number"
            className={classes.formInput}
          />
          {/* features */}
          <Box width="100%">
            <Box display="flex" justifyContent="center" alignItems="center">
              <TextField
                label="Features"
                helperText="5 revision, 3 pages, source code, etc"
                variant="outlined"
                value={features.premium}
                onChange={(e) =>
                  setFeatures((prev) => {
                    return { ...prev, premium: e.target.value };
                  })
                }
                className={classes.formInput}
              />
              <Box ml={1} mt={-7}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    if (features.premium === "") return;
                    setPremiumFeatures((prev) =>
                      prev ? [...prev, features.premium] : [features.premium]
                    );

                    setFeatures((prev) => {
                      return { ...prev, premium: "" };
                    });
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>
            <Box display="flex" flexWrap="wrap">
              {!premiumFeatures || premiumFeatures.length <= 0 ? (
                <Typography>Not yet added.</Typography>
              ) : (
                premiumFeatures.map((feature, idx) => (
                  <Box
                    className={classes.hover}
                    onClick={() =>
                      setPremiumFeatures((prev) =>
                        prev.filter((item) => item !== feature)
                      )
                    }
                  >
                    <RoundedBox
                      key={idx}
                      light={true}
                      icon={true}
                      borderColor={
                        idx % 2 == 0 ? "primary.main" : "secondary.main"
                      }
                    >
                      {feature}
                      <AiFillDelete />
                    </RoundedBox>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>

        <Button
          onClick={() => {
            console.log("clicked");
            handleSubmit(submitHandler);
          }}
          variant="outlined"
          color="primary"
          size="large"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddService;
