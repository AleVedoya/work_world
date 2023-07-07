import  { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
import Card from '../../Components/ui/Card';
import mockProducts from "../../data/mockProducts";
import mockCategories from "../../data/mockCategories.js";
import '../../styles/RecomendationList.css';

export default function RecomendationList() {
    const [open, setOpen] = useState(false);
    const [catSelected, setCatSelected] = useState(5);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setCatSelected(e.target.value);
    };

    const fetchProducts = async () =>{
        try {
            isLoading(true);
            const productsJSON = await fetch('http://localhost:8080/api/v1/productos/all');
            const products = await productsJSON.json();
            setProducts(products.response);
            isLoading(false)
        } catch (e) {
            console.log(e);
        }
    }

    
    fetchProducts();

    useEffect(() => {
        if (catSelected === 5) {
            const productos = mockProducts.slice(0,6);
            setFilteredProducts(productos);
        } else {
            const filtered = mockProducts.filter(prod => prod.category_id === catSelected);
            setFilteredProducts(filtered);
        }
    }, [catSelected]);

    return (
        <div className="recomendation-container">
                <h2 className="recomendation-title">Recomendaciones - Productos filtrados</h2>
                <FormControl className='form-filter'>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={catSelected}
                        defaultValue={4}
                        label="Category"
                        open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        onChange={handleChange}
                        input={<OutlinedInput label="Category" />}
                    >
                        {mockCategories.map((cat, index) => (
                            <MenuItem
                                key={index}
                                value={cat.id_category}
                                checked={catSelected === cat.id_category}
                            >
                                {cat.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className='recomendation-list-conatianer'>
                    {isLoading ? 
                                <div className="spinner-container">
                                    <div className="spinner"></div>
                                </div>
                                :
                                    filteredProducts.map(product => (<Card key={product.product_id} producto={product} />
                    ))}
                </div>
        </div>
    )
}
