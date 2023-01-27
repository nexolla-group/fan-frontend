import React from "react";
import "./article.css";

const Article = ({ imgUrl, date, title }) => {
  return (
    <div className="platform__fixtures-container_article">
      <div className="platform__fixtures-container_article-image">
        <img src={imgUrl} alt="fixturesImage" />
      </div>
      <div className="platform__fixtures-container_article-content">
        <div>
          <p>{date}</p>
          <h3>{title}</h3>
        </div>
        <p>Read More...</p>
      </div>
    </div>
  );
};

export default Article;
