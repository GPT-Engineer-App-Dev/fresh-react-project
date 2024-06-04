import { Box, Flex, Text, Link, IconButton } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
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
          <Link href="/" mt={{ base: 4, md: 0 }} mr={6} display="block">
            Home
          </Link>
          <Link href="/about" mt={{ base: 4, md: 0 }} mr={6} display="block">
            About
          </Link>
          <Link href="/contact" mt={{ base: 4, md: 0 }} mr={6} display="block">
            Contact
          </Link>
          <Link href="/events" mt={{ base: 4, md: 0 }} display="block">
            Events
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;