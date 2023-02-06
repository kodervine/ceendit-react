import { useState } from "react";
import { useAuthUserContext } from "../context/UserContext";
import {
  Text,
  Flex,
  Heading,
  Input,
  Button,
  IconButton,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  useColorMode,
  InputRightElement,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaUserAlt, FaLock } from "react-icons/fa";

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

// What this page does
// The component uses the state hook useState to keep track of whether the password input should show the password or hide it. The component also uses the React Router DOM navigate hook to navigate the user after successful sign-up.

// The form has two inputs: email and password, with email and password change handlers. Upon submit, the form data is passed to the handleCreateUserWithEmailAndPassword function from Firebase, which creates the user and logs them in. The user is then navigated to the "create-invoice" page.

// There is also a secondary sign-up option using Google by clicking the "Click here" link, which invokes the signInWithGoogle function from Firebase.
