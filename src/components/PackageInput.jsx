import { Box, Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
// components
import RoundedBox from "./RoundedBox";

const PackageInput = ({
  classes,
  register,
  errorsPrice,
  errorsDeliveryTime,
  formData,
  setFormData,
  packageName,
  features,
  setFeatures,
  onChangeFeatureHanlder,
  typeFeatures,
  setTypeFeatures,
}) => {
  let priceValue;
  let deliveryValue;
  let setPrice;
  let setDelivery;

  if (!register) {
    if (packageName === "basic") {
      priceValue = formData.basicPrice;
      setPrice = (e) => setFormData((prev) => ({ ...prev, basicPrice: e.target.value }));
      deliveryValue = formData.basicDeliveryTime;
      setDelivery = (e) => setFormData((prev) => ({ ...prev, basicDeliveryTime: e.target.value }));
    } else if (packageName === "standard") {
      priceValue = formData.standardPrice;
      setPrice = (e) => setFormData((prev) => ({ ...prev, standardPrice: e.target.value }));
      deliveryValue = formData.standardDeliveryTime;
      setDelivery = (e) =>
        setFormData((prev) => ({ ...prev, standardDeliveryTime: e.target.value }));
    } else if (packageName === "premium") {
      priceValue = formData.premiumPrice;
      setPrice = (e) => setFormData((prev) => ({ ...prev, premiumPrice: e.target.value }));
      deliveryValue = formData.premiumDeliveryTime;
      setDelivery = (e) =>
        setFormData((prev) => ({ ...prev, premiumDeliveryTime: e.target.value }));
    }
  }
  return (
    <Box width="100%" mt={3}>
      <Box mb={2}>
        <Typography align="center" variant="h6">
          Package - {packageName}
        </Typography>
      </Box>

      {register ? (
        <>
          <TextField
            {...register(`${packageName}Price`)}
            label="Price"
            helperText={errorsPrice?.message}
            error={!!errorsPrice}
            variant="outlined"
            type="number"
            className={classes.formInput}
          />
          <TextField
            {...register(`${packageName}DeliveryTime`)}
            label="Delivery Time (days)"
            helperText={errorsDeliveryTime?.message}
            error={!!errorsDeliveryTime}
            variant="outlined"
            type="number"
            className={classes.formInput}
          />
        </>
      ) : (
        <>
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            className={classes.formInput}
            value={priceValue}
            onChange={setPrice}
          />
          <TextField
            label="Delivery Time (days)"
            variant="outlined"
            type="number"
            className={classes.formInput}
            value={deliveryValue}
            onChange={setDelivery}
          />
        </>
      )}
      {/* features */}
      <Box width="100%">
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            label="Features"
            helperText="5 revision, 3 pages, source code, etc"
            variant="outlined"
            value={features}
            onChange={(e) => onChangeFeatureHanlder(packageName, e.target.value)}
            className={classes.formInput}
          />
          <Box ml={1} mt={-7}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (features === "") return;
                setFeatures(packageName);
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
        <Box display="flex" flexWrap="wrap">
          {!typeFeatures || typeFeatures.length <= 0 ? (
            <Typography>Not yet added.</Typography>
          ) : (
            typeFeatures.map((feature, idx) => (
              <Box
                key={idx}
                className={classes.hover}
                onClick={() => setTypeFeatures((prev) => prev.filter((item) => item !== feature))}
              >
                <RoundedBox
                  light
                  icon
                  borderColor={idx % 2 === 0 ? "primary.main" : "secondary.main"}
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
  );
};

export default PackageInput;
