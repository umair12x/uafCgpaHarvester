import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/Navbar.jsx";
import MyFooter from "./components/MyFooter.jsx";
import Responser from "./components/Responser.jsx";
import UseAccordian from "./components/UseAccordian.jsx";
import Hero from "./components/Hero.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import { Alert } from "./components/partials/Alert.jsx";

// Wrapper component to handle section routing
const SectionRouter = ({ setAlertMessage }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to hash when location changes
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // Scroll to top if no hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <section id="home" aria-labelledby="home-heading">
        <Hero setAlertMessage={setAlertMessage} className="z-10" />
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 space-y-12 md:space-y-16">
        {/* About section */}
        <section id="calculator" aria-labelledby="calculator-heading">
          <Responser setAlertMessage={setAlertMessage} className="z-10" />
        </section>

        {/* About section */}
        <section id="about" aria-labelledby="about-heading">
          <About />
        </section>

        {/* FAQ Section */}
        <section id="faq" aria-labelledby="faq-heading">
          <UseAccordian />
        </section>

        {/* Contact Section */}
        <section id="contact" aria-labelledby="contact-heading">
          <Contact />
        </section>
      </main>
    </div>
  );
};

// Main App component
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
    "Calculate CGPA, GPA, Cgpa harvester with percentage , graph and chart for University of Agriculture Faisalabad students using an accurate and easy to use online calculator";
  const keywords =
    "UAF CGPA calculator, GPA calculator, University of Agriculture Faisalabad, CGPA calculation, semester GPA, academic results, UAF tools";

  return (
    <Router>
      <div className="w-full h-full overflow-x-hidden bg-gradient-to-br from-emerald-50 via-cyan-50 to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Helmet>
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
              datePublished: "2025-02-01",
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

        {alertMessage.message && (
          <div className="fixed top-4 right-4 z-50 animate-slideIn cursor-not-allowed rounded-md">
            <Alert alertMessage={alertMessage} />
          </div>
        )}

        <Routes>
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

        {/* Footer */}
        <MyFooter />
      </div>
    </Router>
  );
};

export default App;
