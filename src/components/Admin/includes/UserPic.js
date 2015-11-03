import _ from 'lodash';
import React, {Component} from 'react';
import {Image} from 'react-bootstrap';

export default class UserPic extends Component {

  constructor(props, context) {
    super(props, context);
    this.loadImage = this.loadImage.bind(this);
    this.state = {
      src: null
    };
  }

  componentWillMount() {
    this.loadImage(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadImage(nextProps);
  }

  loadImage(props) {
    if ( typeof _.get(props, 'src') === 'object') {
      _.map(_.get(props, 'src'), (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.setState({src: e.target.result});
        };
        reader.readAsDataURL(file);
      });
    } else if (!_.isEmpty(props, 'src')) {
      this.setState({src: '/bin/' + props.src});
    }
  }

  render() {
    if (_.isEmpty(this.state.src)) {
      return <div>No image</div>;
    }

    return (
      <Image
        src={this.state.src}
        {..._.omit(this.props, 'src')}
      />
    );
  }
}
