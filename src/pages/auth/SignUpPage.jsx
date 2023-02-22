import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";

import { useAuthUserContext } from "@/context/UserContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignUpPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  // Handle form and showing of password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const { handleCreateUserWithEmailAndPassword, handleUserSignInWithGoogle } =
    useAuthUserContext();

  // User sign up with email and password
  const [userSignUpForm, setUserSignUpForm] = useState({
    signupEmail: "",
    signupPassword: "",
  });

  const handleSignUpFormChange = (e) => {
    const { name, value } = e.target;
    setUserSignUpForm({
      ...userSignUpForm,
      [name]: value,
    });
  };

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();
    await handleCreateUserWithEmailAndPassword(
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
          boxShadow="2xl"
          borderRadius="20px"
        >
          <Avatar bg="blue.500" />
          <Heading color="blue.400">Welcome</Heading>
          <Text>Create your account here</Text>
          <Box minW={{ base: "100%", md: "468px" }}>
            <form onSubmit={handleSignUpFormSubmit}>
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
                      onChange={handleSignUpFormChange}
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
                      onChange={handleSignUpFormChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius="50px"
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  width="full"
                >
                  Sign up
                </Button>
              </Stack>
            </form>
          </Box>
          <Box>
            Join with Google instead?{" "}
            <Link color="blue.500" onClick={handleUserSignInWithGoogle}>
              Click here
            </Link>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignUpPage;
