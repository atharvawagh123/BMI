import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Suggestion.css";

const SuggestionForm = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");
  const [senderName, setSenderName] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    setSenderName(form.current.user_name.value);

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        () => {
          setStatusMessage("Suggestion sent successfully!");
          form.current.reset();
        },
        () => {
          setStatusMessage(
            "Failed to send suggestion. Please try again later."
          );
        }
      );
  };

  return (
    <div className="suggestion-container">
      <h2>Submit a Suggestion</h2>
      <form ref={form} onSubmit={sendEmail} className="suggestion-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="user_name"
            onChange={(e) => setSenderName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="user_email" required />
        </div>
        <div className="form-group">
          <label htmlFor="suggestion">Suggestion</label>
          <textarea id="suggestion" name="message" required></textarea>
        </div>
        <button type="submit">Submit Suggestion</button>
        {statusMessage && (
          <p
            className={`status-message ${
              statusMessage.includes("successfully") ? "success" : "error"
            }`}
          >
            {statusMessage}
            {statusMessage.includes("successfully") && senderName && (
              <span> Thank you, {senderName}!</span>
            )}
          </p>
        )}
      </form>
    </div>
  );
};

export default SuggestionForm;
