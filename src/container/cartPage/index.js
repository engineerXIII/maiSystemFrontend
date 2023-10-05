import Box from "@mui/material/Box";
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import {styled} from "@mui/material/styles";
import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Button} from "@mui/material";
import CustomNoRowsOverlay from "./noRowsView";

export function CustomFooterStatusComponent(props) {
    return (
        <Box sx={{ p: 1, display: 'flex' }}>
            <FiberManualRecordIcon
                fontSize="small"
                sx={{
                    mr: 1,
                    color: true ? '#4caf50' : '#d9182e',
                }}
            />
            Всего позиций: {props.itemsCount}
            <Button> Оформить заказ</Button>
            <Button> Очистить корзину</Button>
        </Box>
    );
}

export default function CartPage({items, itemsSet}) {
    const handleDeleteClick =  (id) => () => {
        itemsSet(items.filter((item) => item.item_id !== id));
    };
    const handleCancelClick =  (id) => () => {
        //itemsSet(items.filter((item) => item.item_id !== id));
    };

    const itemsCount = items.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.qty
    }, 0)

    const columns = [
        {
            field: 'product_name',
            headerName: 'Продукт',
            valueGetter: (param) => {
                return `${param.row.product.product_name} [${param.row.product.color}]`
            },
            flex: 10,
        },
        {
            field: 'qty',
            headerName: 'Qty',
            valueGetter: (param) => {
                return param.row.qty
            },
            sortable: false,
            flex: 1,
        },
        {
            field: 'cost',
            headerName: 'Стоимость',
            valueGetter: (param) => {
                return param.row.cost
            },
            sortable: false,
            flex: 2,
        },
        {
            field: 'sum',
            headerName: 'Сумма',
            valueGetter: (param) => {
                return param.row.sum
            },
            flex: 2,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: '',
            flex: 1,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (false) {
                // if (isInEditMode) {
                    return [
                        // <GridActionsCellItem
                        //     icon={<SaveIcon />}
                        //     label="Save"
                        //     sx={{
                        //         color: 'primary.main',
                        //     }}
                        //     onClick={handleSaveClick(id)}
                        // />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    // <GridActionsCellItem
                    //     icon={<EditIcon />}
                    //     label="Edit"
                    //     className="textPrimary"
                    //     onClick={handleEditClick(id)}
                    //     color="inherit"
                    // />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            }
        }
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                    footer: CustomFooterStatusComponent,
                }}
                slotProps={{
                    footer: { itemsCount: itemsCount },
                }}
                rows={items}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 100,
                        },
                    },
                }}
                getRowId={(item) => item.item_id}
                autoPageSize
                checkboxSelection
                disableColumnFilter
                disableColumnMenu
                disableRowSelectionOnClick
                hideFooterPagination
                hideFooterRowCount

            />
        </Box>
    );
}