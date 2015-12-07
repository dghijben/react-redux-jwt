import _ from 'lodash';
import * as actions from 'redux/modules/data/actions';
export const reducerIndex = 'data';
export const reducerKey = 'register';
export const reducerKeyVerify = 'registerVerify';
export const reducerItem = 'item';

export function fields1() {

  return ([
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'Email',
      labelClassName: 'input-desc',
    },
    {
      name: 'password',
      label: 'Wachtwoord',
      type: 'password',
      placeholder: 'Wachtwoord',
      help: 'Minimaal 8 tekens, cijfers, letters en hoofdletters',
      labelClassName: 'input-desc'
    },
    {
      name: 'password_confirmation',
      label: 'Wachtwoord nogmaals',
      type: 'password',
      placeholder: 'Wachtwoord nogmaals',
      labelClassName: 'input-desc'
    },
    {
      row: {
        hideOnStatic: true,
        col: [
          {
            md: 12,
            children: [
              {type: 'success', message: 'Uw account is aangemaakt.'},
              {type: 'error', message: 'Er zijn fouten opgetreden, controleer het formulier.'}
            ]
          },
          {hideOnStatic: true, md: 12, children: [{type: 'submit', name: 'submit', value: 'versturen'}]}
        ]
      }
    }
  ]);
}

export default function fields() {

  return ([

    {
      row: {
        col: [
          {
            md: 6,
            children: [{
              name: 'name',
              label: 'Account / Club',
              type: 'text',
              placeholder: 'Account / Club',
              labelClassName: 'input-desc',

            }]
          },
          {
            md: 6,
            children: [{
              name: 'address',
              label: 'Adres + huisnummer',
              type: 'text',
              placeholder: 'Adres + huisnummer',
              labelClassName: 'input-desc'

            }]
          }
        ]
      }
    },
    {
      name: 'postcode',
      label: 'Postcode',
      type: 'text',
      placeholder: 'Postcode',
      labelClassName: 'input-desc'
    },
    {
      name: 'city',
      label: 'Plaats',
      type: 'text',
      placeholder: 'Plaats',
      labelClassName: 'input-desc'

    },
    {
      name: 'telephone',
      label: 'Telefoon',
      type: 'text',
      placeholder: 'Telefoon',
      labelClassName: 'input-desc'

    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'Email',
      labelClassName: 'input-desc'
    },
    {
      name: 'website',
      label: 'Website',
      type: 'text',
      placeholder: 'Website',
      labelClassName: 'input-desc'
    },
    {
      name: 'business_id',
      label: 'Kvk',
      type: 'text',
      placeholder: 'Kvk',
      labelClassName: 'input-desc'
    },
    {
      name: 'business_sub_id',
      label: 'Vestiginsnummer',
      type: 'text',
      placeholder: 'Vestiginsnummer',
      labelClassName: 'input-desc',
    },
    {
      name: 'business_tax_id',
      label: 'Btw-nummer',
      type: 'text',
      placeholder: 'Btw nummer',
      labelClassName: 'input-desc',
    },
    {
      name: 'payment_bank',
      label: 'Bank',
      type: 'text',
      placeholder: 'Bank',
      labelClassName: 'input-desc',
    },
    {
      name: 'payment_account_name',
      label: 'Rekening naam',
      type: 'text',
      placeholder: 'Rekeningnaam',
      labelClassName: 'input-desc',
    },

    {
      name: 'payment_account_number',
      label: 'Rekeningnummer',
      placeholder: 'NLXX BANK XXXX XXXX XX',
      type: 'text',
      labelClassName: 'input-desc',
    },
    {
      name: 'members',
      label: 'Aantal leden',
      type: 'text',
      placeholder: 'Aantal leden',
      labelClassName: 'input-desc',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'goal1',
      label: 'Doel 1',
      type: 'rte',
      labelClassName: 'input-desc',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'goal2',
      label: 'Doel 2',
      type: 'rte',
      labelClassName: 'input-desc',
      wrapperClassName: 'col-md-10'
    },
    {
      row: {
        hideOnStatic: true,
        col: [
          {
            md: 10,
            mdOffset: 2,
            children: [
              {type: 'success', message: 'Het formulier is opgeslagen'},
              {type: 'error', message: 'Er zijn fouten opgetreden, controleer het formulier.'}
            ]
          },
          {hideOnStatic: true, md: 12, children: [{type: 'submit', name: 'submit', value: 'versturen'}]}
        ]
      }
    }
  ]);
}

export function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const promises = [];
  console.log('hier');
  if (_.has(state, 'router.params.code')) {
    if (!actions.isLoadedItemByString(reducerKeyVerify, state, state.router.params.code)) {
      console.log('LOAD');
      promises.push(dispatch(actions.loadItem(reducerKeyVerify, state.router.params.code)));
    }
  }
  return Promise.all(promises);
}
