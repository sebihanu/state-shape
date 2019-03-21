import React, { PureComponent } from "react";
import { Grid } from '@material-ui/core';
import Publisher from './Publisher'
import Subscriber from "./Subscriber";
import PubSub from 'pubsub-js'

class MessageBusPage extends PureComponent {
    render() {
        return (
            <Grid container spacing={24}>
                <Grid item sm={4}>
                    <Publisher PubSub={PubSub} />
                </Grid>
                <Grid item sm={4}>
                    <Subscriber PubSub={PubSub}/>
                </Grid>
            </Grid>
        );
    }
}

export default MessageBusPage;