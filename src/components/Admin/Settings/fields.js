import * as actions from 'redux/modules/data/actions';
export const reducerIndex = 'data';
export const reducerKey = 'settings';
export const reducerItem = 'item';
export const path = 'settings';

export function initialValues(values) {
  return Object.assign({},
    values
  );
}

export default function fields() {
  return ([
    {
      name: 'site_name',
      label: 'Site naam',
      type: 'text',
      placeholder: 'Site naam',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'site_email',
      label: 'E-mailadres contact',
      type: 'text',
      placeholder: 'E-mailadres titel',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'payout',
      label: 'Uitbetaling %',
      type: 'text',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      row: {
        hideOnStatic: true,
        col: [
          {
            md: 10, mdOffset: 2, children: [
            {type: 'success', message: 'Het formulier is opgeslagen'},
            {type: 'error', message: 'Er zijn fouten opgetreden, controleer het formulier.'}
            ]
          },
          {hideOnStatic: true, md: 10, mdOffset: 2, children: [{type: 'submit', name: 'submit', value: 'opslaan'}]}
        ]
      }
    }
  ]);
}

export function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const promises = [];

  if (!actions.isLoadedItem(reducerKey, state, 1)) {
    promises.push(dispatch(actions.loadItem(reducerKey, 1)));
  }
  return Promise.all(promises);
}
