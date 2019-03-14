import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import Header from './components/layout/Header'
import Main from './components/layout/Main'
import Footer from './components/layout/Footer'
import PropTypes from 'prop-types';
import { loadMyBlog } from 'actions/blog';

class App extends React.PureComponent {

  componentDidMount() {
    this.props.actions.loadMyBlog();
  }

  render() {
    const { blogLoaded } = { ...this.props };
    return (
      blogLoaded ? (
        <React.Fragment>
          <Header />
          <Main />
          <Footer />
        </React.Fragment>
      ) : (
        <div>Loading ...</div>
      )
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    blogLoaded: state.currentUser.blogLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadMyBlog: () => dispatch(loadMyBlog())
    }
  };
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
