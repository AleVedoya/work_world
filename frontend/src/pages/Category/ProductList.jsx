import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../Components/ui/Loading';
// import LoginContext from "../../contexts/LoginContext";
import Card from '../../Components/ui/Card';
import '../../styles/ProductList.css';

export default function ProductList() {
    const { id } = useParams();

    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchCategory = async () => {
        try {
            const dataJSON = await fetch(`http://localhost:8080/api/v1/categories/${id}`);
            const data = await dataJSON.json();
            setCategory(data.response);
            setProducts(data.response.productDtos);
            setLoading(false);
            
        } catch (error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        fetchCategory()
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <section className='product-listContainer'>
            <div className='productList-header'>
                <h2 className='productList-title'>{category.name} products</h2>
            </div>
            <div className='productList-list'>
                <div className="productList-list-cntr">
                    {products.map(product => (
                        <Link className='card-link' key={product.id} to={`/detalle/${product.id}`}>
                            <Card producto={product} />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
