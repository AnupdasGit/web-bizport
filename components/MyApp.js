import { Box } from "@chakra-ui/layout";
import Centralized from "pages/centralizedpage";
import CustomizedPage from "pages/Customized";
import ERetail from "pages/ERetailPage";
import Features from "pages/Features";
import IndustryExpertise from "pages/IndustryExpertise";
import MobileAppDevelopment from "pages/Mobilepage";
import WebpageDevelopment from "pages/webpageDevelopment";
import WhatWeOffer from "pages/whatWeOffer";
import React from "react";
import AboutPage from "../pages/about";
 import HomePageComponent from "../pages/Homepage"; 
import ContactForm from "pages/ContactForm";

export default function MyApp() {
  return (
    <Box>
      {" "}
      <HomePageComponent />
      <AboutPage />
      <WhatWeOffer />
      <CustomizedPage />
      <MobileAppDevelopment />
      <IndustryExpertise />
      <WebpageDevelopment />
      <ERetail />
      <Features />
      <Centralized />
      <ContactForm/>
    </Box>
  );
}
