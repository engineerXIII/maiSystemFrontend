import {Grid, Typography} from "@mui/material";
import ProductCard from "../productCard";
import * as React from "react";
import PropTypes from "prop-types";


export default function ProductList({items, addProductToCart}) {
    const gridItems = [];
    if (items.length !== 0) {
        items.forEach((product) => {
            gridItems.push(<Grid item md={3}>
                <ProductCard product={product} addToCart={addProductToCart}/>
            </Grid>)
        })
    } else {
        gridItems.push(<Typography variant="body1">Ничего не найдено</Typography>)
    }
    return (
        <Grid container spacing={2} children={gridItems}/>
    );
}

ProductList.propTypes = {
    children: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.object),
    addProductToCart: PropTypes.func.isRequired,
};