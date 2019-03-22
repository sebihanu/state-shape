import React, { PureComponent } from "react";
import { Grid, Button, TextField } from '@material-ui/core';

class Publisher extends PureComponent {
    state = { val: 'default' }

    handleClick = () => {
        this.props.PubSub.publish(this.props.topic, this.state.val);
    }

    handlePropertyChange = prop => ev => {
        const val = ev.target.value;
        this.setState({ [prop]: val });
    }

    render() {
        return (
            <Grid container spacing={24}>
            <Grid item>
                    <TextField label="value" value={this.state.val} onChange={this.handlePropertyChange('val')} />                    
                </Grid>
                <Grid item>                    
                    <Button onClick={this.handleClick}>Publish</Button>
                </Grid>
            </Grid>
        );
    }
}

export default Publisher;