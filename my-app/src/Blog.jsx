import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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

  const downloadPDF = async () => {
    const input = document.getElementById("blog-content");

    // Capture HTML as canvas
    const canvas = await html2canvas(input, {
      scale: 2, // Higher scale for better quality
      backgroundColor: null, // Transparent background
    });

    // Convert canvas to image
    const imgData = canvas.toDataURL("image/png");

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const imgWidth = 190; // Width of the image in mm
    const pageHeight = 295; // Height of the page in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add image to PDF
    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add new pages if necessary
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Add header and footer to each page
    pdf.setFontSize(12);
    pdf.setTextColor("#000000");
    pdf.text("Page " + pdf.internal.getNumberOfPages(), 190, 10, {
      align: "right",
    }); // Footer

    // Save the PDF
    pdf.save("blog-post.pdf");
  };

  return (
    <div className={`blog-container ${theme}`} style={colorCombination}>
      <ToastContainer />
      <div id="blog-content" className="blog-post">
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
          </div>
        </div>
        <div className="buttons">
          <button onClick={toggleRelatedPosts} className="button">
            Read more
          </button>
          <button onClick={downloadPDF} className="button">
            Download PDF
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
