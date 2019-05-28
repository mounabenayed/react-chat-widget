import React, { PureComponent } from 'react';
import { PROP_TYPES } from '@constants';

import './styles.scss';

class Image extends PureComponent {
  render() {
    return (
        <div className="rcw-image">
        <div className="rcw-image-details" >
          <img className="rcw-image-frame" src={this.props.message.get('image')} />
        </div>
      </div>
    );
  }
}

Image.propTypes = {
  message: PROP_TYPES.IMAGE
};

export default Image;




