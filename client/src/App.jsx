import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import NavBar from "./components/NavBar.jsx";
import MyFooter from "./components/MyFooter.jsx";
import Responser from "./components/Responser.jsx";
import UseAccordian from "./components/UseAccordian.jsx";
import Hero from "./components/Hero.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import { Alert } from "./components/partials/Alert.jsx";
import Calculator from "./components/MyCalculator.jsx";

// --- SEO Configuration ---
const SEO_CONFIG = {
  siteUrl: "https://uafcgpaharvester.vercel.app/",
  siteTitle: "UAF CGPA Calculator | University of Agriculture Faisalabad",
  siteDescription:
    "Calculate CGPA, Manual and Automatic Calculator, GPA, CGPA harvester with percentage, graph and chart for University of Agriculture Faisalabad students using an accurate and easy-to-use online calculator.",
  keywords:
    "UAF CGPA calculator, GPA calculator, University of Agriculture Faisalabad, CGPA calculation, semester GPA, academic results, UAF tools",
  author: "Muhammad Umair",
  twitterHandle: "@umair12x",
};

// --- Structured Data (JSON-LD) ---
const structuredDataWeb = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "UAF CGPA Calculator",
  url: SEO_CONFIG.siteUrl,
  description: SEO_CONFIG.siteDescription,
  applicationCategory: "EducationalApplication",
  operatingSystem: "All",
  author: {
    "@type": "Person",
    name: SEO_CONFIG.author,
    url: "https://linkedin.com/in/umair12x",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  inLanguage: "en",
  datePublished: "2025-02-01",
  dateModified: new Date().toISOString().split("T")[0],
};

const structuredDataApp = {
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
};

/**
 * SectionRouter
 * Handles the single-page scroll layout and navigation logic.
 */
const SectionRouter = ({ setAlertMessage }) => {
  const location = useLocation();

  useEffect(() => {
    // Extract hash from location (e.g., #calculator)
    const hash = location.hash;
    
    if (hash) {
      // Use a slight delay to allow the DOM to fully render before scrolling
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          // 'scrollIntoView' combined with CSS 'scroll-margin-top' works perfectly
          element.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      }, 100);
    } else if (location.pathname === "/") {
      // If root path and no hash, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // If pathname is like "/calculator", it will be handled by the router routes below
  }, [location]);

  return (
    <div className="min-h-screen">
      {/* NOTE: Added 'scroll-mt-28' (approx 7rem) to all sections.
         This ensures the fixed Navbar doesn't cover the section heading when scrolling.
      */}

      <section
        id="home"
        className="scroll-mt-28"
        aria-labelledby="home-heading"
      >
        <Hero setAlertMessage={setAlertMessage} className="z-10" />
      </section>

      <main>
        {/* Manual Calculator */}
        <section
          id="calculator"
          className="scroll-mt-28"
          aria-labelledby="calculator-heading"
        >
          <Calculator setAlertMessage={setAlertMessage} />
        </section>

        {/* Automatic/Gradulator Section */}
        <section
          id="gradulator"
          className="scroll-mt-28"
          aria-labelledby="gradulator-heading"
        >
          <Responser setAlertMessage={setAlertMessage} />
        </section>
      </main>

      {/* About section */}
      <section
        id="about"
        className="scroll-mt-28"
        aria-labelledby="about-heading"
      >
        <About />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-28" aria-labelledby="faq-heading">
        <UseAccordian />
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="scroll-mt-28"
        aria-labelledby="contact-heading"
      >
        <Contact />
      </section>
    </div>
  );
};

// Main App component
const App = () => {
  const [alertMessage, setAlertMessage] = useState({
    type: "",
    message: "",
  });

  // Auto-dismiss alert logic
  useEffect(() => {
    if (alertMessage.message) {
      const timer = setTimeout(() => {
        setAlertMessage({ type: "", message: "" });
      }, 5000); // Increased to 5 seconds for better UX
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <Router>
      <div className="w-full h-full overflow-x-hidden bg-gradient-to-br from-emerald-50 via-cyan-50 to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Helmet>
          <title>{SEO_CONFIG.siteTitle}</title>
          <meta name="description" content={SEO_CONFIG.siteDescription} />
          <meta name="keywords" content={SEO_CONFIG.keywords} />
          <meta name="author" content={SEO_CONFIG.author} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={SEO_CONFIG.siteUrl} />

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
          <meta property="og:title" content={SEO_CONFIG.siteTitle} />
          <meta
            property="og:description"
            content={SEO_CONFIG.siteDescription}
          />
          <meta property="og:url" content={SEO_CONFIG.siteUrl} />
          <meta
            property="og:image"
            content={`${SEO_CONFIG.siteUrl}/og-image.jpg`}
          />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={SEO_CONFIG.siteTitle} />
          <meta
            name="twitter:description"
            content={SEO_CONFIG.siteDescription}
          />
          <meta
            name="twitter:image"
            content={`${SEO_CONFIG.siteUrl}/twitter-image.jpg`}
          />
          <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />

          {/* Structured Data Scripts */}
          <script type="application/ld+json">
            {JSON.stringify(structuredDataWeb)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(structuredDataApp)}
          </script>
        </Helmet>

        <NavBar className="z-50" />

        {/* Global Alert System */}
        {alertMessage?.message && (
          <div
            className="
              fixed z-50
              top-4 right-4
              sm:top-6 sm:right-6
              md:top-8 md:right-8
              w-[calc(100vw-2rem)]
              sm:w-96
              max-w-full
              animate-slideInRight
            "
          >
            <div
              className="cursor-pointer rounded-lg shadow-xl transform transition-transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => setAlertMessage({ type: "", message: "" })}
            >
              <Alert
                alertMessage={alertMessage}
                autoDismiss={5000}
                onDismiss={() => setAlertMessage({ type: "", message: "" })}
              />
            </div>
          </div>
        )}

        {/* Routes configuration */}
        <Routes>
          {/* All paths render the SectionRouter because this is a Single Page Scroll App */}
          <Route
            path="/"
            element={<SectionRouter setAlertMessage={setAlertMessage} />}
          />
          <Route
            path="/home"
            element={<SectionRouter setAlertMessage={setAlertMessage} />}
          />
          <Route
            path="/calculator"
            element={<SectionRouter setAlertMessage={setAlertMessage} />}
          />
          <Route
            path="/gradulator"
            element={<SectionRouter setAlertMessage={setAlertMessage} />}
          />
          <Route
            path="/about"
            element={<SectionRouter setAlertMessage={setAlertMessage} />}
          />
          <Route
            path="/faq"
            element={<SectionRouter setAlertMessage={setAlertMessage} />}
          />
          <Route
            path="/contact"
            element={<SectionRouter setAlertMessage={setAlertMessage} />}
          />
        </Routes>

        <MyFooter />
      </div>
    </Router>
  );
};

export default App;