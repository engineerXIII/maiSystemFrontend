import Box from "@mui/material/Box";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Api from "../../Api";

export default function OrderPage({orderList, setOrderList}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Номера заказов</TableCell>
                        <TableCell align="right">Сумма</TableCell>
                        <TableCell align="right">Статус</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderList.length ? orderList.map((order) => (
                            <TableRow
                                key={order.order_id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {order.order_id.slice(-10)}
                                </TableCell>
                                <TableCell align="right">{order.sum}</TableCell>
                                <TableCell align="right">{order.status_message}</TableCell>
                            </TableRow>
                        ))
                        : ""
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}