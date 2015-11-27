import _ from 'lodash';
import React, {Component} from 'react';
import TinyMCE from 'react-tinymce';

export default class Rte extends Component {

  render() {
    const tag = 'div';

    return (
      <TinyMCE
        content={'<' + tag + '>' + _.get(this.props, 'content') + '</' + tag + '>'}
        onChange={this.emitChange}
        config={{
          inline: true,
          menubar: false,
          toolbar_items_size: 'small',
          style_formats_merge: true,
          style_formats: [{
            title: 'Theme',
            items: [{
              title: 'Fonts',
              items: [
                { title: '1. Lobster Two', inline: 'span', classes: 'font-1'}
              ]
            }, {
              title: 'Styles',
              items: [
                /* here add further theme styles if needed... */
              ]
            }]
          }, {
            title: 'Fonts',
            items: [
              { title: '1. Lobster Two', inline: 'span', classes: 'font-1'}
            ]
          }]

        }}
      />
    );
  }
}
