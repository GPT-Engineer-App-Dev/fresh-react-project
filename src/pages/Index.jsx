import { Box, Container, Flex, Text, VStack, Link, IconButton } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Text fontSize="lg" fontWeight="bold">
            MyApp
          </Text>
        </Flex>

        <Box display={{ base: "block", md: "none" }} onClick={toggleMobileMenu}>
          <IconButton
            icon={<FaBars />}
            variant="outline"
            aria-label="Toggle Navigation"
          />
        </Box>

        <Box
          display={{ base: isMobileMenuOpen ? "block" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
        >
          <Link href="#" mt={{ base: 4, md: 0 }} mr={6} display="block">
            Home
          </Link>
          <Link href="#" mt={{ base: 4, md: 0 }} mr={6} display="block">
            About
          </Link>
          <Link href="#" mt={{ base: 4, md: 0 }} display="block">
            Contact
          </Link>
        </Box>
      </Flex>

      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Your Blank Canvas</Text>
          <Text>Chat with the agent to start making edits.</Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;