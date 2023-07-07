import { ChevronLeft, ChevronRight } from "react-feather";
import { useState, useEffect } from "react";
import CardCategory from "./CardCategory.jsx";


export default function CardSlider() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);

  const fetchCategories = async () => {
    try {
      const dataJSON = await fetch("http://localhost:8080/api/v1/categories/all");
      const {response} = await dataJSON.json();
      console.log(response);
      setCategories(response);
      setPreviousIndex(response.length -1 );
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const next = () => {
    setPreviousIndex(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const previous = () => {
    setCurrentIndex(previousIndex);
    setPreviousIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex <= 0 ? categories.length - 1 : newIndex;
    });
  };

  if (isLoading || categories.length === 0) {
    return <div>Loading..</div>;
  } else {
    return (
      <div className="img-slider-container">
        {categories && categories.length > 0 && (
          <div className=".contenedor-card">
            <CardCategory category={categories[currentIndex]} />
          </div>
        )}
        {categories && categories.length > 0 && (
      <div className=".contenedor-card">
      <CardCategory category={categories[previousIndex]} />
    </div>
        )}
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
}
