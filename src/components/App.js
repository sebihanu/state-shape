import React from 'react';
import Header from './layout/Header'
import Main from './layout/Main'
import Footer from './layout/Footer'
import PropTypes from 'prop-types';

class App extends React.PureComponent {

  render() {
    return (
      <div>
        <Header />        
        <Main />        
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
};
export default App;
