import React from 'react';

class Comp1 extends React.PureComponent {
  render() {
    const { state1 } = this.props;
    return (
      <div>
        Comp1 {state1.k1} - {state1.k2}
      </div>
    );
  }
}

export default Comp1;
