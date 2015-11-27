import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom/server';
import * as Widgets from '../Widgets';

export function dataMapper(jsonData, path = [], updateJson = () => {}) {
  return _.map(jsonData, (data, index2) => {
    const objKeys = _.keys(data);
    return _.map(objKeys, (objKey) => {
      const cKey = _.capitalize(objKey);
      if (_.has(Widgets, cKey)) {
        return _.map(data[objKey], (props, key) => {
          if (key === 'children') {
            const keyPath = _.clone(path);
            keyPath.push(index2);
            keyPath.push(cKey);
            keyPath.push(key);

            return React.createElement(_.get(Widgets, cKey), {...props, updateJson: updateJson, key: key, keyPath: keyPath, settings: data[objKey].settings});
          } else if (key === 'content') {
            const keyPath = _.clone(path);
            keyPath.push(parseInt(index2, 10));
            keyPath.push(cKey);
            keyPath.push(key);

            return React.createElement(_.get(Widgets, cKey), {content: props, updateJson: updateJson, key: key, keyPath: keyPath, settings: data[objKey].settings});
          }
        });
      }
    });
  });
}

export function createMarkup(data) { return {__html: data}; }


export function renderToString(comp, props = null, children = null) {
  return ReactDOM.renderToStaticMarkup(React.createElement(comp, props, children));
}
