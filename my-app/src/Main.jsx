import React, { useState, useMemo, useEffect } from "react";
import { jsPDF } from "jspdf";
import "./Main.css";

const Main = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [suggestion, setSuggestion] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);

  const bmiBlogs = {
    underweight: "Underweight blog content",
    normal: "Normal weight blog content",
    overweight: "Overweight blog content",
    obese: "Obese blog content",
  };

  const out = useMemo(() => {
    const calculateHeight = height / 100;
    const bmi = weight / (calculateHeight * calculateHeight);

    if (bmi < 18.5) {
      return { category: "Underweight", blog: bmiBlogs.underweight };
    } else if (bmi < 25) {
      return { category: "Normal weight", blog: bmiBlogs.normal };
    } else if (bmi < 30) {
      return { category: "Overweight", blog: bmiBlogs.overweight };
    } else {
      return { category: "Obese", blog: bmiBlogs.obese };
    }
  }, [weight, height, bmiBlogs]);

  const fetchSuggestion = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/get-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: out.category }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuggestion(data.suggestion);
    } catch (error) {
      console.error("Error fetching suggestion:", error.message);
    }
  };

  useEffect(() => {
    if (showSuggestion) {
      fetchSuggestion();
    }
  }, [showSuggestion, out.category]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("BMI Suggestion", 10, 10);
    doc.text(suggestion, 10, 20);
    doc.save("suggestion.pdf");
  };

  return (
    <div className="main-container">
      <div className="right-div">
        <div className="inputsection">
          <div className="head-main">
            <p>BMI Calculator</p>
          </div>
          <div className="weight-input">
            <p className="slider-output">Weight: {weight} kg</p>
            <input
              className="input-slider"
              type="range"
              step="1"
              min="40"
              max="200"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <p className="slider-output">Height: {height} cm</p>
          <input
            className="input-slider"
            type="range"
            min="140"
            max="220"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <div className="category-section">
            <p className="output">BMI: {out.category}</p>
          </div>
            <button className="suggestion-button" onClick={downloadPDF}>
              Download Suggestion as PDF
            </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
