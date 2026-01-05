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

  const siteUrl = "https://uaf-cgpa-calculator.vercel.app";
  const siteTitle =
    "UAF CGPA Calculator | University of Agriculture Faisalabad";
  const siteDescription =
    "Calculate CGPA, GPA, and percentage for University of Agriculture Faisalabad students using an accurate and easy to use online calculator";
  const keywords =
    "UAF CGPA calculator, GPA calculator, University of Agriculture Faisalabad, CGPA calculation, semester GPA, academic results, UAF tools";

  return (
    <div className="w-full h-full overflow-x-hidden bg-white dark:bg-gradient-to-r from-gray-800 via-gray-900 to-[#0b0514]">
      <Helmet>
        {/* Basic SEO */}
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Muhammad Umair" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} />

        {/* Viewport */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        

        {/* Theme */}
        <meta name="theme-color" content="#0b0514" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="UAF CGPA Calculator" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={`${siteUrl}/twitter-image.jpg`} />
        <meta name="twitter:creator" content="@umair12x" />

        {/* Structured Data, WebApplication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "UAF CGPA Calculator",
            url: siteUrl,
            description: siteDescription,
            applicationCategory: "EducationalApplication",
            operatingSystem: "All",
            author: {
              "@type": "Person",
              name: "Muhammad Umair",
              url: "https://linkedin.com/in/umair12x",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            inLanguage: "en",
            datePublished: "2024-01-01",
            dateModified: new Date().toISOString().split("T")[0],
          })}
        </script>

        {/* Structured Data, FAQ friendly */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "UAF CGPA Calculator",
            operatingSystem: "Web",
            applicationCategory: "EducationalApplication",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "150",
            },
          })}
        </script>
      </Helmet>

      <NavBar className="z-100" />
      <main className="container z-30 mx-auto px-2">
        {alertMessage.message && (
          <div className="fixed top-4 right-4 z-50 animate-slideIn cursor-not-allowed rounded-md">
            <Alert alertMessage={alertMessage} />
          </div>
        )}
        <Hero className="z-50" />
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
