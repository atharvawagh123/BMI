import React, { useState } from "react";
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Blog.css";
import blog from "./photo/blog.jpg";

const FitnessBlogPost = () => {
  const [showRelatedPosts, setShowRelatedPosts] = useState(false);
  const [theme, setTheme] = useState("light");
  const [colorCombination, setColorCombination] = useState({
    backgroundColor: "#ffffff",
    color: "#729762",
  });

  const toggleRelatedPosts = () => setShowRelatedPosts(!showRelatedPosts);

  const copyText = () => {
    const textToCopy = document.getElementById("text-to-copy");
    textToCopy.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    toast.success("Text copied!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className={`blog-container ${theme}`} style={colorCombination}>
      <ToastContainer />
      <div className="blog-post">
        <h2 className="post-title">The Benefits of Regular Exercise</h2>
        <p className="post-meta">Posted on June 25, 2024 by Fitness Guru</p>
        <div className="post-content">
          <img src={blog} alt="Fitness" className="post-image" />
          <div className="text-content">
            <p>
              Regular exercise is crucial for maintaining good health and
              overall well-being. It not only helps in controlling weight and
              reducing the risk of chronic diseases but also improves mood and
              boosts energy levels.
            </p>
            <p>
              One of the key benefits of exercise is its impact on mental
              health. Physical activity stimulates various brain chemicals that
              may leave you feeling happier, more relaxed, and less anxious.
            </p>
            <p>
              Additionally, exercise plays a vital role in weight management. By
              burning calories, exercise can help you maintain or lose weight,
              which in turn reduces the risk of developing obesity-related
              diseases.
            </p>
            <p>
              Furthermore, regular physical activity can improve muscle strength
              and boost endurance, making everyday tasks easier to perform. It
              also promotes better sleep, which is essential for overall health
              and well-being.
            </p>
            <textarea
              id="text-to-copy"
              style={{ display: "none" }}
              value="Your copied text goes here"
              readOnly
            ></textarea>
          </div>
        </div>
        <div className="buttons">
          <button onClick={toggleRelatedPosts} className="button read-more">
            Read more
          </button>
          <button onClick={copyText} className="button">
            Copy Text
          </button>
        </div>
      </div>
      {showRelatedPosts && (
        <div className="related-posts">
          <h3>Related Posts</h3>
          <ul>
            <li>
              <a href="#">Benefits of Yoga for Mind and Body</a>
            </li>
            <li>
              <a href="#">Healthy Eating Habits to Improve Your Life</a>
            </li>
            <li>
              <a href="#">Cardio vs. Strength Training: Which is Better?</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FitnessBlogPost;
