import { Container, Flex, Grid, Heading, Select, Skeleton } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Movies = () => {

  const [movies, setMovies]=useState([])
  const [activePage, setActivePage]= useState(1);
  const [totalPage, setTotalPage]= useState(1)
  const [sortBy, setSortBy]= useState('popularity.desc')
  const [loading, setLoading]= useState(true)

  useEffect(()=>{
    setLoading(true);
    fetchMovies(activePage, sortBy)
    .then((res)=>{
      console.log(res);
      setMovies(res?.results)
      setActivePage(res?.page)
      setTotalPage(res?.totalPage)

    })
    .catch((err)=>{console.log(err)})
    .finally(()=>{
      setLoading(false)
    })
  },[activePage,sortBy])


  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my="10">
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Discover Movies
        </Heading>

        <Select
          w={"130px"}
          
          onChange={(e) => {
            setActivePage(1);
            setSortBy(e.target.value);
          }}
          
        >
          <option   value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
        </Select>
        
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {movies &&
          movies?.map((item, i) =>
            loading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <CardComponent key={item?.id} item={item} type={"movie"} />
            )
          )}
      </Grid>

      <PaginationComponent
        activePage={activePage}
        totalPages={totalPage}
        setActivePage={setActivePage}
      />
    </Container>
  )
}

export default Movies