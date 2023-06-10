import React from 'react';
import { Audio } from 'react-loader-spinner';

class Loader extends React.Component {
  render() {
    return (
      <Audio
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="three-dots-loading"
      />
    );
  }
}
export default Loader;
