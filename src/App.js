import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Simple front-end email validation
  const validateEmail = (emailAddress) => {
    // Basic email pattern check
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailAddress);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // 1. Check for empty email
    if (!email) {
      setErrorMessage("Email is required.");
      return;
    }

    // 2. Validate email format
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      // 3. Submit to API (POST request)
      const response = await fetch("https://test.ezworks.ai/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      // If the API returns 422, it usually indicates email ends with @ez.works
      if (response.status === 422) {
        setErrorMessage(data?.message || "Invalid email (ends with @ez.works).");
        return;
      }

      // If successful (200)
      if (response.status === 200) {
        setSuccessMessage("Form Submitted");
        setEmail("");
        return;
      }

      // Handle other potential error statuses
      setErrorMessage(data?.message || "Something went wrong. Please try again.");
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="appContainer">
      <div className="leftSection">
      <img className ="ezlogo" src="/EZlogo.png" alt="Logo" />
      <div className="ez-info">
        <h2 className="subtitle">Suite Of Business Support Services</h2>
          <p className="paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          </p>

          <form onSubmit={handleSubmit} className="formContainer">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputField"
            />
            <button type="submit" className="submitButton">
              Contact Me
            </button>
          </form>
        </div>

        {errorMessage && <p className="message error">{errorMessage}</p>}
        {successMessage && <p className="message success">{successMessage}</p>}
      </div>

      <div className="rightSection">
        <div className="card">
          <div className="head-logo">
            <img src="/presentation.png" alt="Logo" />
            <h3 className="cardHeading">Presentation Design</h3>
          </div>
          <p className="cardDesc">Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,</p>
        </div>
        <div className="card">
          <div className="head-logo">
            <img src="/audio.png" alt="Logo" />
            <h3 className="cardHeading">Audio-Visual Production</h3>
          </div>
          <p className="cardDesc">Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,</p>
        </div>
        <div className="card">
          <div className="head-logo">
            <img src="/translation.png" alt="Logo" />
            <h3 className="cardHeading">Translation Services</h3>
          </div>
          <p className="cardDesc">Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,</p>
        </div>
        <div className="card">
          <div className="head-logo">
            <img src="/design.png" alt="Logo" />
            <h3 className="cardHeading">Graphic <br/> Design</h3>
          </div>
          <p className="cardDesc">Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,</p>
        </div>
        <div className="card">
          <div className="head-logo">
            <img src="/research.png" alt="Logo" />
            <h3 className="cardHeading">Research &amp; Analytics</h3>
          </div>
          <p className="cardDesc">Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,</p>
        </div>
        <div className="card">
          <div className="head-logo">
            <img src="/data.png" alt="Logo" />
            <h3 className="cardHeading">Data <br/>Processing</h3>
          </div>
          <p className="cardDesc">Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,</p>
        </div>
      </div>
    </div>
  );
}

export default App;
