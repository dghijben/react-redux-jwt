import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import TinyMCE from 'react-tinymce';
const tags = ['h1', 'h2', 'h3', 'h4', 'h5'];

export default class Header extends Component {

  static propTypes = {
    settings: PropTypes.object,
    keyPath: PropTypes.array,
    updateJson: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
    this.state = {
      content: ''
    };
  }

  componentWillMount() {
    // BUG in REACT, IT DOES NOT WORK WHEN
    // reactDOM/server is used
    this.setState({'content': _.get(this.props, 'content')});
  }

  emitChange(e) {
    this.setState({content: e.target.getContent()});

    this.props.updateJson(this.props.keyPath, e.target.getContent());
  }

  render() {

    console.log(this.props.keyPath);

    let tag = 'h1';
    if (_.has(this.props, 'settings')) {
      const indexOf = _.indexOf(tags, _.get(this.props, 'settings.type'));
      if (indexOf > -1) {
        tag = tags[indexOf];
      }
    }

    return (
      <TinyMCE
        content={'<' + tag + '>' + _.get(this.props, 'content') + '</' + tag + '>'}
        onChange={this.emitChange}
        config={{
          inline: true,
          toolbar: 'undo redo',
          menubar: false
        }}
      />
    );

  }
}
