import React, {useEffect} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles} from "@material-ui/core";


import {FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS} from "../redux/types";

const Comments = ({id}) => {

    const dispatch = useDispatch()
    const comments = useSelector(state => state.data.comments)

    useEffect(() => {
        dispatch({type: FETCH_COMMENTS_REQUEST})
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(response => {
                const comments = response.data
                dispatch({type: FETCH_COMMENTS_SUCCESS, payload: comments})
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch({type: FETCH_COMMENTS_FAILURE, payload: errorMsg})
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const useStyles = makeStyles({
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
        title: {
            fontSize: '22px',
            fontFamily: 'cursive',
        },
        comment: {
            padding: '10px 0 10px 0'
        }
    })

    const classes = useStyles()

    return (
        <div>
            <div className={classes.cardPosition}>
                {comments && comments.map(comment => (
                    <div key={comment.id} className={classes.card}>
                        <div>
                            <div>
                                <span className={classes.title}>{comment.name}</span>
                            </div>
                            <div className={classes.comment}>
                                {comment.body}
                            </div>
                            <div>
                                {comment.email}
                            </div>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    );
};

export default Comments;