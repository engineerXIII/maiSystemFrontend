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
import OrderPage from "./container/orderPage";
import Api from "./Api";
import {useEffect} from "react";
import {random} from "@mui/x-data-grid-generator";

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
const useInterval = callback => {
    const savedCallback = React.useRef();

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        let id = setInterval(tick, 15 * 1000);
        return () => clearInterval(id);
    }, []);
};

function App() {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [cartList, setCartList] = React.useState([]);
    const [orderList, setOrderList] = React.useState([]);

    const handleChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };
    useInterval(() => {
        console.log("Interval called")
        if (orderList.length > 0) {
            var newOrder = []
            var index = Math.floor(random(0, orderList.length))
            console.log("Interval index", index)
            orderList.forEach((order, i, arr )=> {
                if (i !== index ) {
                    newOrder.push(order)
                }
            })
            var order = orderList[index]
            Api({
                method: 'get',
                url: `/api/v1/order/${order.order_id}`
            }).then(function (response) {
                if (response.data.status !== order.status && order.status < 5) {
                    newOrder.push(response.data)
                    console.log(newOrder)
                    setOrderList(newOrder)
                }
                console.log("Order status not change ",  response.data.status, response.data.order_id)
            })
            .catch(function (error) {
                console.log("error")
                setOrderList(newOrder)
            })
        }
    });

    const makeOrder = (order) => {
        order  = {
            'sum': 0,
            'order_list': [],
        }
        cartList.forEach((item) => {
            order.order_list.push({
                'item_id': item.item_id,
                'qty': item.qty,
                'cost': item.cost
            })
        })
        Api({
            method: 'post',
            url: '/api/v1/order/create',
            data: order,
        }).then(function (response) {
            setCartList([])
            setOrderList(orderList.concat([response.data]))
        })
        .catch(function (error) {
            console.log(error);
        })
    }

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
                        <CartPage items={cartList} itemsSet={setCartList} makeOrder={makeOrder}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={2}>
                        <OrderPage orderList={orderList} setOrderList={setOrderList}/>
                    </CustomTabPanel>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;
