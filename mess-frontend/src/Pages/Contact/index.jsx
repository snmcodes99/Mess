import React from "react";
import "./index.css";

export const Contact=()=> {
  return (
    <div className="app">

      {/* Header Image */}
      <div className="header"></div>

      {/* Main Section */}
      <div className="container">

        <h1>GET IN TOUCH</h1>

        <p className="subtitle">
          Access saved messes, reviews, and personalized questions.
          Feedback or want your mess listed? We’re here to help.
        </p>

        {/* Contact Form */}
        <div className="form-box">
          <form>

            <input type="text" placeholder="Enter Name" />

            <input type="email" placeholder="Enter Email" />

            <textarea
              rows="4"
              placeholder="Enter Message..."
            ></textarea>

            <button type="submit">Send Message</button>

          </form>
        </div>

        {/* Info Cards */}
        <div className="cards">

          <div className="card">
            <h3>E-Mail</h3>
            <p>xyz123@gmail.com</p>
            <span>Replies within 24 hours</span>
          </div>

          <div className="card">
            <h3>Location</h3>
            <p>Serving students in Dehradun</p>
          </div>

          <div className="card">
            <h3>Mess Owner</h3>
            <p>Want to list your mess?</p>
            <button className="small-btn">List</button>
          </div>

        </div>

        {/* Explore Section */}
        <div className="explore">

          <p>
            Find your next mess without the guesswork.
            Browse verified messes, menus, and reviews — all in one place.
          </p>

          <button>Explore</button>

        </div>

      </div>

      {/* Footer */}
      <footer>
        <span>Privacy</span>
        <span>Terms</span>
        <span>Contacts</span>
      </footer>

    </div>
  );
}