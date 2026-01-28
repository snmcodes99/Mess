import React, { useState } from "react";
import "./owner.css";

export default function MessForm() {
  const [formData, setFormData] = useState({
    messName: "",
    ownerName: "",
    locality: "",
    contact: "",
    foodType: "",
    price: "",
    meals: {
      breakfast: false,
      lunch: false,
      dinner: false,
    },
    kitchenType: "",
    cleanliness: "",
    days: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

   
    if (name === "days") {
      setFormData((prev) => ({
        ...prev,
        days: checked
          ? [...prev.days, value]
          : prev.days.filter((d) => d !== value),
      }));
      return;
    }

    
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        meals: {
          ...prev.meals,
          [name]: checked,
        },
      }));
      return;
    }

   
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    console.log("Final JSON:", JSON.stringify(formData, null, 2));

    alert("Check Console (F12 → Console) to see JSON output");
  };

  return (
    <div className="page">

      <div className="header">
        <h1>List Your Mess</h1>
        <p className="subtitle">
          Reach more students. Manage menus easily. Get verified.
        </p>
      </div>

      <form className="form" onSubmit={handleSubmit}>

      
        <section className="card">
          <h2>Basic Details</h2>

          <input
            type="text"
            placeholder="Mess Name"
            name="messName"
            value={formData.messName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Owner Name"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Locality / Area"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Contact No"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />

          <div className="radio-row">
            <label>
              <input
                type="radio"
                name="foodType"
                value="Veg"
                checked={formData.foodType === "Veg"}
                onChange={handleChange}
              /> Veg
            </label>
            <label>
              <input
                type="radio"
                name="foodType"
                value="Non-Veg"
                checked={formData.foodType === "Non-Veg"}
                onChange={handleChange}
              /> Non-Veg
            </label>
            <label>
              <input
                type="radio"
                name="foodType"
                value="Both"
                checked={formData.foodType === "Both"}
                onChange={handleChange}
              /> Both
            </label>
          </div>
        </section>

       
        <section className="card">
          <h2>Food & Pricing Details</h2>

          <input
            type="text"
            placeholder="Monthly Pricing"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <div className="radio-col">
            <label>
              <input
                type="checkbox"
                name="breakfast"
                checked={formData.meals.breakfast}
                onChange={handleChange}
              /> Breakfast
            </label>
            <label>
              <input
                type="checkbox"
                name="lunch"
                checked={formData.meals.lunch}
                onChange={handleChange}
              /> Lunch
            </label>
            <label>
              <input
                type="checkbox"
                name="dinner"
                checked={formData.meals.dinner}
                onChange={handleChange}
              /> Dinner
            </label>
          </div>

          <label className="upload">
            Upload Photos (Optional)
            <input type="file" multiple hidden />
          </label>
        </section>

       
        <section className="card">
          <h2>Hygiene & Availability</h2>

          <h4>Kitchen Type</h4>
          <div className="radio-col">
            <label>
              <input
                type="radio"
                name="kitchenType"
                value="Home Kitchen"
                checked={formData.kitchenType === "Home Kitchen"}
                onChange={handleChange}
              /> Home Kitchen
            </label>
            <label>
              <input
                type="radio"
                name="kitchenType"
                value="Commercial Kitchen"
                checked={formData.kitchenType === "Commercial Kitchen"}
                onChange={handleChange}
              /> Commercial Kitchen
            </label>
          </div>

          <h4>Cleanliness Commitment</h4>
          <div className="radio-col">
            <label>
              <input
                type="radio"
                name="cleanliness"
                value="Daily Cleaning"
                checked={formData.cleanliness === "Daily Cleaning"}
                onChange={handleChange}
              /> Daily Cleaning
            </label>
            <label>
              <input
                type="radio"
                name="cleanliness"
                value="Weekly Cleaning"
                checked={formData.cleanliness === "Weekly Cleaning"}
                onChange={handleChange}
              /> Weekly Cleaning
            </label>
          </div>

          <h4>Available Days</h4>
          <div className="days">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <label key={d}>
                <input
                  type="checkbox"
                  name="days"
                  value={d}
                  checked={formData.days.includes(d)}
                  onChange={handleChange}
                /> {d}
              </label>
            ))}
          </div>
        </section>

        <section className="card info">
          🔒 Your details are safe  
          <br />
          ⏱ Verification within 24–48 hrs  
          <br />
          ✅ Only verified messes go live
        </section>

        <button className="submit">Submit For Verification</button>

       

      </form>
    </div>
  );
}
