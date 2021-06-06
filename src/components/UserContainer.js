import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {
    Button, Card, CardActions, CardContent,
    makeStyles,
    Typography,
    Link
} from "@material-ui/core";
import Loader from "react-loader-spinner";


import {FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS} from "../redux/types";


const UserContainer = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.data.users)
    const loading = useSelector(state => state.data.loading)

    useEffect(() => {
        dispatch({type: FETCH_USERS_REQUEST})
        axios.get('https://jsonplaceholder.typicode.com/users')
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

    }, [dispatch])

    const useStyles = makeStyles({
        root: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 260px)',
            justifyContent: 'center',
            rowGap: '18px',
            columnGap: '18px',
            marginTop: '1rem'
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 1,
        },
        spinner: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
        },
        grid: {
            display: 'grid'
        }
    });

    const classes = useStyles()
    return (
        <Fragment>
            {loading && <Loader
                type="Bars"
                color="#963577"
                height={100}
                width={100}
                className={classes.spinner}
            />}
            <div className={classes.root}>
                {users.map(user => (
                    <Card key={user.id} className={classes.grid}>
                        <CardContent>
                            <Typography className={classes.title} color="textPrimary" gutterBottom>
                                {user.name}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {user.email}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {user.phone}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {user.website}
                            </Typography>
                            <Typography variant="body1" component="h3">
                                {user.company.name}
                            </Typography>
                            <Typography variant="body1" component="h3">
                                {user.company.catchPhrase}
                            </Typography>
                            <Typography component="h1" variant="caption">
                                {user.company.bs}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button component={Link} href={`/user/${user.id}`} variant="contained" color="primary">
                                Details
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </Fragment>
    );
};

export default UserContainer;
