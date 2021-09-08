import { Box, Typography } from "@material-ui/core";
import React from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./SwiperSlider.css";

// install Swiper modules
SwiperCore.use([Navigation]);

const SwiperSlider = () => (
  <>
    <Swiper navigation className="mySwiper">
      <SwiperSlide>
        <Box className="mySwiper__box">
          <img src="https://picsum.photos/id/1027/200" alt="caitlin" className="mySwiper__img" />
          <Typography color="textSecondary" gutterBottom>
            <Typography component="span" variant="h6" color="secondary">
              Caitlin Tormey
            </Typography>
            , Chief Commercial Officer.
          </Typography>
          <Typography variant="h5" color="textPrimary">
            "We've used Projectory for shopify web development, graphics design. Working with
            Projectory makes my job a little easier every day."
          </Typography>
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box className="mySwiper__box">
          <img src="https://picsum.photos/id/1027/200" alt="caitlin" className="mySwiper__img" />
          <Typography color="textSecondary" gutterBottom>
            <Typography component="span" variant="h6" color="secondary">
              Caitlin Tormey
            </Typography>
            , Chief Commercial Officer.
          </Typography>
          <Typography variant="h5" color="textPrimary">
            "We've used Projectory for shopify web development, graphics design. Working with
            Projectory makes my job a little easier every day."
          </Typography>
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box className="mySwiper__box">
          <img src="https://picsum.photos/id/1027/200" alt="caitlin" className="mySwiper__img" />
          <Typography color="textSecondary" gutterBottom>
            <Typography component="span" variant="h6" color="secondary">
              Caitlin Tormey
            </Typography>
            , Chief Commercial Officer.
          </Typography>
          <Typography variant="h5" color="textPrimary">
            "We've used Projectory for shopify web development, graphics design. Working with
            Projectory makes my job a little easier every day."
          </Typography>
        </Box>
      </SwiperSlide>
    </Swiper>
  </>
);

export default SwiperSlider;
