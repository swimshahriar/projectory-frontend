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
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// internal imports
import { fetchServices, updateService } from "../actions/serviceAction";
// components
import CloudImage from "../components/CloudImage";
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

const EditService = () => {
  const { sid } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [formError, setFormError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    about: "",
    basicPrice: "",
    basicDeliveryTime: "",
    standardPrice: "",
    standardDeliveryTime: "",
    premiumPrice: "",
    premiumDeliveryTime: "",
  });
  const [category, setCategory] = useState("");
  const [imageInputState] = useState("");
  const [previewSource, setPreviewSource] = useState(null);
  const [oldImgs, setOldImgs] = useState(null);
  const [features, setFeatures] = useState({
    basic: "",
    standard: "",
    premium: "",
  });
  const [basicFeatures, setBasicFeatures] = useState(null);
  const [standardFeatures, setStandardFeatures] = useState(null);
  const [premiumFeatures, setPremiumFeatures] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const { error, res, isLoading, services } = useSelector((state) => state.services);

  // fetch service info
  useEffect(() => {
    (async () => {
      await dispatch(fetchServices({ sid }));
    })();
    return async () => {
      await dispatch({ type: "RESET_SERVICES" });
    };
  }, [dispatch, sid]);

  // setting form data
  useEffect(() => {
    if (!services || !services.packages) return;
    setFormData({
      title: services?.title || "",
      about: services?.about || "",
      basicPrice: services?.packages[0].price || "",
      basicDeliveryTime: services?.packages[0].deliveryTime || "",
      standardPrice: services?.packages[1].price || "",
      standardDeliveryTime: services?.packages[1].deliveryTime || "",
      premiumPrice: services?.packages[2].price || "",
      premiumDeliveryTime: services?.packages[2].deliveryTime || "",
    });
    setCategory(services?.category || "");
    setBasicFeatures(services?.packages[0].features || null);
    setStandardFeatures(services?.packages[1].features || null);
    setPremiumFeatures(services?.packages[2].features || null);
    setOldImgs(services?.images || null);
  }, [services]);

  // check for error and success
  useMemo(() => {
    if (res) {
      setFormData({
        title: "",
        about: "",
        basicPrice: "",
        basicDeliveryTime: "",
        standardPrice: "",
        standardDeliveryTime: "",
        premiumPrice: "",
        premiumDeliveryTime: "",
      });
      setCategory("");
      setBasicFeatures(null);
      setStandardFeatures(null);
      setPremiumFeatures(null);
      setPreviewSource(null);
      setOldImgs(null);
    }
  }, [res]);

  useMemo(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  // preview image
  const previewImage = (image) => {
    if (previewSource && previewSource.length >= 3) return setFormError("Max 3 images allowed!");
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreviewSource((prev) => (prev ? [...prev, reader.result] : [reader.result]));
    };

    return 0;
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
  const submitHandler = async () => {
    setFormError(null);

    const finalData = {
      images: previewSource?.length > 0 ? previewSource : oldImgs,
      title: formData.title,
      about: formData.about,
      category,
      packages: [
        {
          name: "Basic",
          price: formData.basicPrice,
          deliveryTime: formData.basicDeliveryTime,
          features: basicFeatures,
        },
        {
          name: "Standard",
          price: formData.standardPrice,
          deliveryTime: formData.standardDeliveryTime,
          features: standardFeatures,
        },
        {
          name: "Premium",
          price: formData.premiumPrice,
          deliveryTime: formData.premiumDeliveryTime,
          features: premiumFeatures,
        },
      ],
    };

    await dispatch(updateService(finalData, sid, token));
    return null;
  };

  if (isLoading || !services) {
    return (
      <Container>
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box mt={3}>
        <Typography variant="h4" align="center">
          Edit Service
        </Typography>
      </Box>

      <form onSubmit={submitHandler} className={classes.form}>
        <Box mb={3}>
          {formError && <Alert severity="error">{formError}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" gridGap={5} flexWrap="wrap">
          {previewSource && previewSource.length > 0
            ? previewSource.map((image, idx) => (
                <Box
                  key={idx}
                  display="flex"
                  flexWrap="wrap"
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
                      width: "250px",
                      minWidth: "200px",
                    }}
                  />
                </Box>
              ))
            : oldImgs &&
              oldImgs.map((image, idx) => (
                <Box key={idx}>
                  <CloudImage
                    publicId={image}
                    uploadPreset="projectory_services"
                    className={classes.hover}
                    width="250"
                    crop="scale"
                  />
                </Box>
              ))}
        </Box>
        <Box m={3}>
          <Button variant="outlined" color="secondary" component="label">
            Change Images (max. 3)
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
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          variant="outlined"
          className={classes.formInput}
        />
        <TextField
          label="About"
          value={formData.about}
          onChange={(e) => setFormData((prev) => ({ ...prev, about: e.target.value }))}
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
          register={false}
          formData={formData}
          setFormData={setFormData}
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
          register={false}
          formData={formData}
          setFormData={setFormData}
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
          register={false}
          formData={formData}
          setFormData={setFormData}
          packageName="premium"
          features={features.premium}
          setFeatures={setFeaturesHandler}
          onChangeFeatureHanlder={onChangeFeatureHanlder}
          typeFeatures={premiumFeatures}
          setTypeFeatures={setPremiumFeatures}
        />
        <Box m={3}>
          {isLoading ? (
            <CircularProgress color="primary" />
          ) : (
            <Button type="submit" variant="outlined" color="primary" size="large">
              Update
            </Button>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default EditService;
