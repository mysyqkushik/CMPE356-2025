import React from 'react';
import './Team.css';
import { Link } from "react-router-dom";

const Team = () => {
  return (
    <div className="team-container55">
      <h1 className="team-title55">
        <a href="./HomePage">🦉Our Team🦉</a>
      </h1>
      <div className="team-members55">
        <div className="team-member55">
          <img src="kuan.jpg" alt="Head of Back-End" className="team-image55" />
          <h2 className="team-role54">KUANDYK KYRYKBAYEV</h2>
          <h3 className="team-role55">Head of Back-End Development</h3>
          <p className="team-contact55">
            <a href="mailto:kuandyque@stu.khas.edu.tr">Email: kuandyque@stu.khas.edu.tr</a>
          </p>
          <p className="team-contact55">
            <a href="https://www.linkedin.com/in/kuandyque" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
          </p>
        </div>
        <div className="team-member55">
          <img src="sarah.jpg" alt="Head of Front-End" className="team-image55" />
          <h2 className="team-role54">SARAH NAUMAN</h2>
          <h3 className="team-role55">Head of Front-End Development</h3>
          <p className="team-contact55">
            <a href="mailto:sarah.nauman@stu.khas.edu.tr.com">Email: sarah.nauman@stu.khas.edu.tr.com</a>
          </p>
          <p className="team-contact55">
            <a href="https://linkedin.com/in/sarah-nauman-741788266" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
          </p>
        </div>
        <div className="team-member55">
          <img src="yigit.jpg" alt="Head of Documentarians/Testing" className="team-image55" />
          <h2 className="team-role54">YİĞİT KESER</h2>
          <h3 className="team-role55">Head of Documentarians/Testing</h3>
          <p className="team-contact55">
            <a href="mailto:yigit.keser@stu.khas.edu.tr">Email: yigit.keser@stu.khas.edu.tr</a>
          </p>
          <p className="team-contact55">
            <a href="https://www.linkedin.com/in/yiğit-keser-733058355/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;