import './App.css';
import * as React from 'react';
import PropTypes from 'prop-types';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import ProductPage from "./container/productPage";

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
    const [orderList, setOrderList] = React.useState([]);

    const handleChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };


    const removeProductFromOrder = (product) => {
        const findIndex = orderList.findIndex(orderItem => {
            return orderItem.ItemId === product.product_id
        })
        if (findIndex !== -1) {
            if (orderList[findIndex].qty > 1) {
                orderList[findIndex].qty -= 1
                orderList[findIndex].sum -= orderList[findIndex].cost
                setOrderList(orderList)
            } else {
                setOrderList(orderList.filter((item) => {
                    return item.item_id !== product.product_id
                }))
            }
        }
    }
    const addProductToOrder = (product) => {
        const findIndex = orderList.findIndex(orderItem => {
            return orderItem.ItemId === product.product_id
        })
        if (findIndex === -1) {
            orderList.push({
                item_id: product.product_id,
                cost: product.cost,
                qty: 1,
                sum: product.cost
            })
        } else {
            orderList[findIndex].qty += 1;
            orderList[findIndex].sum += orderList[findIndex].cost;
        }
        setOrderList(orderList)
    }

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
                            <Tab label="Корзина" {...a11yProps(1)} />
                            <Tab label="Заказы" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabIndex} index={0}>
                        <ProductPage orderList={orderList} addProductToOrder={addProductToOrder} removeProductFromOrder={removeProductFromOrder}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={1}>
                        Item Two
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
