/* eslint-disable react/prop-types */
import  { useRef, useEffect } from "react";
import Slider from "react-slick";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { imagePathOriginal } from "../services/api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Motion Box for animations
const MotionBox = motion(Box);

const Reccomendation = ({ recommend, type }) => {
  const sliderRef = useRef(null);

  // Reset slider position when the component mounts
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0); // Move to the start of the slider
    }
  }, []);

  // Function to handle the scroll to top
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  // Slider settings
  const settings = {
    dots: false,
    infinite: true, // Enable infinite looping
    speed: 500,
    slidesToShow: 4, // Default number of slides for large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Screens below 1024px width
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Screens below 768px width (tablets)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Screens below 480px width (mobile)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt="10">
        {`Similar Recommended ${type === "tv" ? "T.V. Shows" : "Movies"}`}
      </Heading>
      <Box mt="5" mb="10" position="relative">
        <Slider ref={sliderRef} {...settings}>
          {recommend?.length === 0 && <Text>No recommendations found</Text>}
          {recommend &&
            recommend.map((item) => (
              <Link key={item.id} to={`/${type}/${item.id}`} onClick={handleClick}>
                <MotionBox
                  minW={"150px"}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ duration: 0.3 }}
                  px="2"
                >
                  <Image
                    src={`${imagePathOriginal}/${item?.backdrop_path}`}
                    alt={item?.title || item?.original_name}
                    w={"100%"}
                    height={"225px"}
                    objectFit={"cover"}
                    borderRadius={"sm"}
                  />
                  <Text textAlign={"center"} mt="2">
                    {item?.title || item?.original_name}
                  </Text>
                </MotionBox>
              </Link>
            ))}
        </Slider>
       
      </Box>
    </>
  );
};

export default Reccomendation;
