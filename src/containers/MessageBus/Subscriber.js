import React, { PureComponent } from "react";
import { Grid } from '@material-ui/core';

class Subscriber extends PureComponent {
    state = {
        item: 'initial'
    }

    constructor(props) {
        super(props);
        this.token = this.props.PubSub.subscribe('TOPIC1', this.received);
    }

    componentWillUnmount() {
        this.props.PubSub.unsubscribe(this.token);
    }

    received = (msg, data) => {
        this.setState({ item: data });
    }

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item sm={4}>
                    Subscriber - {this.state.item}
                </Grid>
            </Grid>
        );
    }
}

export default Subscriber;