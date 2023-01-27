import React, { useState } from "react";
import "./contribution.css";

function Contribution() {
  // State to store the form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    amount: "",
  });

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the form data to the server or perform other logic here
    console.log(formData);
    setFormData({ name: "", email: "", message: "", amount: "" });
  };

  return (
    <div className="contribution-form">
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contribution;
