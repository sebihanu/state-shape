import React, { PureComponent } from "react";
import { Grid } from '@material-ui/core';
import Publisher from './Publisher'
import Subscriber from "./Subscriber";
import PubSub from 'pubsub-js'

const TOPIC1 = "TOPIC1";
class MessageBusPage extends PureComponent {
    state = {
        showPublisher: false,
        showSubscriber1: false,
        showSubscriber2: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ showPublisher: true });
        }, 4000);
        setTimeout(() => {
            this.setState({ showSubscriber1: true });
        }, 0);
        setTimeout(() => {
            this.setState({ showSubscriber2: true });
        }, 8000);
    }

    render() {
        return (
            <Grid container spacing={24}>
                {this.state.showPublisher &&
                    (<Grid item sm={4}>
                        <Publisher PubSub={PubSub} topic={TOPIC1} />
                    </Grid>)
                }
                {this.state.showSubscriber1 &&
                    (<Grid item sm={4}>
                        <Subscriber PubSub={PubSub} topic={TOPIC1} />
                    </Grid>)
                }
                {this.state.showSubscriber2 &&
                    (<Grid item sm={4}>
                        <Subscriber PubSub={PubSub} topic={TOPIC1} />
                    </Grid>)
                }
            </Grid>
        );
    }
}

export default MessageBusPage;