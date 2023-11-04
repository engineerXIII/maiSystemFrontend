import './App.css';
import * as React from 'react';
import PropTypes from 'prop-types';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {Tab, Tabs, Typography} from "@mui/material";

import ProductPage from "./container/productPage";
import CartPage from "./container/cartPage";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function App() {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [cartList, setCartList] = React.useState([]);

    const handleChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };


    const removeProductFromCart = (product) => {
        const findIndex = cartList.findIndex(cartItem => {
            return cartItem.ItemId === product.product_id
        })
        console.log(cartList)
        if (findIndex !== -1) {
            if (cartList[findIndex].qty > 1) {
                cartList[findIndex].qty -= 1
                cartList[findIndex].sum -= cartList[findIndex].cost
                setCartList(cartList)
            } else {
                setCartList(cartList.filter((item) => {
                    return item.item_id !== product.product_id
                }))
            }
        }
    }
    const addProductToCart = (product) => {
        const findIndex = cartList.length > 0 ? cartList.findIndex(cartItem => {
            return cartItem.item_id === product.product_id
        }) : -1
        if (findIndex === -1) {
            setCartList([...cartList, {
                item_id: product.product_id,
                product: product,
                cost: product.cost,
                qty: 1,
                sum: product.cost
            }])
        } else {
            cartList[findIndex].qty += 1;
            cartList[findIndex].sum += cartList[findIndex].cost;
            setCartList(cartList)
        }
    }

    const cartTitle = "Корзина" + (cartList.length > 0 ? ` (${cartList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.qty
    }, 0)})` : '')

    return (<ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Container maxWidth="xl">
                <Box sx={{
                    flexGrow: 1,
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    paddingTop: '5em',
                    display: 'flex',
                    height: 224
                }}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Продукты" {...a11yProps(0)} />
                            <Tab label={cartTitle} {...a11yProps(1)} />
                            <Tab label="Заказы" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabIndex} index={0}>
                        <ProductPage addProductToCart={addProductToCart}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={1}>
                        <CartPage items={cartList} itemsSet={setCartList}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={2}>
                        Item Three
                    </CustomTabPanel>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;
