import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {IconButton, makeStyles} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {useHistory} from 'react-router-dom'
import CommentIcon from '@material-ui/icons/Comment';
import AddCircleIcon from '@material-ui/icons/AddCircle';


import {
    FETCH_POSTS_FAILURE,
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS
} from "../redux/types";
import Comments from "../components/Comments";
import Alert from "../components/Alert";
import TransitionsModal from "../components/Modal";


const PostDetails = () => {

    const {postID} = useParams()
    const dispatch = useDispatch()

    const post = useSelector(state => state.data.posts)
    const error = useSelector(state => state.data.error)
    const history = useHistory()

    useEffect(() => {
        dispatch({type: FETCH_POSTS_REQUEST})
        axios.get(`https://jsonplaceholder.typicode.com/posts/${postID}`)
            .then(response => {
                const posts = response.data
                setTimeout(() => {
                    dispatch({
                        type: FETCH_POSTS_SUCCESS,
                        payload: posts
                    })
                }, 100)
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch({
                    type: FETCH_POSTS_FAILURE,
                    payload: errorMsg
                })
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const useStyles = makeStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2rem',
            flexDirection: 'column'
        },
        title: {
            fontSize: '28px',
            fontFamily: 'monospace',
            marginLeft: '5px',
            textAlign: 'center'

        },
        postDescription: {
            fontSize: '23px',
            fontFamily: 'fantasy',
            marginTop: '1rem',
            padding: '2rem',
            textAlign: 'center'
        },
        backButton: {
            margin: '1rem'
        },
        buttons: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%'
        }
    })

    const classes = useStyles()

    const [show, setShow] = useState(false)
    const [modal, setModal] = useState(false)

    return (
        <Fragment>
            <TransitionsModal isOpen={modal} isClose={() => setModal(false)}/>
            {error && <Alert error={error}/>}
            <div className={classes.backButton}>
                <IconButton aria-label="back" onClick={() => history.goBack()} color="primary">
                    <KeyboardBackspaceIcon fontSize="large"/>
                </IconButton>
            </div>
            <div className={classes.root}>
                <div>
                    <div className={classes.title}>
                        <h2>{post.title}</h2>
                    </div>
                </div>
                <div className={classes.postDescription}>
                    <p>{post.body}</p>
                </div>
                <div className={classes.buttons}>
                    <IconButton aria-label="back" onClick={() => setShow(prevState => !prevState)} color="primary">
                        <CommentIcon fontSize="large"/>
                    </IconButton>
                    <IconButton aria-label="back" onClick={() => setModal(prevState => !prevState)} color="primary">
                        <AddCircleIcon fontSize="large"/>
                    </IconButton>
                </div>
                <div>
                    {show ? <Comments id={postID}/> : null}
                </div>
            </div>

        </Fragment>
    );
};

export default PostDetails;