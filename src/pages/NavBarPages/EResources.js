import React from "react";
import "./EResources.css";

const eResourcesData = {
  "E-Books": [
    { title: "Project Gutenberg", image: "./pg.jpeg", link: "https://www.gutenberg.org/" },
    { title: "Open Library", image: "./openlib.png", link: "https://openlibrary.org/" },
    { title: "Google Books", image: "./gb.png", link: "https://books.google.com/" },
    { title: "Kindle", image: "./kindle.png", link: "https://www.amazon.com/Kindle-eBooks" },
    { title: "Kobo", image: "./kobo.png", link: "https://www.kobo.com/" }
  ],
  "Audiobooks": [
    { title: "Audible", image: "./audible.png", link: "https://www.audible.com/" },
    { title: "LibriVox", image: "./librivox.png", link: "https://librivox.org/" },
    { title: "Amazon Audiobooks", image: "./amazonaudio.jpeg", link: "https://www.amazon.com/audible" }
  ],
  "Magazines & Comics": [
    { title: "Zinio", image: "./zinio.png", link: "https://www.zinio.com/" },
    { title: "ComiXology", image: "./comic.jpeg", link: "https://www.comixology.com/" },
  ]
};

const EResources = () => {
  return (
    <div className="eresources-containerb35">
      <h1 className="titleb35">E-Resources</h1>
      <p className="descriptionb35">
        These links will help you download/buy/rent/subscribe books online in various mediums, including e-books, audiobooks, and magazines/comics. You need to make an account or start a subscription get access to thebook of your choice as it depeends on the website.
      </p>

      {Object.keys(eResourcesData).map((category, index) => (
        <div key={index} className="category-sectionb35">
          <h2 className="category-titleb35">{category}</h2>
          <div className="resource-listb35">
            {eResourcesData[category].map((resource, idx) => (
              <div key={idx} className="resource-cardb35">
                <img src={resource.image} alt={resource.title} className="resource-imageb35" />
                <h3 className="resource-titleb35">{resource.title}</h3>
                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-linkb35">
                  Visit Site
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}

      <a href="/HomePage" className="home-buttonb35">Return to Home Page</a>
    </div>
  );
};

export default EResources;
