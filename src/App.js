import React, {useEffect, useState} from "react";
import './App.css';
import {makeStyles} from '@material-ui/core/styles';
import Header from "./components/Header";
import Data from "./data/results.json";
import Filters from "./components/Filters";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function App() {

    const classes = useStyles();

    let books = Data.results.books;

    return (
        <div className={classes.root}>
            <Header/>
            <Filters books={books}/>
        </div>
    );
}

export default App;
