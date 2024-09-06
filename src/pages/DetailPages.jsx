import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { fetchCredits, fetchDetails, fetchrecommendations, fetchVideos } from "../services/api";
import { Badge, Box, Button, CircularProgress, CircularProgressLabel, Container, Flex, Heading, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import { CalendarIcon, CheckCircleIcon, SmallAddIcon, TimeIcon } from "@chakra-ui/icons";
import {imagePathOriginal, imagePath} from '../services/api'

import {minutesToHours, ratingToPercentage,resolveRatingColor} from '../utils/helper'
import VideoComponent from "../components/VideoComponent";
import { useAuth } from "../context/useAuth";
import { useFirestore } from "../services/firestore";
import Reccomendation from "../components/Reccomendation";
import CastSlider from "../components/CastSlider";


const DetailPages = () => {

  const router = useParams();
  const {type, id}= router;

  // FIREBASE STORE  
  const {user} = useAuth();
  const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } = useFirestore();

  const toast = useToast();


  const [details, setDetails]= useState({})
  const [cast, setCast]= useState([])
  const [video,setVideo]= useState(null)
  const [loading,setLoading]= useState(true)
  const [isInWatchlist,setIsInWatchlist]=useState(false)
  const [recommend, setReccomend]= useState([])
  

  useEffect(()=>{

    const fetchData= async()=>{
      try {
        const [detailsData, creditsData, videosData,recData ]= await Promise.all([
          fetchDetails(type,id),
          fetchCredits(type, id),
          fetchVideos(type, id)  ,
          fetchrecommendations(type,id)
        ])

      //  set Recommendtion
       setReccomend(recData?.results.slice(0,10) || [])

      // set details
      setDetails(detailsData)

      // set casts
      setCast(creditsData?.cast?.slice(0,20));

      // set Video
      const video = videosData?.results?.find(
        (video) => video?.type === "Trailer"
      );
      setVideo(video)
     
      
     

        
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
    }


    fetchData()
  },[type,id])

  console.log(recommend)
  const handleSaveToWatchlist = async () => {
    if (!user) {
      toast({
        title: "Login to add to watchlist",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      release_date: details?.release_date || details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    };

    const dataId = details?.id?.toString();
    await addToWatchlist(user?.uid, dataId, data);
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId);
    setIsInWatchlist(isSetToWatchlist);
  };

  useEffect(() => {
    if (!user) {
      setIsInWatchlist(false);
      return;
    }

    checkIfInWatchlist(user?.uid, id).then((data) => {
      setIsInWatchlist(data);
    });
  }, [id, user, checkIfInWatchlist]);

  const handleRemoveFromWatchlist = async () => {
    await removeFromWatchlist(user?.uid, id);
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, id);
    setIsInWatchlist(isSetToWatchlist);
  };
  


  const title = details?.title || details?.name;
  const releaseDate =
  type === "tv" ? details?.first_air_date : details?.release_date;


  if (loading) {
    return (
      <Flex justify={"center"}>
        <Spinner
         size={"xl"} color="red" />
      </Flex>
    );
  }


  return (
<>
<Box>
  <Box
    background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.5)), url(${imagePathOriginal}/${details?.backdrop_path})`}
    backgroundRepeat={"no-repeat"}
    backgroundSize={"cover"}
    backgroundPosition={"center"}
    w={"100%"}
    h={{ base: "auto", md: "500px" }}
    py={{ base: "4", md: "2" }}
    zIndex={"-1"}
    display={"flex"}
    alignItems={"center"}
    justifyContent={"center"}
  >
    <Container maxW={"container.xl"}>
      <Flex
        alignItems={"center"}
        gap={{ base: "5", md: "10" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Image
          height={{ base: "auto", md: "450px" }}
          borderRadius={"sm"}
          src={`${imagePath}/${details?.poster_path}`}
          w={{ base: "100%", md: "auto" }}
          objectFit={"cover"}
        />
        <Box mt={{ base: "4", md: "0" }}>
          <Heading fontSize={{ base: "3xl", md: "3xl" }}>
            {title}{" "}
            <Text as="span" fontWeight={"normal"} textAlign={'center'} color={"gray.400"}>
              {new Date(releaseDate).getFullYear()}
            </Text>
          </Heading>

          <Flex
            alignItems={"center"}
            gap={{ base: "4", md: "4" }}
            mt={1}
            mb={5}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Flex alignItems={"center"} mb={{ base: "2", md: "0" }}>
              <CalendarIcon mr={2} color={"gray.400"} />
              <Text fontSize={"sm"}>
                {new Date(releaseDate).toLocaleDateString("en-US")} 
              </Text>
            </Flex>
            {type === "movie" && (
              <Flex alignItems={"center"} mb={{ base: "2", md: "0" }}>
                
                <Flex alignItems={"center"}>
                  <TimeIcon mr="2" color={"gray.400"} />
                  <Text fontSize={"sm"}>
                    {minutesToHours(details?.runtime)}
                  </Text>
                </Flex>
              </Flex>
            )}
          </Flex>

          <Flex
            alignItems={"center"}
            gap={{ base: "4", md: "4" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <CircularProgress
              value={ratingToPercentage(details?.vote_average)}
              bg={"gray.800"}
              borderRadius={"full"}
              p={"0.5"}
              size={"70px"}
              color={resolveRatingColor(details?.vote_average)}
              thickness={"6px"}
            >
              <CircularProgressLabel fontSize={"lg"}>
                {ratingToPercentage(details?.vote_average)}{" "}
                <Box as="span" fontSize={"10px"}>
                  %
                </Box>
              </CircularProgressLabel>
            </CircularProgress>
            <Text display={{ base: "none", md: "initial" }}>
              User Score
            </Text>

            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: "2", md: "4" }}
            >
              {isInWatchlist ? (
                <Button
                  leftIcon={<CheckCircleIcon />}
                  colorScheme="green"
                  variant={"outline"}
                  onClick={handleRemoveFromWatchlist}
                >
                  In watchlist
                </Button>
              ) : (
                <Button
                  leftIcon={<SmallAddIcon />}
                  variant={"outline"}
                  onClick={handleSaveToWatchlist}
                >
                  Add to watchlist
                </Button>
              )}
            </Flex>
          </Flex>

          <Text
            color={"gray.400"}
            fontSize={"sm"}
            fontStyle={"italic"}
            my="5"
          >
            {details?.tagline}
          </Text>
          <Heading fontSize={"xl"} mb={"3"}>
            Overview
          </Heading>
          <Text fontSize={"md"} mb={"3"}>
            {details?.overview}
          </Text>

          <Flex mt="6" gap="2" flexWrap="wrap">
            {details?.genres?.map((genre) => (
              <Badge key={genre?.id} p="1" m="1">
                {genre?.name}
              </Badge>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Container>
  </Box>

  

  <Container maxW={"container.xl"} pb="10">
    
    <CastSlider cast={cast} imagePath={imagePath}/>

    <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt="10" mb="5">
      Videos
    </Heading>
    <VideoComponent id={video?.key} />
        
      
        <Reccomendation recommend={recommend} type={type} id={id}/>
      
      
  </Container>
</Box>




</>
  
  )
}

export default DetailPages