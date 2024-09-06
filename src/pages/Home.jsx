import { Container, Box, Flex, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTrending } from "../services/api";
import CardComponent from "../components/CardComponent";
import Hero from "../pages/Hero";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day');

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => setData(res))
      .catch((err) => console.log(err, 'err'))
      .finally(() => setLoading(false));
  }, [timeWindow]);

  return (
    <>
      <Hero />
      <Container maxW="container.xl" p={4} centerContent>
        <Flex
          direction={{ base: 'column', md: 'row' }} // Stack vertically on small screens, horizontally on medium and up
          alignItems="center"
          justify="space-between"
          mb={8}
          gap={4}
        >
          <Heading as="h2" fontSize={{ base: 'lg', md: 'xl' }} textTransform="uppercase" mb={{ base: 4, md: 0 }}>
            Trending Movies
          </Heading>
          <Flex
            alignItems="center"
            gap={2}
          >
            <Box
              as="button"
              px={4}
              py={2}
              borderRadius="full" // Fully rounded
              bg={timeWindow === "day" ? "gray.800" : "gray.200"}
              color={timeWindow === "day" ? "white" : "gray.800"}
              onClick={() => setTimeWindow("day")}
              _hover={{ bg: "gray.700", color: "white" }}
              transition="background-color 0.2s, color 0.2s"
            >
              Today
            </Box>
            <Box
              as="button"
              px={4}
              py={2}
              borderRadius="full" // Fully rounded
              bg={timeWindow === "week" ? "gray.800" : "gray.200"}
              color={timeWindow === "week" ? "white" : "gray.800"}
              onClick={() => setTimeWindow("week")}
              _hover={{ bg: "gray.700", color: "white" }}
              transition="background-color 0.2s, color 0.2s"
            >
              Week
            </Box>
          </Flex>
        </Flex>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)', // 1 column on small screens
            sm: 'repeat(2, 1fr)',  // 2 columns on small-medium screens
            md: 'repeat(3, 1fr)',  // 3 columns on medium-large screens
            lg: 'repeat(4, 1fr)'   // 4 columns on large screens
          }}
          gap={4}
          w="100%" // Ensure grid takes full width
        >
          {data && data.map((item, i) =>
            loading ? (
              <Skeleton key={i} height="300px" />
            ) : (
              <CardComponent key={item?.id} item={item} type={item?.media_type} />
            )
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
