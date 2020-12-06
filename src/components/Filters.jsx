import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Items from "./Items";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
    },
    title: {

    },
    header: {
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    filtersWrapper: {
        marginLeft: 30,
        padding: 10,
    }
}));

export default function Filters(props) {
    const classes = useStyles();

    const [type, setType] = useState('any');
    const [price, setPrice] = useState('any');
    const [rank, setRank] = useState('asc');
    const [cart, setCart] = useState([]);

    let filterBooks = () => {
        return props.books.filter(filterByType).filter(filterByPrice).sort(sortByRank);
    }

    const filterByType = ( item ) => {
        if ( type === 'any' ) {
            return true;
        }

        if ( type === item.type ) {
            return true;
        }

        return false;
    }

    const filterByPrice = ( item ) => {
        if ( price === 'any' ) {
            return true;
        }

        if ( price == 1 ) {
            return item.price <= 10;
        }

        if ( price == 2 ) {
            return ( item.price > 10 && item.price <= 30 );
        }

        if ( price == 3 ) {
            return item.price > 30;
        }

        return false;
    }

    const sortByRank = ( a, b ) => {
        return rank === 'asc' ? a.rank - b.rank : b.rank - a.rank;
    }

    const updateType = (e, v) => v ? setType(v) : setType(type);
    const updatePrice = (e, v) => v ? setPrice(v) : setPrice(price);
    const updateRank = (e, v) => v ? setRank(v) : setRank(rank);

    const addToCart = ( e ) => {

        let key = e.target.value;
        let idx = cart.filter(item => item.rank == key);

        let selectedItem;

        if ( ! idx.length ) {
            console.log('Added new item');
            selectedItem = props.books.filter( ( item ) => item.rank == key )[0];
            selectedItem.count = 1;
            setCart( cart => [...cart, selectedItem] );
        } else {
            console.log('updating existing item');
            let hardCopy = [...cart];
            selectedItem = hardCopy.filter( ( item ) => item.rank == key )[0];
            selectedItem.count = selectedItem.count + 1;
            setCart(hardCopy);
        }

        console.log(cart);
    }

    const total = () => {
        if( !cart.length ){
            return 0;
        }
        let total = 0;

        cart.map( item => {
            total += item.price * item.count;
        } );

        return total;
    }

    const clearCart = () => {
        setCart([]);
    }

    return (
        <div className={classes.root}>
            <div className={classes.filtersWrapper}>
                <div>
                    <b>Genre: </b>
                    <ToggleButtonGroup
                        value={type}
                        exclusive
                        onChange={updateType}
                    >
                        <ToggleButton value="any">
                            Any
                        </ToggleButton>
                        <ToggleButton value="Autobiography" aria-label="centered">
                            Autobiography
                        </ToggleButton>
                        <ToggleButton value="Nonfiction" aria-label="right aligned">
                            Nonfiction
                        </ToggleButton>

                    </ToggleButtonGroup>
                </div>
                <div>
                    <b>Price :</b>
                    <ToggleButtonGroup
                        value={price}
                        exclusive
                        onChange={updatePrice}
                    >
                        <ToggleButton value="any">
                            Any
                        </ToggleButton>
                        <ToggleButton value="1" aria-label="centered">
                            <span>{'< 10'}</span>
                        </ToggleButton>
                        <ToggleButton value="2" aria-label="right aligned">
                            <span>{'11-30'}</span>
                        </ToggleButton>
                        <ToggleButton value="3" aria-label="right aligned">
                            <span>{'31+'}</span>
                        </ToggleButton>

                    </ToggleButtonGroup>
                </div>
                <div>
                    <b>Rank :</b>
                    <ToggleButtonGroup
                        value={rank}
                        exclusive
                        onChange={updateRank}
                    >
                        <ToggleButton value="asc">
                            Highest
                        </ToggleButton>
                        <ToggleButton value="desc">
                            Lowest
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

            </div>

            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <Paper className={classes.paper}>
                        <Items books={filterBooks()} add={addToCart}/>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>Total Price: {total()}</Paper>
                    <ul>
                    {
                        cart.map( (item) => {
                            return <li key={item.rank}>{item.title} - {item.count} pcs</li>
                        } )
                    }
                    </ul>
                    <Button onClick={clearCart} variant="contained" color="secondary">
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}