import React, {useState} from "react";
import {Formik, Form, useField} from "formik";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";


import "../assets/css/styles-custom.css";
import "../assets/css/formStyles.css";
import {
    ADD_COMMENTS_FAILURE,
    ADD_COMMENTS_REQUEST,
    ADD_COMMENTS_SUCCESS,
} from "../redux/types";

const MyTextInput = ({label, setValue, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} onChange={e => setValue(e.target.value)} required/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const MyTextArea = ({label, setValue, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea className="text-area" {...field} {...props} onChange={e => setValue(e.target.value)} required/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};


const CommentForm = ({userID, submitClosing}) => {

    const useStyles = makeStyles({
        background: {
            background: '#fff'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 3rem'
        },
        title: {
            fontSize: '3rem',
            fontFamily: 'monospace',
            letterSpacing: '2px',
            textAlign: 'center'
        }
    })

    const classes = useStyles()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [body, setBody] = useState('')
    const dispatch = useDispatch()

    const formSubmit = (e) => {
        try {
            dispatch({type: ADD_COMMENTS_REQUEST})
            fetch(`https://jsonplaceholder.typicode.com/comments`, {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    body,
                    email,
                    userId: userID
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => dispatch({type: ADD_COMMENTS_SUCCESS, payload: json}))
                .then(() => submitClosing())
        } catch (error) {
            const errorMsg = error.message
            dispatch({type: ADD_COMMENTS_FAILURE, payload: errorMsg})
        }
    }

    return (
        <div className={classes.background}>
            <h1 className={classes.title}>Add Post</h1>
            <Formik
                initialValues={{
                    name,
                    body,
                    email
                }}
                onSubmit={formSubmit}
            >
                <Form className={classes.form}>
                    <MyTextInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="your name"
                        value={name}
                        setValue={setName}
                    />
                    <MyTextInput
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="your email"
                        value={email}
                        setValue={setEmail}
                    />
                    <MyTextArea
                        label="Body"
                        name="body"
                        rows="6"
                        placeholder="Post body"
                        value={body}
                        setValue={setBody}
                    />
                    <Button type="submit" color="primary" variant="outlined">Submit</Button>
                </Form>
            </Formik>
        </div>
    );
};

export default CommentForm