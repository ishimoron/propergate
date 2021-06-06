import React, {Fragment} from 'react';
import {IconButton, makeStyles} from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';

import logo from '../assets/img/propergate.png'

const AppBar = () => {

    const useStyles = makeStyles({
        navbar: {
            background: 'linear-gradient(90deg, #cc2b5e, #753a88)',
            display: 'flex',
            color: 'white',
            padding: '1rem'
        },
        navbarIcon: {
            display: 'inline'
        },
        navbarSocials: {
            display: 'inline',
            position: "absolute",
            right: '1rem'
        },
        logo: {
            width: '10rem'
        },
        socialIcons: {
            color: 'white'
        }
    })

    const classes = useStyles()
    return (
        <Fragment>
            <nav className={classes.navbar}>
                <div className={classes.navbarIcon}>
                    <a href="/">
                        <img
                            className={classes.logo}
                            src={logo}
                            alt="logo"
                        />
                    </a>
                </div>
                <div className={classes.navbarSocials}>
                    <IconButton href="https://github.com/ishimoron" target="_blank" className={classes.socialIcons}>
                        <GitHubIcon/>
                    </IconButton>
                    <IconButton href="https://ishimov.tech" target="_blank" className={classes.socialIcons}>
                        <LanguageIcon/>
                    </IconButton>
                </div>
            </nav>
        </Fragment>
    );
};

export default AppBar;