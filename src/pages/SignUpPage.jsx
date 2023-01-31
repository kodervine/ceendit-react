import { useState } from "react";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
  handleCreateUserWithEmailAndPassword,
} from "../firebase-config";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignUpPage = () => {
  // Handle form and showing of password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const navigateUser = useNavigate();
  const { currentUser } = useGlobalContext();
  const handleRegisterUser = async () => {
    try {
      await signInWithGoogle();
      await navigateUser("/create-invoice");
    } catch (e) {
      console.log(e);
    }
  };

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
    await navigateUser("/create-invoice");
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="white"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        backgroundColor="white"
        width={{ base: "90vw", md: "468px" }}
        padding="50px 10px 30px 10px"
        boxShadow="2xl"
        borderRadius="20px"
      >
        <Avatar bg="blue.500" />
        <Heading color="blue.400">Welcome</Heading>
        <Box minW={{ base: "100%", md: "468px" }}>
          <form onSubmit={handleSignUpFormSubmit}>
            <Stack
              spacing={5}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
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
          Register with Google instead?{" "}
          <Link color="blue.500" onClick={handleRegisterUser}>
            Click here
          </Link>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUpPage;
