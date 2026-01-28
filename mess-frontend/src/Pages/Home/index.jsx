import { useAuth} from "../../context/context_rout"


// src/App.jsx
import React from "react";
import "./App.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="logo-circle" />
        <span className="brand-name">MessFinder</span>
      </div>

      <nav className="nav-right">
        <ul>
          <li className="active">Home</li>
          <li>Messes</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-search">
          <div className="search-pill primary">
            <span className="pill-label">Near you</span>
          </div>
          <div className="search-pill secondary">
            <span className="pill-label">Meal type</span>
          </div>
        </div>

        <div className="hero-social">
          <div className="social-icon">f</div>
          <div className="social-icon">@</div>
          <div className="social-icon">in</div>
          <div className="social-icon">●</div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "VERIFIED MESS LISTINGS",
      desc: "Only genuine messes."
    },
    {
      title: "DAILY MENU PREVIEW",
      desc: "See today's menu before you go."
    },
    {
      title: "PRICING TRANSPARENCY",
      desc: "Clear monthly & per‑meal pricing."
    },
    {
      title: "LOCATION‑BASED SEARCH",
      desc: "Find messes near your hostel, PG, or college."
    },
    {
      title: "REAL STUDENT REVIEWS",
      desc: "Honest reviews from real students."
    },
    {
      title: "HYGIENE & QUALITY RATINGS",
      desc: "Cleanliness and food quality scores."
    },
    {
      title: "CONTACT & VISIT INFO",
      desc: "Direct call, address, and timings."
    },
    {
      title: "FOR MESS OWNERS",
      desc: "List your mess, reach more students."
    }
  ];

  return (
    <section className="section features">
      <div className="features-grid">
        {features.map((f) => (
          <div className="feature-card" key={f.title}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DailyMealsSection() {
  const meals = [
    {
      title: "NORTH INDIAN THALI",
      subtitle: "Simple, filling, everyday meals",
      img: "https://images.unsplash.com/photo-1603899122634-2f24c0c47e26?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "SNACKS & LIGHT MEALS",
      subtitle: "Perfect for evenings or quick bites",
      img: "https://images.unsplash.com/photo-1589307004173-3c95204d00e2?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "SPECIAL & GRAVY DISHES",
      subtitle: "For days you want something extra",
      img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80"
    }
  ];

  return (
    <section className="section daily-meals">
      <div className="section-heading">
        <h2>DAILY MEALS</h2>
        <p>What students actually eat every day</p>
      </div>

      <div className="meals-grid">
        {meals.map((meal) => (
          <div className="meal-card" key={meal.title}>
            <div className="meal-image-wrapper">
              <img src={meal.img} alt={meal.title} />
            </div>
            <h3>{meal.title}</h3>
            <p>{meal.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section cta">
      <div className="cta-inner">
        <div className="cta-text">
          <h2>FIND YOUR NEXT MESS WITHOUT THE GUESSWORK</h2>
          <p>
            Browse verified messes near you, check menus, pricing, and reviews —
            all in one place. Trusted by students, built for everyday meals.
          </p>
          <button className="cta-button">Explore messes near you</button>
        </div>
        <div className="cta-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
            alt="Pasta bowl"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="footer" />;
}


  
export const Home =()=>{
    const{isAuthenticated,setIsAuthenticated} = useAuth();
    const onlogClick=()=>{
        setIsAuthenticated(!isAuthenticated);
    }
 
    return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DailyMealsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

