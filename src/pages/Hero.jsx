import Slider from 'react-slick';
import { Box, Flex, Image, Skeleton, Text, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import { fetchupcomingmovies } from '../services/api';
import { imagePathOriginal } from '../services/api';

const FullScreenCarouselWithText = () => {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchupcomingmovies()
      .then((res) => {
        setData(res?.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const height = useBreakpointValue({ base: '50vh', md: '70vh' });

  if (loading) {
    return (
      <Flex justify={"center"} align={"center"} height={height}>
        <Skeleton height={'100%'} width={'100%'} />
      </Flex>
    );
  }

  return (
    <Box
      position="relative"
      width="100%"
      height={height}
      overflow="hidden"
    >
      <Slider {...settings}>
        {datas.map((data) => (
          <Link key={data.id} to={`/movie/${data.id}`} style={{ textDecoration: 'none' }}>
            <Box height={height} position="relative">
              <Image
                src={`${imagePathOriginal}${data?.backdrop_path}`}
                alt={`${data?.original_title}`}
                objectFit="cover"
                width="100%"
                height="100%"
              />
              <Box
                position="absolute"
                bottom="10%"
                left="50%"
                transform="translate(-50%, 0)"
                textAlign="center"
                color="white"
                px={{ base: 4, md: 6 }}
                py={{ base: 2, md: 4 }}
                bg="rgba(0, 0, 0, 0.6)" // Semi-transparent black background
                borderRadius="md"
                boxShadow="md" // Shadow for better contrast
              >
                <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="bold" mb={2}>
                  New Releases 
                </Text>
                <Text fontSize={{ base: 'md', md: 'xl' }} fontWeight="bold">
                  {data.original_title}
                </Text>
              </Box>
            </Box>
          </Link>
        ))}
      </Slider>
    </Box>
  );
};

export default FullScreenCarouselWithText;
