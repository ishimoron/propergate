import React, {useState} from 'react';
import {IconButton, Link, makeStyles} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch} from "react-redux";


import {SHOW_ERROR} from "../redux/types";


const Post = ({id, title, select}) => {

    const useStyles = makeStyles({
        root: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: '2rem'
        },
        spinner: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
        },
        cardPosition: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '1rem'
        },
        card: {
            border: '1px #000 solid',
            padding: '15px',
            width: '90%',
            marginTop: '1rem'
        },
        cardItems: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        title: {
            fontSize: '22px',
            fontFamily: 'monospace',
            marginLeft: '5px'
        }
    })

    const classes = useStyles()
    const dispatch = useDispatch()
    const [disabled, setDisabled] = useState(false)

    const deletePost = () => {
        setDisabled(true)
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                if (response.status === 200) {
                    select(id)
                    setDisabled(false)
                }
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch({type: SHOW_ERROR, payload: errorMsg})
            })
    }

    return (
        <div>
            <div className={classes.cardPosition}>
                <div className={classes.card}>
                    <div className={classes.cardItems}>
                        <div>
                            <IconButton aria-label="back" color="secondary" onClick={deletePost} disabled={disabled}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                            <span className={classes.title}>{title}</span>
                        </div>
                        <div>
                            <IconButton aria-label="back" color="primary" component={Link}
                                        href={`/posts/${id}`}>
                                <ArrowForwardIosIcon fontSize="small"/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;