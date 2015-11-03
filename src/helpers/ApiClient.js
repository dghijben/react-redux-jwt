import _ from 'lodash';
import superagent from 'superagent';
import config from '../config';
import cookie from 'react-cookie';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://localhost:' + config.apiPort + '/api' + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data, headers, formData } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        console.log('Tikker 1', formData);
        if (formData) {
          console.log('Tikker 2 ');
          const fD = new FormData();
          console.log('Tikker 3', formData);
          _.map(formData, (value, key)=> {
            console.log('Tikker 4', key, value);
            if (value && value instanceof FileList) {
              console.log('Tikker 5');
              _.map(value, (f)=> {
                if (f && f instanceof File) {
                  console.log('Tikker 6', key, f);
                  fD.append(key, f);
                }
              });
            } else if (value) {
              console.log('Tikker 7', key, value);
              fD.append(key, value);
            }
          });
          request.send(fD);
        }

        if (params) {
          request.query(params);
        }

        const token = cookie.load('token');
        if (token) {
          request.set('Authorization', 'Bearer ' + token);
        }

        if (headers !== undefined ) {
          for (const key in headers) {
            if (headers.hasOwnProperty(key)) {
              if ((key === 'Authorization' && !token)) {
                request.set(key, headers[key]);
              } else
              if (key !== 'Authorization') {
                request.set(key, headers[key]);
              }
            }
          }
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
