import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import mockStates from "../../data/mockStates";
import mockCities from "../../data/mockCities";
import mockCategories from "../../data/mockCategories";
import mockProducts from "../../data/mockProducts";
import mockAddress from "../../data/mockAddress";
import Loading from "../../Components/ui/Loading";
import Radio from "@mui/material/Radio";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    OutlinedInput,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@mui/material";

const FormProduct = () => {
    const INITIAL_PRODUCT_STATE = {
        product_id: mockProducts.length + 1,
        url_image: "",
        name: "",
        description: "",
        price: 0,
        availability: 0,
        category_id: "",
        notAvailableStart: "",
        notAvailableEnd: "",
        address_id: mockAddress.length + 1,
        stars: 0,
    }

    const INITIAL_ADRESS_STATE = {
        address_id: mockAddress.length + 1,
        street: "",
        number: "",
        city_id: "",
    }
    const [product, setProduct] = useState(INITIAL_PRODUCT_STATE);
    const [address, setAddress] = useState(INITIAL_ADRESS_STATE);
    const [stateSelected, setStateSelected] = useState("Select");
    const [stateIdSelected, setStateIdSelected] = useState(1);
    const [openCat, setOpenCat] = useState(false);
    const [open, setOpen] = useState(false);
    const [categorySelected, setCategorySelected] = useState(1);

    const [starsSelected, setStarsSelected] = useState("⭐⭐⭐⭐⭐");
    const [citySelected, setCitySelected] = useState(1);
    const [cityIdSelected, setCityIdSelected] = useState(1);


    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const changeRadioState = (e) => {
        // console.log("e " + e.target.value);

        setStateSelected(e.target.value);


        let stateSelectedX = mockStates
            .find((state) => state.name == e.target.value)
        setStateIdSelected(stateSelectedX.id_state)
        //.map((state) => setStateIdSelected(state.id_state));

    };

    const changeRadioCity = (e) => {
        setCitySelected(e.target.value);
        let citySelectedX = mockCities
            .find((city) => city.name == e.target.value)
        setCityIdSelected(citySelectedX.id_city);
        //setAddress(...address, city_id=cityIdSelected)  
        setAddress({ ...address, city_id: citySelectedX.id_city })
    };

    const changeStarsState = (e) => {
        setStarsSelected(e.target.value);
        setProduct({ ...product, stars: e.target.value.length })

    };

    const handleChangeStars = (e) => {
        setStarsSelected(e.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCloseCat = () => {
        setOpenCat(false);
    };

    const handleOpenCat = () => {
        setOpenCat(true);
    };

    //const [categoryIdSelected, setCategoryIdSelected] = useState(1);
    const changeCategoryState = (e) => {
        setCategorySelected(e.target.value);
        setProduct({ ...product, category_id: e.target.value })
    };



    // const fetchCategory = async (category_id) => {
    //     try {
    //         const categoryJSON = await fetch(`http://localhost:8080/api/v1/categories/${category_id}`);
    //         const { response } = await categoryJSON.json();
    //         console.log(`Categoria con ID: ${category_id}: EXISTE`);
    //         console.log(response);
    //         setCategoria(response);
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // };

    // const fetchCity = async (city_id) => {
    //     try {
    //         const cityJSON = await fetch(`http://localhost:8080/api/v1/cities/${city_id}`);
    //         const { response } = await cityJSON.json();
    //         console.log(`Ciudad con ID: ${city_id}: EXISTE`);
    //         console.log(response);
    //         setCiudad(response);
    //     } catch (e) {
    //         console.log(`Ciudad con ID: ${city_id}: NO EXISTE`);
    //         console.log(e.message);
    //     }
    // };


    // const addProduct = async (product) => {
    //     try {
    //         setLoading(true);
    //         const jwt = JSON.parse(localStorage.getItem('token'));
    //         const response = await fetch(
    //             "http://localhost:8080/api/v1/productos/create",
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Authorization": `Bearer ${jwt}`,
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify(product),
    //             }
    //         );

    //         if (!response.ok) {
    //             setLoading(false);
    //             alert('No se ha podido agregar el producto');
    //         } else {
    //             setLoading(false);
    //             alert('Se agregó de manera exitosa!');
    //             navigate('/');
    //         }
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setAddress({ ...address, city_id: cityIdSelected });
        setProduct(prev => ({
            ...prev,
            address_id: address.address_id,
            category_id: categorySelected,
            stars: starsSelected.length
        }));

        setLoading(true);

        try {

            // Buscamos city data
            const cityResponse = await fetch(`http://localhost:8080/api/v1/cities/${cityIdSelected}`);
            const cityData = await cityResponse.json();

            // Buscamos category data
            const categoryResponse = await fetch(`http://localhost:8080/api/v1/categories/${categorySelected}`);
            const categoryData = await categoryResponse.json();

            let new_product = {
                name: product.name,
                description: product.description,
                address: `${address.street} ${address.number}`,
                price: product.price,
                category: categoryData.response,
                images: null,
                rate: starsSelected.length,
                city: cityData.response
            };

            // Post produuct
            const jwt = JSON.parse(localStorage.getItem('accessToken'));
            const postResponse = await fetch(
                "http://localhost:8080/api/v1/productos/create",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${jwt}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(new_product),
                }
            );

            console.log(new_product);

            if (postResponse.ok) {
                alert('Nuevo producto creado con exito!');
            } else {
                console.error('Error al crear  nuevo producto:', postResponse.status);
            }
        } catch (error) {
            console.log(error.message);
            
        }
        finally{
            navigate('/');
            setLoading(false);
        }
    };


    if (loading) {
        return <Loading />
    }
    else {
        return (
            <FormControl
                component="form"
                sx={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    m: 10,
                    padding: 10,
                    border: "1px solid gray",
                    borderRadius: "10px",
                    boxShadow: "0px 2px 2px 2px #888888",
                    backgroundColor: "#545776",
                }}
                noValidate
                autoComplete="off"
            >
                <Typography
                    component="h1"
                    variant="h"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "white",
                        borderRadius: '5px',
                    }}
                >
                    Nuevo producto
                </Typography>
                <TextField
                    sx={{ m: 2, backgroundColor: "white" }}
                    required
                    id="outlined-basic"
                    label="name"
                    variant="outlined"
                    inputProps={{ style: { color: "gray", fontSize: 25 } }}
                    InputLabelProps={{
                        style: { color: "green", fontSize: 25, padding: 10 },
                    }}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
                <TextField
                    sx={{ m: 2, backgroundColor: "white", borderRadius: '5px'}}
                    required
                    id="filled-multiline-static"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    inputProps={{ style: { color: "gray", fontSize: 25 } }}
                    InputLabelProps={{
                        style: { color: "green", fontSize: 25, padding: 10 },
                    }}
                    onChange={(e) =>
                        setProduct({ ...product, description: e.target.value })
                    }
                />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "99%",
                    }}
                >
                    <TextField
                        sx={{ m: 2, width: "33%", backgroundColor: "white", borderRadius: '5px'}}
                        required
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        inputProps={{ style: { color: "gray", fontSize: 25 } }}
                        InputLabelProps={{
                            style: { color: "green", fontSize: 25, padding: 10 },
                        }}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    />

                    <FormControl sx={{ m: 2, width: "33%", backgroundColor: "white", borderRadius: '5px'}}>
                        <InputLabel
                            sx={{ color: "green", fontSize: 25 }}
                            id="demo-outlined-select-label"
                        >
                            Stars
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={starsSelected}
                            label="Stars"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            onChange={handleChangeStars}
                            input={<OutlinedInput label="Stars" />}
                        >
                            <MenuItem
                                sx={{ backgroundColor: "black" }}
                                value="⭐⭐⭐⭐⭐"
                                checked={starsSelected == "⭐⭐⭐⭐⭐" ? true : false}
                                onChange={changeStarsState}
                            >
                                ⭐⭐⭐⭐⭐
                            </MenuItem>
                            <MenuItem
                                sx={{ backgroundColor: "#A8A8A8" }}
                                value="⭐⭐⭐⭐"
                                checked={starsSelected == "⭐⭐⭐⭐" ? true : false}
                                onChange={changeStarsState}
                            >
                                ⭐⭐⭐⭐
                            </MenuItem>
                            <MenuItem
                                sx={{ backgroundColor: "#A8A8A8" }}
                                value="⭐⭐⭐"
                                checked={starsSelected == "⭐⭐⭐" ? true : false}
                                onChange={changeStarsState}
                            >
                                ⭐⭐⭐
                            </MenuItem>
                            <MenuItem
                                sx={{ backgroundColor: "#A8A8A8" }}
                                value="⭐⭐"
                                checked={starsSelected == "⭐⭐" ? true : false}
                                onChange={changeStarsState}
                            >
                                ⭐⭐
                            </MenuItem>
                            <MenuItem
                                sx={{ backgroundColor: "#A8A8A8" }}
                                value="⭐"
                                checked={starsSelected == "⭐" ? true : false}
                                onChange={changeStarsState}
                            >
                                ⭐
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{ m: 2, width: "33%", backgroundColor: "white", borderRadius: '5px'}}>
                        <InputLabel
                            sx={{ color: "green", fontSize: 25}}
                            id="demo-simple-select-label"
                        >
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categorySelected}
                            label="Category"
                            open={openCat}
                            onClose={handleCloseCat}
                            onOpen={handleOpenCat}
                            onChange={changeCategoryState}
                            input={<OutlinedInput label="Category" />}
                        >
                            {mockCategories.map((cat, index) => {

                                return (
                                    <MenuItem
                                        key={index}
                                        value={cat.id_category}
                                        checked={categorySelected == cat.id_category ? true : false}
                                        onChange={changeCategoryState}
                                    >
                                        {cat.title}
                                    </MenuItem>
                                );

                                //<MenuItem>cat.title</MenuItem>
                                //<MenuItem>cat.title</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        m: 2,
                        borderRadius: '5px',
                        padding: 5,
                        border: "1px solid #BEBEBE",
                        backgroundColor: "white",
                    }}
                >
                    <Typography
                        component="h2"
                        variant="h"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: '5px',
                            alignItems: "center",
                            color: "green",
                            padding: 1,
                        }}
                    >
                        Address Information
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <TextField
                            sx={{ m: 2, width: "50%", borderRadius: '5px'}}
                            required
                            id="filled-multiline-static"
                            label="Street"
                            variant="outlined"
                            inputProps={{ style: { color: "gray", fontSize: 25 } }}
                            InputLabelProps={{
                                style: { color: "green", fontSize: 25, padding: 10 },
                            }}
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        />
                        <TextField
                            sx={{ m: 2, width: "50%", borderRadius: '5px', }}
                            required
                            id="filled-multiline-static"
                            label="Number"
                            variant="outlined"
                            inputProps={{ style: { color: "gray", fontSize: 25 } }}
                            InputLabelProps={{
                                style: { color: "green", fontSize: 25, padding: 10 },
                            }}
                            onChange={(e) => setAddress({ ...address, number: e.target.value })}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                m: 2,
                                padding: 10,
                                width: "50%",
                                border: "1px solid #BEBEBE",
                            }}
                        >
                            <FormLabel
                                id="demo-radio-buttons-group-label"
                                sx={{ color: "green", fontSize: 25, padding: 0, borderRadius: '5px' }}
                            >
                                Select a state
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="disabled"
                                name="radio-buttons-group"
                                //value={stateSelected}
                                onChange={changeRadioState}
                            >
                                <FormControlLabel
                                    value="disabled"
                                    disabled
                                    control={<Radio />}
                                    label="Select"
                                />
                                {mockStates.map((state, index) => {
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            sx={{ color: "green", fontSize: 30, padding: 0 }}
                                            value={state.name}
                                            control={<Radio />}
                                            label={state.name}
                                        />
                                    );
                                })}
                            </RadioGroup>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                m: 2,
                                padding: 10,
                                width: "50%",
                                border: "1px solid #BEBEBE",
                            }}
                        >
                            <FormLabel
                                sx={{ color: "green", fontSize: 25, padding: 0, borderRadius: '5px' }}
                                id="demo-radio-buttons-group-label"
                            >
                                Select a city
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="disabled"
                                name="radio-buttons-group"
                                value={citySelected}
                                onChange={changeRadioCity}
                            >
                                <FormControlLabel
                                    value="disabled"
                                    disabled
                                    control={<Radio />}
                                    label="Select"
                                />
                                {mockCities
                                    .filter((city) => city.state_id == stateIdSelected)
                                    .map((city, index) => {
                                        return (
                                            <FormControlLabel
                                                key={index}
                                                sx={{ color: "green", fontSize: 30, padding: 0 }}
                                                value={city.name}
                                                //checked={citySelected == city.name ? true : false}
                                                control={<Radio />}
                                                label={city.name}
                                                onChange={changeRadioCity}
                                            />
                                        );
                                    })}
                            </RadioGroup>
                        </Box>
                    </Box>
                </Box>

                <Button
                    sx={{
                        display: "block",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        m: 2,
                        width: "25%",
                        padding: 1,
                        color: "white",
                        backgroundColor: "#1DBEB4",
                        fontSize: "2vh",
                        fontWeight: "bold",
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Registrar
                </Button>
            </FormControl>
        );
    };
}


export default FormProduct;
