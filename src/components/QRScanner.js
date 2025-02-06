import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WebcamCapture from "./WebcamCapture";
import jsQR from "jsqr";

const QRScanner = () => {
    const { eventId, eventName, eventDay } = useParams();
    const navigate = useNavigate();
    const [scannedName, setScannedName] = useState(""); // Holds scanned name
    const [isScanned, setIsScanned] = useState(false); // Controls scanning behavior

    const handleScan = (imageSrc) => {
        if (!isScanned && imageSrc) { // Prevent scanning before check-in
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });

                if (code) {
                    setScannedName(code.data.trim()); // Store the scanned name
                    setIsScanned(true); // Disable further scanning until check-in
                    console.log("Scanned QR Code:", code.data.trim());
                }
            };
        }
    };

    const handleCheckIn = () => {
        if (scannedName) {
            console.log(`Checked in: ${scannedName} for event: ${eventId}`);
            setScannedName("");
            setIsScanned(false);
        }
    };

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="h-screen flex flex-col items-center bg-[#EDDEC9] p-7">

            <div className="w-full flex justify-between items-center mb-4">
                <button className="w-auto bg-[#555F49] font-['Faustina'] text-white text-md py-2 px-4 rounded-3xl hover:bg-[#D8AA6C]" onClick={handleBack}>
                    ← Back
                </button>
                <h2 className="text-xl font-bold text-center">{eventDay} {eventName}</h2>
            </div>

            {/* Camera at the Top */}
            <div className="flex-grow flex items-center justify-center w-full max-w-xs">
                <WebcamCapture onScan={handleScan} />
            </div>

            <div className="w-full h-auto p-4 bg-white text-black rounded-lg text-left mt-auto">
                <div className="text-sm font-bold">
                    Scanned Name: {scannedName || ""}
                </div>
            </div>

            <div className="w-full h-auto pl-6 bg-white text-black rounded-lg text-left mt-auto">
                <p> Pronouns: {scannedName} </p>
                <p> Shirt Size: {scannedName} </p>
                <p> Dietary Restrictions: {scannedName} </p>
            </div>

            {isScanned && (
                    <button
                        onClick={handleCheckIn}
                        className="w-60 bg-[#555F49] font-['Faustina'] text-white text-lg py-2 px-4 rounded-3xl hover:bg-[#D8AA6C]"
                    >
                        Check In
                    </button>
                )}

        </div>
    );
};

export default QRScanner;
