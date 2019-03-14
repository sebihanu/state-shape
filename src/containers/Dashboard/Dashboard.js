import React, { Component } from "react";
import MyBlogCommentsWidget from "./MyBlogCommentsWidget";
import MyLatestPostsWidget from "./MyLatestPostsWidget";
import { Grid } from '@material-ui/core';

class Dashboard extends Component {
    render() {
        return (
            <Grid container spacing={24}>
                <Grid item sm={4}>
                    <MyBlogCommentsWidget pageSize={4} />
                </Grid>
                <Grid item sm={4}>
                    <MyLatestPostsWidget pageSize={3}/>
                </Grid>
            </Grid>
        );
    }
}

export default Dashboard;