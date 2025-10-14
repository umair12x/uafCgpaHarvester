import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import NavBar from "./components/navbar";
import MyFooter from "./components/MyFooter";
import Output from "./components/Responser";
import UseAccordian from "./components/UseAccordian";
import { cn } from "./components/lib/utils";
import Hero from "./components/Hero";
import "./App.css";
import Contact from "./components/Contact";
import About from "./components/About";
import { Alert } from "./components/partials/Alert";

const App = () => {
  const [alertMessage, setAlertMessage] = useState({
    type: "",
    message: "",
  });
  useEffect(() => {
    if (alertMessage.message) {
      const timer = setTimeout(() => {
        setAlertMessage({ type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div className="w-full h-full overflow-x-hiddenbg-white dark:bg-gradient-to-r from-gray-800 via-gray-900 to-[#0b0514]">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>UAF Cgpa Calculator-Umair </title>
        <meta
          name="description"
          content="Explore our amazing features and tools to find the best result for the CGPA Calculating of University of Agriculture Faisalabad"
        />
        <meta
          name="keywords"
          content="Cgpa tools, Uaf, ,University-of-Agriculture- Faisalabad, calculator , React.js, SEO-friendly"
        />
        <meta name="author" content="Muhammad Umair" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph for Social Media */}
        <meta
          property="og:title"
          content="Awesome Website - Boost Your Experience"
        />
        <meta
          property="og:description"
          content="Explore our amazing features and tools to enhance your result experience."
        />
        <meta
          property="og:image"
          content="https://yourwebsite.com/og-image.jpg"
        />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta property="og:type" content="website" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Awesome Website",
            url: "https://yourwebsite.com/",
            description:
              "Explore our amazing features and tools to enhance your web experience.",
            author: {
              "@type": "Person",
              name: "Your Name",
            },
          })}
        </script>
      </Helmet>

      <NavBar className="z-100" />
      <main className={cn("container z-30 mx-auto px-4")}>
        {alertMessage && (
          <div className="fixed top-1 right-4 z-50 animate-slideIn  cursor-not-allowed  rounded-md">
            <Alert
              alertMessage={alertMessage}
            />
          </div>
        )}
        <Hero className={cn("z-50 ")} />
        <Output className="z-10" setAlertMessage={setAlertMessage} />
        <About />
        <Contact />
        <UseAccordian />
      </main>
      <MyFooter />
    </div>
  );
};

export default App;
