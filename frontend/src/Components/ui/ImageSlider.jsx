import { ChevronLeft, ChevronRight } from "react-feather";
import { useState } from "react";
import '../../styles/ImageSlider.css'

export default function ImageSlider() {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const images = [
        "/images/oficina1.jpg",
        "/images/oficina2.jpg",
        "/images/oficina3.jpg",
        "/images/oficina4.jpg",
        "/images/oficina5.jpg"
    ];

    const next = () => {
        setCurrentImgIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const previous = () => {
        setCurrentImgIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            return newIndex < 0 ? images.length - 1 : newIndex;
        });
    };

    return (
            <div className="img-slider-container">
                <img
                    className="img-slider-component"
                    src={images[currentImgIndex]}
                    alt=""
                />
                <p className="img-slider-count">{currentImgIndex + 1}/{images.length}</p>
                <div className="btns-container">
                    <button className="btn" onClick={previous}>
                        <ChevronLeft size={40} />
                    </button>
                    <button className="btn" onClick={next}>
                        <ChevronRight size={40} />
                    </button>
                </div>
            </div>
    );
}
