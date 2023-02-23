import { useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";

import AboutUs from "@/components/homepage/AboutUs";
import DrawerComponent from "@/components/homepage/DrawerComponent";
import Footer from "@/components/homepage/Footer";
import Hero from "@/components/homepage/Hero";
import Nav from "@/components/homepage/Nav";
import Services from "@/components/homepage/Services";

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
