import React from 'react'
import { connect } from 'react-redux'
import Comp1 from './Comp1';
import { bindActionCreators } from 'redux';
import { action1 } from 'actions/feature1'

class Comp1Container extends React.PureComponent {
    componentDidMount() {
        setTimeout(() => {            
            this.props.actions.action1('test');
        }, 3000);
    }

    render() {        
        return (
            <Comp1 {...this.props} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { state1: state.state1 };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({
        action1
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Comp1Container)