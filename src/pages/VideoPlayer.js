import React from "react";
import bookOpening from "./bookopening.mp4";  // Adjust path if needed

const VideoPlayer = () => {
    return (
        <video src={bookOpening} autoPlay 
        muted 
        loop 
        playsInline 
        className="my-video" />
    );
};

export default VideoPlayer;
