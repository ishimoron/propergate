import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {IconButton, makeStyles, Link} from "@material-ui/core";
import Loader from "react-loader-spinner"


//icons
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AddCircleIcon from '@material-ui/icons/AddCircle';


import {
    FETCH_POSTS_FAILURE,
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS,
} from "../redux/types";
import Post from "../components/Post";
import TransitionsModal from "../components/Modal";
import Alert from "../components/Alert";

const UserDetails = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const posts = useSelector(state => state.data.posts)
    const user = useSelector(state => state.data.users)
    const loading = useSelector(state => state.data.loading)
    const error = useSelector(state => state.data.error)

    const [filtredPost, setFiltred] = useState(null)
    let content = posts.map((item) => <Post id={item.id} title={item.title} key={item.id} select={setFiltred}/>)

    if (filtredPost) {
        const newPost = posts.filter(item => item.id !== filtredPost)
        content = newPost.map((item) => <Post id={item.id} title={item.title} key={item.id} select={setFiltred}/>)
    }

    useEffect(() => {
        const fetchPosts = () => {
            dispatch({type: FETCH_POSTS_REQUEST})
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
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
        }

        const fetchUsers = () => {
            dispatch({type: FETCH_USERS_REQUEST})
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(response => {
                    const users = response.data
                    // for displaying loader more than 0.1 sec
                    setTimeout(() => {
                        dispatch({
                            type: FETCH_USERS_SUCCESS,
                            payload: users
                        })
                    }, 500)
                })
                .catch(error => {
                    const errorMsg = error.message
                    dispatch({
                        type: FETCH_USERS_FAILURE,
                        payload: errorMsg
                    })
                })
        }

        fetchPosts()
        fetchUsers()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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
    const [modal, setModal] = useState(false)
    const [postForm, setPost] = useState(false)

    return (
        <div>
            <TransitionsModal
                isOpen={modal}
                isClose={() => setModal(false)}
                userID={id}
                postForm={postForm}

            />
            {error && <Alert error={error}/>}
            {loading ? <Loader
                type="Bars"
                color="#963577"
                height={100}
                width={100}
                className={classes.spinner}
            /> : (
                <div>
                    <div className={classes.root}>
                        <div>
                            <IconButton aria-label="back" component={Link} href="/" color="primary">
                                <KeyboardBackspaceIcon fontSize="large"/>
                            </IconButton>
                        </div>
                        <div>{user.name}</div>
                        <div>
                            <IconButton aria-label="back" color="primary"
                                        onClick={() => setModal(true) || setPost(true)}>
                                <AddCircleIcon fontSize="large"/>
                            </IconButton>
                        </div>
                    </div>
                    {content}
                </div>
            )}
        </div>
    );
};

export default UserDetails;