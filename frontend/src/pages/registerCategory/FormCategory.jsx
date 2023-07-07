import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mockStates from "../../data/mockStates";
import mockCities from "../../data/mockCities";
import mockCategories from "../../data/mockCategories";
import mockProducts from "../../data/mockProducts";
import mockAddress from "../../data/mockAddress";
import "./FormCategory.css";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { Label } from "@material-ui/icons";

const FormCategory = () => {
    const INITIAL_CATEGORY_STATE = {
        category_id: mockCategories.length + 1,
        url_image: "",
        name: "",
        description: "",
    };

    const [category, setCategory] = useState(INITIAL_CATEGORY_STATE);
    const naviagate = useNavigate();

    const addCategory = async (category) => {
        try {
            const jwt = JSON.parse(localStorage.getItem("accessToken"));

            console.log(jwt);

            const response = await fetch(
                "http://localhost:8080/api/v1/categories/create",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(category),
                }
            );

            console.log(JSON.stringify(category));

            if (!response.ok) {
                alert("No se ha podido agregar la categoria");
            } else {
                alert("Se agrego de manera exitosa!");
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let new_category = {
            name: category.name,
            description: category.description,
            url_image: null,
        };
        addCategory(new_category);
        naviagate("/");
    };

    return (
        <FormControl
            component="form"
            sx={{
                width: "90%",
                height: '80vh',
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
                    borderRadius: '5px'
                }}
            >
                Nueva Categoria
            </Typography>
            <TextField
                sx={{ m: 2, backgroundColor: "white", borderRadius: '5px',}}
                required
                id="outlined-basic"
                label="name"
                variant="outlined"
                inputProps={{ style: { color: "gray", fontSize: 25 } }}
                InputLabelProps={{
                    style: { color: "green", fontSize: 25, padding: 10 },
                }}
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
            />
            <TextField
                sx={{ m: 2, backgroundColor: "white", borderRadius: '5px',}}
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
                    setCategory({ ...category, description: e.target.value })
                }
            />
            <Box sx={{ background: "white", m: 2, height: '40%', borderRadius: '5px'}} textAlign="left">
                <label className="titleImgs">Add images</label>
                <div className="divImg">
                    <input type="file"></input>
                    <input type="file"></input>
                    <input type="file"></input>
                    <input type="file"></input>
                    <input type="file"></input>
                </div>
            </Box>
            <Button
                sx={{
                    display: "block",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    m: 2,
                    width: "20%",
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

export default FormCategory;
