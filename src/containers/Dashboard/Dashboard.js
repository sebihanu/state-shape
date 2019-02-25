import React, { Component } from "react";
import MyBlogLatestComments from "./MyBlogLatestComments";
import MyLatestPosts from "./MyLatestPosts";
import { Grid } from '@material-ui/core';

class Dashboard extends Component {
    render() {
        return (
            <Grid container spacing={24}>
                <Grid item>
                    <MyBlogLatestComments />
                </Grid>
                <Grid item>
                    <MyLatestPosts />
                </Grid>
            </Grid>
        );
    }
}

export default Dashboard;