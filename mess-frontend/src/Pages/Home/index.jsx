import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";

// API service (replace with your actual backend endpoints)
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const apiService = {
  fetchMesses: async (filters) => {
    // TODO: Replace with actual API call
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE_URL}/messes?${queryParams}`);
    return response.json();
  },
  
  fetchMealTypes: async () => {
    // TODO: Replace with actual API call
    const response = await fetch(`${API_BASE_URL}/meal-types`);
    return response.json();
  },
  
  fetchFeatures: async () => {
    // TODO: Replace with actual API call
    const response = await fetch(`${API_BASE_URL}/features`);
    return response.json();
  }
};

function Navbar() {
  const navigate = useNavigate();
  
  const onContactClick = () => {
    navigate("/contact");
  };
  
  const onMessesClick = () => {
    navigate("/messes");
  };
  
  const onHomeClick = () => {
    navigate("/");
  };
  
  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="logo-circle" />
        <span className="brand-name">MessFinder</span>
      </div>

      <nav className="nav-right">
        <ul>
          <li className="active" onClick={onHomeClick}>Home</li>
          <li onClick={onMessesClick}>Messes</li>
          <li onClick={onContactClick}>Contact</li>
        </ul>
      </nav>
    </header>
  );
}

function HeroSection({ onSearch }) {
  const [filters, setFilters] = useState({
    location: "",
    mealType: "",
    dietType: "",
    priceRange: ""
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearch = () => {
    onSearch(filters);
  };
  
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-search">
          <div 
            className="search-pill primary" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="pill-label">
              {filters.location || "Near you"}
            </span>
          </div>
          <div 
            className="search-pill secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="pill-label">
              {filters.mealType || "Meal type"}
            </span>
          </div>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        
        {showFilters && (
          <div className="filter-dropdown">
            <div className="filter-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>
            
            <div className="filter-group">
              <label>Meal Type</label>
              <select
                value={filters.mealType}
                onChange={(e) => setFilters({...filters, mealType: e.target.value})}
              >
                <option value="">All Meals</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Diet Type</label>
              <select
                value={filters.dietType}
                onChange={(e) => setFilters({...filters, dietType: e.target.value})}
              >
                <option value="">All</option>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
                <option value="both">Both Available</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Price Range (₹/month)</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              >
                <option value="">Any Price</option>
                <option value="0-2000">Under ₹2000</option>
                <option value="2000-3000">₹2000 - ₹3000</option>
                <option value="3000-4000">₹3000 - ₹4000</option>
                <option value="4000+">Above ₹4000</option>
              </select>
            </div>
          </div>
        )}

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

function FeaturesSection({ features }) {
  // Default features if none provided from backend
  const defaultFeatures = [
    {
      id: 1,
      title: "VERIFIED MESS LISTINGS",
      description: "Only genuine messes."
    },
    {
      id: 2,
      title: "DAILY MENU PREVIEW",
      description: "See today's menu before you go."
    },
    {
      id: 3,
      title: "PRICING TRANSPARENCY",
      description: "Clear monthly & per‑meal pricing."
    },
    {
      id: 4,
      title: "LOCATION‑BASED SEARCH",
      description: "Find messes near your hostel, PG, or college."
    },
    {
      id: 5,
      title: "REAL STUDENT REVIEWS",
      description: "Honest reviews from real students."
    },
    {
      id: 6,
      title: "HYGIENE & QUALITY RATINGS",
      description: "Cleanliness and food quality scores."
    },
    {
      id: 7,
      title: "CONTACT & VISIT INFO",
      description: "Direct call, address, and timings."
    },
    {
      id: 8,
      title: "FOR MESS OWNERS",
      description: "List your mess, reach more students."
    }
  ];
  
  const displayFeatures = features || defaultFeatures;

  return (
    <section className="section features">
      <div className="features-grid">
        {displayFeatures.map((feature) => (
          <div className="feature-card" key={feature.id}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DailyMealsSection({ mealTypes }) {
  // Default meal types if none provided from backend
  const defaultMealTypes = [
    {
      id: 1,
      type: "veg",
      title: "VEG THALI",
      subtitle: "Nutritious vegetarian meals for every day",
      imageUrl: "https://images.unsplash.com/photo-1603899122634-2f24c0c47e26?auto=format&fit=crop&w=900&q=80",
      priceRange: "₹80-150 per meal"
    },
    {
      id: 2,
      type: "non-veg",
      title: "NON-VEG THALI",
      subtitle: "Protein-rich meals with chicken, egg, and fish",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
      priceRange: "₹100-200 per meal"
    },
    {
      id: 3,
      type: "snacks",
      title: "SNACKS & LIGHT MEALS",
      subtitle: "Perfect for evenings or quick bites",
      imageUrl: "https://images.unsplash.com/photo-1589307004173-3c95204d00e2?auto=format&fit=crop&w=900&q=80",
      priceRange: "₹30-80 per item"
    }
  ];
  
  const displayMealTypes = mealTypes || defaultMealTypes;

  return (
    <section className="section daily-meals">
      <div className="section-heading">
        <h2>DAILY MEALS</h2>
        <p>What students actually eat every day</p>
      </div>

      <div className="meals-grid">
        {displayMealTypes.map((meal) => (
          <div className="meal-card" key={meal.id}>
            <div className="meal-image-wrapper">
              <img src={meal.imageUrl} alt={meal.title} />
              {meal.type && (
                <span className={`meal-badge ${meal.type}`}>
                  {meal.type === "veg" ? "VEG" : meal.type === "non-veg" ? "NON-VEG" : "SNACKS"}
                </span>
              )}
            </div>
            <h3>{meal.title}</h3>
            <p>{meal.subtitle}</p>
            {meal.priceRange && (
              <span className="meal-price">{meal.priceRange}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  const navigate = useNavigate();
  
  const handleExplore = () => {
    navigate("/messes");
  };
  
  return (
    <section className="section cta">
      <div className="cta-inner">
        <div className="cta-text">
          <h2>FIND YOUR NEXT MESS WITHOUT THE GUESSWORK</h2>
          <p>
            Browse verified messes near you, check menus, pricing, and reviews —
            all in one place. Trusted by students, built for everyday meals.
          </p>
          <button className="cta-button" onClick={handleExplore}>
            Explore messes near you
          </button>
        </div>
        <div className="cta-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
            alt="Food bowl"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>MessFinder</h4>
          <p>Finding the perfect mess made easy</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>For Mess Owners</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export const Home = () => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState(null);
  const [mealTypes, setMealTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch data from backend on component mount
    const fetchData = async () => {
      try {
        // Uncomment when backend is ready
        // const [featuresData, mealTypesData] = await Promise.all([
        //   apiService.fetchFeatures(),
        //   apiService.fetchMealTypes()
        // ]);
        // setFeatures(featuresData);
        // setMealTypes(mealTypesData);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleSearch = async (filters) => {
    // Navigate to messes page with filters
    const queryParams = new URLSearchParams(filters).toString();
    navigate(`/messes?${queryParams}`);
  };

  if (loading) {
    return (
      <div className="app loading">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      <HeroSection onSearch={handleSearch} />
      <FeaturesSection features={features} />
      <DailyMealsSection mealTypes={mealTypes} />
      <CTASection />
      <Footer />
    </div>
  );
};