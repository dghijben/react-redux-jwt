import _ from 'lodash';
import React from 'react';
import * as Widgets from '../Widgets';

export function dataMapper(jsonData) {
  return _.map(jsonData, (data) => {
    const objKeys = _.keys(data);
    console.log('objKeys', objKeys);
    return _.map(objKeys, (objKey) => {
      const cKey = _.capitalize(objKey);
      if (_.has(Widgets, cKey)) {
        return _.map(data[objKey], (props, key) => {
          if (key === 'children') {
            return React.createElement(_.get(Widgets, cKey), {...props, key: key, settings: data[objKey].settings});
          } else if (key === 'content') {
            return React.createElement(_.get(Widgets, cKey), {content: props, key: key, settings: data[objKey].settings});
          }
        });
      }
    });
  });
}

export function createMarkup(data) { return {__html: data}; }
