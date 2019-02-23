import React from "react";
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, withStyles, SvgIcon  } from '@material-ui/core';
import { NavLink } from 'react-router-dom'

const styles = {
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -8,
        marginRight: 20,
        marginTop: 3
    }
};

const linkStyle = { color: '#FFF', padding: 5 };

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

class Header extends React.PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static" color="primary">
                <Toolbar>
                    <a href="/" className={classes.menuButton}>
                        <HomeIcon color="secondary" />
                    </a>                    
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        React
                    </Typography>
                    <NavLink to="/" style={linkStyle}>Comp1</NavLink>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header)