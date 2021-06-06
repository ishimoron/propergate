import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom'


import Home from "./pages/Home";
import AppBar from "./components/AppBar";
import UserDetails from "./pages/UserDetails";
import PostDetails from "./pages/PostDetails";

const App = () => {
    return (
        <Fragment>
            <AppBar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/user/:id" component={UserDetails}/>
                <Route path="/posts/:postID" component={PostDetails}/>
            </Switch>
        </Fragment>
    );
};

export default App;


