import React from "react";
import Hero from "../components/homepageComponents/Hero";
import LandingLayout from "../components/homepageComponents/LandingLayout";

export default function HomePage() {
  return (
    <LandingLayout>
      <Hero
        title="Build this rad landing page from scratch"
        subtitle="This is the subheader section where you describe the basic benefits of your product"
        image="https://source.unsplash.com/collection/404339/800x600"
        ctaText="Create your account now"
        ctaLink="/signup"
      />
    </LandingLayout>
  );
}
