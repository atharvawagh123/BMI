import React, { useState, useRef, useMemo } from "react";
import "./Main.css";
import box from "./photo/box.png";
import normalImage from "./photo/normal.jpg";
import overweightImage from "./photo/over.jpg";
import underweightImage from "./photo/images.jpg";
import obeseImage from "./photo/obse.png";

const Main = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const imageRef = useRef(null);
  const bmiBlogs = {
    underweight: "Underweight blog content",
    normal: "Normal weight blog content",
    overweight: "Overweight blog content",
    obese: "Obese blog content",
  };

  const onWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const onHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const out = useMemo(() => {
    const calculateHeight = height / 100;
    const bmi = weight / (calculateHeight * calculateHeight);

    if (bmi < 18.5) {
      if (imageRef.current) imageRef.current.src = underweightImage;
      return { category: "Underweight", blog: bmiBlogs.underweight };
    } else if (bmi < 25) {
      if (imageRef.current) imageRef.current.src = normalImage;
      return { category: "Normal weight", blog: bmiBlogs.normal };
    } else if (bmi < 30) {
      if (imageRef.current) imageRef.current.src = overweightImage;
      return { category: "Overweight", blog: bmiBlogs.overweight };
    } else {
      if (imageRef.current) imageRef.current.src = obeseImage;
      return { category: "Obese", blog: bmiBlogs.obese };
    }
  }, [
    weight,
    height,
    bmiBlogs,
    normalImage,
    underweightImage,
    overweightImage,
    obeseImage,
  ]);

  return (
    <>
      <div className="main-container">
        <div className="left-div">
          <img src={box} className="left-image" alt="" />
        </div>
        <div className="right-div">
          <div className="inputsection">
            <div className="head-main">
              <p>BMI calculator</p>
            </div>
            <div className="weight-input"> 
              <p className="silderoutput">Weight: {weight} kg</p>
              <input
                className="inputslider"
                type="range"
                step="1"
                min="40"
                max="200"
                value={weight}
                onChange={onWeightChange}
              />
            </div>
            <p className="silderoutput">Height: {height} cm</p>
            <input
              className="inputslider"
              type="range"
              min="140"
              max="220"
              value={height}
              onChange={onHeightChange}
            />
            <div className="category-section">
              <p className="output">BMI: {out.category}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
