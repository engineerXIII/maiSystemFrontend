import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    IconButton, Snackbar,
    Typography
} from "@mui/material";

import MuiAlert from '@mui/material/Alert';
import * as React from "react";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductCard({ product, addToOrder, removeFromOrder}) {
    const [expanded, setExpanded] = React.useState(false);
    const [notify, setNotify] = React.useState(false);

    const handleAddButton = (e) => {
        addToOrder(e);
        setNotify(true);
    };

    const handleNotifyClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotify(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    var costString = `${Math.floor(product.cost)} руб.`
    const costSecondary = Math.floor((product.cost - Math.floor(product.cost)) * 100)
    if (costSecondary > 1) {
        costString = `${costString} ${costSecondary} к.`
    }

    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://huggingface.co/tasks/assets/image-classification/image-classification-input.jpeg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.product_name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {product.factory}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <b>Цвет:</b> {product.color}<br/>
                </Typography>
                <Collapse in={expanded} >
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                </Collapse>
                <Snackbar open={notify} autoHideDuration={1000} onClose={handleNotifyClose}>
                    <Alert onClose={handleNotifyClose} icon={<AddShoppingCartIcon/>} severity="success" sx={{ width: '100%' }}>
                        Добавлено в корзину
                    </Alert>
                </Snackbar>
            </CardContent>
            <CardActions disableSpacing>
                <Button size="small" startIcon={<AddOutlinedIcon />} onClick={handleAddButton.bind(this, product)}>Добавить</Button>
                <Typography variant="button" display="flex">
                    {costString}
                </Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
        </Card>
    );
}

ProductCard.propTypes = {
    children: PropTypes.node,
    product: PropTypes.shape({
        product_id: PropTypes.string.isRequired,
        product_name: PropTypes.string.isRequired,
        color: PropTypes.string,
        description: PropTypes.string,
        factory: PropTypes.string,
        cost: PropTypes.number
    }),
};
