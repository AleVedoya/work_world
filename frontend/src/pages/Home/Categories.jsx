import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import CardCategory from '../../Components/ui/CardCategory';
import CategorySlider from "../../Components/ui/CategorySlider";
import '../../styles/Categories.css';



export default function Categories() {
  //Agregar categorias utilizanod hooks y funciones

  const [categorias, setCategorias] = useState([])

  const fetchCategories = async () => {
    try {
      const dataJSON = await fetch('http://localhost:8080/api/v1/categories/all');
      const data = await dataJSON.json();
      console.log(data.response)
      setCategorias(data.response);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])
  const categories = [
    {
      id: 1,
      name: "Open Spaces",
      amount: 3,
      imgUrl: '/images/openOffice.jpg'
    },
    {
      id: 2,
      name: "Private Property",
      amount: 3,
      imgUrl: '/images/privateOffices.jpg'
    },
    {
      id: 3,
      name: "Shared Offices",
      amount: 3,
      imgUrl: '/images/sharedOffice.jpg'
    },
    {
      id: 4,
      name: "Pet Friendly",
      amount: 3,
      imgUrl: '/images/petFriendly.jpg'
    },
  ];

  // Agregar useMemo por cada Card
  return (
    <div className='categoriesList-container'>
      <h2 className='categoriesList-title'>Buscar por categoria</h2>
      <section className='categoriesList-list'>
        {
          categories.map(category => (
            <Link className='category-link' key={category.id} to={`/category/${category.id}`}>
              <CardCategory category={category} />
            </Link>
          ))
          }
      </section>
    </div>
  );
}
