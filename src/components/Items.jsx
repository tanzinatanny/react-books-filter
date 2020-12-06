import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        // justifyContent: 'space-around',
        // overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        marginBottom: 40
    },
    image: {
        height: 250,
        width: 180,
        top: 0,
        transform:"none",
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },

    price: {

    },

    title: {
        height: 100,
    }
}));

export default function Items( props ) {
    const classes = useStyles();
    let books = props.books;
    let tileData = books.map( (book) => {

        return {
            img: book.book_image,
            title: book.title,
            author: book.author,
            price: book.price,
            rank: book.rank,
        }
    } );

    const emptyResult = () => {
        return tileData.length ? '' : <h2>No matches found.</h2>;
    }
    return (
        <div className={classes.root}>
            <GridList cols={3} cellHeight={360}>
            
                {
                    emptyResult()
                }
                {tileData.map((tile) => (
                    <GridListTile key={tile.rank}>
                        <img src={tile.img} alt={tile.title} className={classes.image} />
                        <GridListTileBar
                            className={classes.title}
                            title={ ` #${tile.rank} - ${tile.title}` }
                            subtitle={
                                <div>
                                    <p>By: {tile.author}</p>
                                    <p>Price: {tile.price} <button value={tile.rank} onClick={props.add}>Add</button></p>
                                </div>
                            }
                        />

                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
