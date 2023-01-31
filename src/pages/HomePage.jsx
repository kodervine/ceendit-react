import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Hero from "../components/homepageComponents/Hero";
import AboutUs from "../components/homepageComponents/AboutUs";
import Footer from "../components/homepageComponents/Footer";
import Nav from "../components/homepageComponents/Nav";
import Services from "../components/homepageComponents/Services";
import DrawerComponent from "../components/homepageComponents/DrawerComponent";

function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <div>
      <Nav btnRef={btnRef} onOpen={onOpen} />
      <Hero />
      <AboutUs />
      <Services />
      <Footer />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </div>
  );
}

export default HomePage;
