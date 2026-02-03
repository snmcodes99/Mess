// src/pages/Messes.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./index.css";

// API service
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const apiService = {
  fetchMesses: async (filters, page = 1, limit = 12) => {
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        page,
        limit
      }).toString();
      const response = await fetch(`${API_BASE_URL}/messes?${queryParams}`);
      return response.json();
    } catch (error) {
      console.error("Error fetching messes:", error);
      throw error;
    }
  }
};

function Navbar() {
  const navigate = useNavigate();
  
  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="logo-circle" />
        <span className="brand-name">MessFinder</span>
      </div>

      <nav className="nav-right">
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li className="active">Messes</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>
      </nav>
    </header>
  );
}

function FilterBar({ filters, onFilterChange, onClearFilters, resultsCount }) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="filter-bar">
      <div className="filter-bar-header">
        <div className="results-info">
          <h2>{resultsCount} Messes Found</h2>
          <p>Based on your preferences</p>
        </div>
        
        <button 
          className="toggle-filters-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="filter-icon">⚙</span>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div className="filter-controls">
          <div className="filter-grid">
            <div className="filter-item">
              <label>Location</label>
              <input
                type="text"
                placeholder="Search location..."
                value={filters.location || ""}
                onChange={(e) => onFilterChange("location", e.target.value)}
              />
            </div>

            <div className="filter-item">
              <label>Meal Type</label>
              <select
                value={filters.mealType || ""}
                onChange={(e) => onFilterChange("mealType", e.target.value)}
              >
                <option value="">All Meals</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Diet Type</label>
              <select
                value={filters.dietType || ""}
                onChange={(e) => onFilterChange("dietType", e.target.value)}
              >
                <option value="">All</option>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
                <option value="both">Both Available</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Price Range (₹/month)</label>
              <select
                value={filters.priceRange || ""}
                onChange={(e) => onFilterChange("priceRange", e.target.value)}
              >
                <option value="">Any Price</option>
                <option value="0-2000">Under ₹2000</option>
                <option value="2000-3000">₹2000 - ₹3000</option>
                <option value="3000-4000">₹3000 - ₹4000</option>
                <option value="4000+">Above ₹4000</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Sort By</label>
              <select
                value={filters.sortBy || "rating"}
                onChange={(e) => onFilterChange("sortBy", e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="distance">Nearest First</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button className="clear-filters-btn" onClick={onClearFilters}>
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {Object.keys(filters).some(key => filters[key] && key !== 'sortBy') && (
        <div className="active-filters">
          {filters.location && (
            <div className="filter-tag">
              <span>Location: {filters.location}</span>
              <button onClick={() => onFilterChange("location", "")}>×</button>
            </div>
          )}
          {filters.mealType && (
            <div className="filter-tag">
              <span>Meal: {filters.mealType}</span>
              <button onClick={() => onFilterChange("mealType", "")}>×</button>
            </div>
          )}
          {filters.dietType && (
            <div className="filter-tag">
              <span>Diet: {filters.dietType}</span>
              <button onClick={() => onFilterChange("dietType", "")}>×</button>
            </div>
          )}
          {filters.priceRange && (
            <div className="filter-tag">
              <span>Price: ₹{filters.priceRange}</span>
              <button onClick={() => onFilterChange("priceRange", "")}>×</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MessCard({ mess }) {
  const navigate = useNavigate();

  const getDietBadge = (dietType) => {
    switch (dietType) {
      case "veg":
        return { label: "VEG", className: "diet-badge veg" };
      case "non-veg":
        return { label: "NON-VEG", className: "diet-badge non-veg" };
      case "both":
        return { label: "VEG & NON-VEG", className: "diet-badge both" };
      default:
        return { label: "VEG", className: "diet-badge veg" };
    }
  };

  const dietBadge = getDietBadge(mess.dietType);

  return (
    <div 
      className="mess-card"
      onClick={() => navigate(`/messes/${mess.id}`)}
    >
      <div className="mess-card-image">
        <img src={mess.image} alt={mess.name} />
        <div className={dietBadge.className}>
          {dietBadge.label}
        </div>
        {mess.verified && (
          <div className="verified-badge">
            <span>✓</span> Verified
          </div>
        )}
      </div>

      <div className="mess-card-content">
        <div className="mess-header">
          <h3>{mess.name}</h3>
          <div className="rating">
            <span className="star">★</span>
            <span className="rating-value">{mess.rating}</span>
            <span className="review-count">({mess.reviewCount})</span>
          </div>
        </div>

        <div className="mess-location">
          <span className="location-icon">📍</span>
          {mess.location}
          {mess.distance && <span className="distance"> • {mess.distance}</span>}
        </div>

        <div className="mess-details">
          <div className="detail-item">
            <span className="detail-label">Monthly</span>
            <span className="detail-value">₹{mess.monthlyPrice.toLocaleString()}</span>
          </div>
          <div className="detail-separator">•</div>
          <div className="detail-item">
            <span className="detail-label">Per Meal</span>
            <span className="detail-value">₹{mess.perMealPrice}</span>
          </div>
        </div>

        <div className="mess-features">
          {mess.mealTypes && mess.mealTypes.map((type, index) => (
            <span key={index} className="feature-tag">
              {type}
            </span>
          ))}
        </div>

        <div className="mess-footer">
          <div className="hygiene-rating">
            <span className="hygiene-icon">✨</span>
            Hygiene: {mess.hygieneRating}/5
          </div>
          <button className="view-details-btn">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <h3>No Messes Found</h3>
      <p>Try adjusting your filters to see more results</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="loading-state">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="mess-card-skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);
    
    if (end - start < showPages - 1) {
      start = Math.max(1, end - showPages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      {getPageNumbers().map(page => (
        <button
          key={page}
          className={`page-number ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
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

export const Messes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Get filters from URL params
  const getFiltersFromParams = () => ({
    location: searchParams.get("location") || "",
    mealType: searchParams.get("mealType") || "",
    dietType: searchParams.get("dietType") || "",
    priceRange: searchParams.get("priceRange") || "",
    sortBy: searchParams.get("sortBy") || "rating"
  });

  const [filters, setFilters] = useState(getFiltersFromParams());

  // Fetch messes when filters or page changes
  useEffect(() => {
    const fetchMesses = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await apiService.fetchMesses(filters, currentPage);
        
        // Simulated response - replace with actual API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              data: [
                {
                  id: 1,
                  name: "Rajdhani Mess",
                  location: "Patel Nagar, Delhi",
                  dietType: "veg",
                  monthlyPrice: 3000,
                  perMealPrice: 100,
                  rating: 4.5,
                  reviewCount: 150,
                  image: "https://images.unsplash.com/photo-1603899122634-2f24c0c47e26?auto=format&fit=crop&w=600&q=80",
                  mealTypes: ["breakfast", "lunch", "dinner"],
                  hygieneRating: 4.8,
                  distance: "0.5 km",
                  verified: true
                },
                {
                  id: 2,
                  name: "Punjabi Dhaba Mess",
                  location: "Karol Bagh, Delhi",
                  dietType: "both",
                  monthlyPrice: 3500,
                  perMealPrice: 120,
                  rating: 4.3,
                  reviewCount: 98,
                  image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
                  mealTypes: ["lunch", "dinner"],
                  hygieneRating: 4.5,
                  distance: "1.2 km",
                  verified: true
                },
                {
                  id: 3,
                  name: "South Indian Delights",
                  location: "Lajpat Nagar, Delhi",
                  dietType: "veg",
                  monthlyPrice: 2800,
                  perMealPrice: 90,
                  rating: 4.7,
                  reviewCount: 203,
                  image: "https://images.unsplash.com/photo-1589307004173-3c95204d00e2?auto=format&fit=crop&w=600&q=80",
                  mealTypes: ["breakfast", "lunch", "dinner", "snacks"],
                  hygieneRating: 4.9,
                  distance: "2.1 km",
                  verified: true
                },
                {
                  id: 4,
                  name: "Golden Spice Mess",
                  location: "Rohini, Delhi",
                  dietType: "non-veg",
                  monthlyPrice: 3800,
                  perMealPrice: 130,
                  rating: 4.4,
                  reviewCount: 87,
                  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
                  mealTypes: ["lunch", "dinner"],
                  hygieneRating: 4.6,
                  distance: "3.5 km",
                  verified: false
                },
                {
                  id: 5,
                  name: "Student's Choice Mess",
                  location: "Mukherjee Nagar, Delhi",
                  dietType: "both",
                  monthlyPrice: 2500,
                  perMealPrice: 85,
                  rating: 4.2,
                  reviewCount: 176,
                  image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
                  mealTypes: ["breakfast", "lunch", "dinner"],
                  hygieneRating: 4.3,
                  distance: "1.8 km",
                  verified: true
                },
                {
                  id: 6,
                  name: "Healthy Bites Mess",
                  location: "Dwarka, Delhi",
                  dietType: "veg",
                  monthlyPrice: 3200,
                  perMealPrice: 105,
                  rating: 4.6,
                  reviewCount: 142,
                  image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
                  mealTypes: ["breakfast", "lunch", "dinner"],
                  hygieneRating: 4.7,
                  distance: "4.2 km",
                  verified: true
                }
              ],
              pagination: {
                page: currentPage,
                limit: 12,
                total: 6,
                totalPages: 1
              }
            });
          }, 800);
        });

        setMesses(response.data);
        setTotalPages(response.pagination.totalPages);
        setTotalResults(response.pagination.total);
      } catch (err) {
        setError("Failed to load messes. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMesses();
  }, [filters, currentPage]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) params.set(k, newFilters[k]);
    });
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      location: "",
      mealType: "",
      dietType: "",
      priceRange: "",
      sortBy: "rating"
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    setSearchParams({});
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="messes-page">
      <Navbar />
      
      <div className="messes-container">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          resultsCount={totalResults}
        />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingState />
        ) : messes.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="messes-grid">
              {messes.map(mess => (
                <MessCard key={mess.id} mess={mess} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};