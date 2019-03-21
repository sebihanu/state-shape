import React, { PureComponent } from "react";
import { Grid, Button } from '@material-ui/core';

class Publisher extends PureComponent {
    handleClick = () => {
        this.props.PubSub.publish('TOPIC1', 'data1');
    }
    render() {
        return (
            <Grid container spacing={24}>
                <Grid item sm={4}>
                    <Button onClick={this.handleClick}>Publish</Button>
                </Grid>
            </Grid>
        );
    }
}

export default Publisher;