import SearchIcon from "@mui/icons-material/Search";
import ProductList from "../../component/productList";
import * as React from "react";
import {alpha, styled} from "@mui/material/styles";
import {InputBase, Pagination} from "@mui/material";
import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";
import axios from "axios";



const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

var productList = [
    {
        "product_id": crypto.randomUUID(),
        "product_name": "Test name",
        "color": "Red",
        "factory": "Loh",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultricies erat sit amet nibh consequat posuere eu quis nulla. Nunc placerat est ut ipsum dapibus, elementum suscipit purus tincidunt. Vivamus nisi nulla, posuere eget enim sed, varius aliquet lacus. In dictum felis nisi, in vehicula mauris feugiat eget. Proin consequat purus eu nibh ullamcorper sollicitudin a fringilla libero. Sed vitae turpis sollicitudin, porttitor elit sit amet, finibus quam.",
        "cost": 123.4
    },
    {
        "product_id": crypto.randomUUID(),
        "product_name": "Test name",
        "color": "Blue",
        "factory": "China",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultricies erat sit amet nibh consequat posuere eu quis nulla. Nunc placerat est ut ipsum dapibus, elementum suscipit purus tincidunt. Vivamus nisi nulla, posuere eget enim sed, varius aliquet lacus. In dictum felis nisi, in vehicula mauris feugiat eget. Proin consequat purus eu nibh ullamcorper sollicitudin a fringilla libero. Sed vitae turpis sollicitudin, porttitor elit sit amet, finibus quam.",
        "cost": 12345.5
    },
    {
        "product_id": crypto.randomUUID(),
        "product_name": "Test name",
        "color": "Black",
        "factory": "Test",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultricies erat sit amet nibh consequat posuere eu quis nulla. Nunc placerat est ut ipsum dapibus, elementum suscipit purus tincidunt. Vivamus nisi nulla, posuere eget enim sed, varius aliquet lacus. In dictum felis nisi, in vehicula mauris feugiat eget. Proin consequat purus eu nibh ullamcorper sollicitudin a fringilla libero. Sed vitae turpis sollicitudin, porttitor elit sit amet, finibus quam.",
        "cost": 12.0
    },
    {
        "product_id": crypto.randomUUID(),
        "product_name": "Test name",
        "color": "Blue",
        "factory": "China",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultricies erat sit amet nibh consequat posuere eu quis nulla. Nunc placerat est ut ipsum dapibus, elementum suscipit purus tincidunt. Vivamus nisi nulla, posuere eget enim sed, varius aliquet lacus. In dictum felis nisi, in vehicula mauris feugiat eget. Proin consequat purus eu nibh ullamcorper sollicitudin a fringilla libero. Sed vitae turpis sollicitudin, porttitor elit sit amet, finibus quam.",
        "cost": 12345.5
    },
    {
        "product_id": crypto.randomUUID(),
        "product_name": "Test name",
        "color": "Black",
        "factory": "Test",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultricies erat sit amet nibh consequat posuere eu quis nulla. Nunc placerat est ut ipsum dapibus, elementum suscipit purus tincidunt. Vivamus nisi nulla, posuere eget enim sed, varius aliquet lacus. In dictum felis nisi, in vehicula mauris feugiat eget. Proin consequat purus eu nibh ullamcorper sollicitudin a fringilla libero. Sed vitae turpis sollicitudin, porttitor elit sit amet, finibus quam.",
        "cost": 12.0
    }
];

const productQuery = {
    TotalCount: 10,
    TotalPages: 1,
    Page: 1,
    Size: 10,
    HasMore: false,
    Products: productList
}

export default function ProductPage({addProductToOrder}){
    const [productPage, setProductPage] = useState({
        TotalCount: 10,
        TotalPages: 1,
        Page: 1,
        Size: 10,
        HasMore: false,
        Products: []
    });

    useEffect(() => {
        setTimeout(() => {
            setProductPage(productQuery);
        }, 1000)
        // const apiUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
        // axios.get(apiUrl).then((resp) => {
        //     const allPersons = resp.data;
        //     setProductPage(allPersons);
        // });
    }, [setProductPage]);


    return(
        <Container>
            <Search sx={{marginBottom: '1em'}}>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    // onChange={(e) => () => (e.target.checked)}
                    placeholder="Поиск…"
                    inputProps={{'aria-label': 'search'}}
                />
            </Search>
            <Stack spacing={2}  sx={{ alignItems: 'center', marginBottom: '1em'  }} >
                 <Pagination count={productPage.TotalPages} defaultPage={1} siblingCount={0}  color="primary" />
            </Stack>
            <ProductList items={productPage.Products} addProductToOrder={addProductToOrder}/>
        </Container>

    );
}