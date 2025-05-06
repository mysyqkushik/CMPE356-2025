import "./HeaderSplash.css";
import React, { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const HeaderSplash = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const fullText = "Welcome to Your Next Favourite Read";
  
  // Typewriter effect for text
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);

  // Redirect to the home page when button is clicked
  const handleGetStarted = () => {
    navigate('/HomePage');
  };

  return (
    <div className="header-splash">
      <Particles
        id="tsparticles"
        init={async (main) => await loadFull(main)}
        options={{
          fullScreen: {
            enable: true,
            zIndex: 0
          },
          background: {
            color: "#000000"
          },
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: ["#FF6347", "#FF4500", "#D2691E", "#8B4513", "#A52A2A"] // Reds, oranges, and browns
            },
            shape: {
                type: "image",
                image: [
                 
                  {
                    src: "/bookmark (1).png",
                    width: 40,
                    height: 40
                  },
                  {
                    src: "/bookmark (2).png",
                    width: 40,
                    height: 40
                  }
                ]
              },
              
              
            opacity: {
              value: 0.7,
              random: true,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false
              }
            },
            size: {
              value: 50,
              random: true,
              animation: {
                enable: true,
                speed: 3,
                minimumValue: 10,
                sync: false
              }
            },
            move: {
              enable: true,
              speed: 3,
              direction: "random",
              random: true,
              straight: false,
              outModes: {
                default: "out"
              }
            }
          },
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: {
                enable: true,
                mode: "repulse"
              },
              onClick: {
                enable: true,
                mode: "push"
              },
              resize: true
            },
            modes: {
              repulse: {
                distance: 150,
                duration: 1
              },
              push: {
                quantity: 10
              }
            }
          },
          detectRetina: true
        }}
      />
      <div className="header-content">
      <div className="logo-container slide-up">
  <img src="/bookowl_prev_ui.png" alt="The Book Owl Logo" className="logo" />
  <div className="logo-text slide-up">
    <div>THE</div>
    <div>BOOK</div>
    <div>OWL</div>
  </div>
</div>


<h1 className="splash-text slide-up">Welcome to Your Next Favourite Read</h1>


        <button className="cta-button" onClick={handleGetStarted}>
          GET STARTED
        </button>
      </div>
    </div>
  );
};

export default HeaderSplash;
