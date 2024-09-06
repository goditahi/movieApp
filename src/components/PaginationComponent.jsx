import { Button, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";

const PaginationComponent = ({ activePage, totalPages, setActivePage }) => {
  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap="4"
      my="6"
    >
      <Button
        onClick={() => setActivePage(activePage - 1)}
        isDisabled={activePage === 1}
        colorScheme="teal"
        variant="solid"
        size="sm"
        borderRadius="full"
        _hover={{ bg: "teal.600", color: "white" }}  // Hover effect
        _disabled={{ bg: "gray.400", cursor: "not-allowed" }}  // Disabled style
      >
        Prev
      </Button>
      <Flex gap="2">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => setActivePage(index + 1)}
            colorScheme={activePage === index + 1 ? "teal" : "gray"}
            variant={activePage === index + 1 ? "solid" : "outline"}
            size="sm"
            borderRadius="full"
            _hover={{ bg: activePage === index + 1 ? "teal.700" : "gray.200" }}  // Hover effect for active and inactive buttons
          >
            {index + 1}
          </Button>
        ))}
      </Flex>
      <Button
        onClick={() => setActivePage(activePage + 1)}
        isDisabled={activePage === totalPages}
        colorScheme="teal"
        variant="solid"
        size="sm"
        borderRadius="full"
        _hover={{ bg: "teal.600", color: "white" }}  // Hover effect
        _disabled={{ bg: "gray.400", cursor: "not-allowed" }}  // Disabled style
      >
        Next
      </Button>
    </Flex>
  );
};

PaginationComponent.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

export default PaginationComponent;
