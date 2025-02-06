import React, { useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const WebcamCapture = ({ onScan }) => {
    const webcamRef = useRef(null);

    // Use useCallback to ensure capture function has stable reference
    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                onScan(imageSrc);
            }
        }
    }, [onScan]); // Add onScan as a dependency

    useEffect(() => {
        const timer = setInterval(() => {
            capture();
        }, 500);
        return () => clearInterval(timer);
    }, [capture]); // Include capture in dependency array

    const videoConstraints = {
        width: 500,
        height: 500,
        facingMode: "environment"
    };

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onClick={capture} // No need for arrow function
            />
        </div>
    );
}

export default WebcamCapture;
