
import Slider from 'react-slick';
import { Box, Flex, Image,  Skeleton, Text, useBreakpointValue } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import { fetchupcomingmovies } from '../services/api';
import { imagePath, imagePathOriginal } from '../services/api';





const FullScreenCarouselWithText = () => {


  const [datas,setData] = useState([])
  const [ loading, setLoading]= useState(true)

  useEffect(()=>{
    setLoading(true);
    fetchupcomingmovies()
    .then((res)=>{
      console.log(res);
      setData(res?.results)
    })
    .catch((err)=>{console.log(err)})
    .finally(()=>{
      setLoading(false)
    })
  },[])



    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
    };
  
    const height = useBreakpointValue({ base: '70vh', md: '70vh' });
  
    

    if (loading) {
      return (
        <Flex justify={"center"}>
          <Skeleton
           height={'60vh'} />
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
          {datas.map(data => (
  
            <Box key={data.id} height={height} position="relative">
              <Image
                src={`${imagePathOriginal}${data?.backdrop_path}`}
                alt={`${imagePath}${data?.poster_path}`}
                objectFit="cover"
                width="100%"
                height="100%"
              />
              <Box
                position="absolute"
                top="80%"
                left="50%"
                transform="translate(-50%, -50%)"
                textAlign="center"
                color="white"
                
                px={4}
                py={2}
          
              >
                 <Text fontSize="2xl" fontWeight="bold" color={'white'} mb={'4'}>
                  UPCOMING 
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color={'#00FFFF'}>
                  {data.original_title}
                </Text>
                

              </Box>
            </Box>
           
          ))}
        </Slider>
      </Box>
    
    );
  };
  
  export default FullScreenCarouselWithText;
  