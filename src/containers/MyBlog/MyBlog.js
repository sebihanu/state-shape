import React, { PureComponent } from "react";
import MyPostsWidget from "./MyPostsWidget";
import { Grid } from '@material-ui/core';

class Dashboard extends PureComponent {
    render() {
        return (
            <Grid container spacing={24}>
                <Grid item>
                    
                </Grid>
                <Grid item>
                    <MyPostsWidget pageSize={4} />
                </Grid>
            </Grid>
        );
    }
}

export default Dashboard;