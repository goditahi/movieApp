/* eslint-disable react/prop-types */

import Slider from "react-slick";
import { Box, Image, Text, Heading } from "@chakra-ui/react";

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CastSlider = ({ cast, imagePath }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5, // Default number of slides for large screens
    slidesToScroll: 3,
    swipe: true, // Enables swiping on touch devices
    touchMove: true, // Allows movement during touch
    responsive: [
      {
        breakpoint: 1024, // Screens below 1024px width
        settings: {
          slidesToShow: 3, // Show 3 slides at a time
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Screens below 768px width (tablets)
        settings: {
          slidesToShow: 2, // Show 2 slides at a time
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Screens below 480px width (mobile)
        settings: {
          slidesToShow: 1, // Show 1 slide at a time
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt="10" mb={5}>
        Cast
      </Heading>
      {cast?.length === 0 && <Text>No cast found</Text>}
      {cast && (
        <Slider {...settings}>
          {cast.map((item) => (
            <Box key={item?.id} px={2}>
              <Image
                src={`${imagePath}/${item?.profile_path}`}
                w={"100%"}
                height={"225px"}
                objectFit={"cover"}
                borderRadius={"sm"}
              />
              <Text fontSize={"xs"} textAlign={"center"}>
                {item.name}
              </Text>
            </Box>
          ))}
        </Slider>
      )}
    </>
  );
};

// Custom Next and Prev Arrows
const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{ display: "block", right: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{ display: "block", left: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

export default CastSlider;
