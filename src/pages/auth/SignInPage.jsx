import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useAuthUserContext } from "@/context/UserContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignInPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  // Handle form and showing of password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  // Contexts
  const {
    handleUserPasswordReset,
    handleUserLogInWithEmailAndPassword,
    handleUserSignInWithGoogle,
  } = useAuthUserContext();

  const [userSignUpForm, setUserSignUpForm] = useState({
    signupEmail: "",
    signupPassword: "",
  });

  const handleLogInFormChange = (e) => {
    const { name, value } = e.target;
    setUserSignUpForm({
      ...userSignUpForm,
      [name]: value,
    });
  };

  const handleLogInFormSubmit = async (e) => {
    e.preventDefault();
    await handleUserLogInWithEmailAndPassword(
      userSignUpForm.signupEmail,
      userSignUpForm.signupPassword
    );
  };

  return (
    <>
      <IconButton mr="10" w={6} h={6} p={5} onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </IconButton>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
          width={{ base: "90vw", md: "468px" }}
          padding="50px 10px 30px 10px"
          boxShadow={colorMode === "light" ? "2xl" : "dark-lg"}
          borderRadius="20px"
        >
          <Avatar bg="blue.500" />
          <Heading color="blue.400">Welcome back</Heading>
          <Text>Pick Up where you Left Off</Text>
          <Box minW={{ base: "100%", md: "468px" }}>
            <form onSubmit={handleLogInFormSubmit}>
              <Stack spacing={5} p="1rem" boxShadow="md">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="email address"
                      name="signupEmail"
                      value={userSignUpForm.email}
                      onChange={handleLogInFormChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="signupPassword"
                      value={userSignUpForm.password}
                      onChange={handleLogInFormChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    <Link
                      onClick={() => {
                        handleUserPasswordReset(userSignUpForm.signupEmail);
                      }}
                    >
                      forgot password?
                    </Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius="50px"
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  width="full"
                >
                  Log in
                </Button>
                <Text
                  textAlign="center
                "
                  textDecoration="underline"
                  cursor="pointer"
                  onClick={handleUserSignInWithGoogle}
                >
                  Continue with Google Here
                </Text>
              </Stack>
            </form>
          </Box>

          <Box>
            New to us?{" "}
            <Link to="/create-account">
              {" "}
              <span style={{ color: "blue" }}>Sign Up here</span>
            </Link>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignInPage;
