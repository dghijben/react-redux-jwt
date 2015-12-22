import _ from 'lodash';
import React, {Component} from 'react';
import {Image} from 'react-bootstrap';

export default class Picture extends Component {

  constructor(props, context) {
    super(props, context);
    this.loadImage = this.loadImage.bind(this);
    this.state = {
      pictures: null
    };
  }

  componentWillMount() {
    this.loadImage(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadImage(nextProps);
  }

  loadImage(props) {
    const picture = _.last(_.filter(props.pictures, (item) => { return !item.deleted; }));

    if (!_.isEmpty(picture)) {
      const fileName = picture.file_name;
      this.setState({src: '/image/medium/' + fileName});
    } else {
      this.setState({src: ''});
    }
  }

  render() {
    if (_.isEmpty(this.state.src) ) {
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
