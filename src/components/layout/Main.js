import React from "react";
import appRoutes from 'utils/routes'
import { Card, CardContent } from '@material-ui/core';

class Main extends React.Component {
    render() {
        return (
            <Card>                
                <CardContent>
                    {appRoutes}
                </CardContent>
            </Card>
        );
    }
}

export default Main