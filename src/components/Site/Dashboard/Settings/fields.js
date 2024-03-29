import _ from 'lodash';
export const reducerIndex = 'store';
export const reducerKey = 'dashboardAccount';
export const reducerKeyCats = 'dashboardAccountCategories';
export const reducerItem = 'item';

export function initialValues(values) {
  return Object.assign({},
      values,
      {categories: _.pluck(_.get(values, 'categories'), 'id')}
  );
}

export function fieldsBank() {
  return ([

    {
      name: 'payment_bank',
      label: 'Bank',
      type: 'text',
      placeholder: 'Bank',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'payment_account_name',
      label: 'Rekening naam',
      type: 'text',
      placeholder: 'Rekeningnaam',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },

    {
      name: 'payment_account_number',
      label: 'Rekeningnummer',
      placeholder: 'NLXX BANK XXXX XXXX XX',
      type: 'text',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'business_id',
      label: 'Kvk',
      type: 'text',
      placeholder: 'Kvk',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'business_sub_id',
      label: 'Vestiginsnummer',
      type: 'text',
      placeholder: 'Vestiginsnummer',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'business_tax_id',
      label: 'Btw-nummer',
      type: 'text',
      placeholder: 'Btw nummer',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },

    {
      row: {
        hideOnStatic: true,
        col: [
          {
            md: 12,
            children: [
              {type: 'success', message: 'De gegevens zijn opgeslagen.'},
              {type: 'error', message: 'Er zijn fouten opgetreden, controleer het formulier.'}
            ]
          },
          {hideOnStatic: true, md: 12, children: [{type: 'submit', name: 'submit', value: 'volgende'}]}
        ]
      }
    }
  ]);
}

export function fieldsExtra() {
  return ([

    {
      name: 'members',
      label: 'Aantal leden',
      type: 'text',
      placeholder: 'Aantal leden',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'goal1',
      label: 'Doel',
      type: 'text',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'extern',
      label: 'Extern opgehaald',
      type: 'text',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    }, {
      row: {
        hideOnStatic: true,
        col: [
          {
            md: 12,
            children: [
              {type: 'success', message: 'De gegevens zijn opgeslagen.'},
              {type: 'error', message: 'Er zijn fouten opgetreden, controleer het formulier.'}
            ]
          },
          {hideOnStatic: true, md: 12, children: [{type: 'submit', name: 'submit', value: 'opslaan'}]}
        ]
      }
    }
  ]);
}

export function fields1(id, token, categories) {

  const catOptions = () => {
    const options = [];
    if (typeof categories === 'object') {
      _.sortBy(categories, 'name').map((item) => {
        options.push({value: item.id, desc: item.name});
      });
    }
    return options;
  };


  return ([
    {
      name: 'name',
      label: 'Account / Club',
      type: 'text',
      placeholder: 'Account / Club',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'description',
      label: 'Omschrijving',
      type: 'rte',
      config: {
        plugins: 'autolink link image lists print preview',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
        entity_encoding: 'raw',
        menubar: false
      },
      placeholder: 'Omschrijving van de club',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'address',
      label: 'Adres + huisnummer',
      type: 'text',
      placeholder: 'Adres + huisnummer',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'postcode',
      label: 'Postcode',
      type: 'text',
      placeholder: 'Postcode',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {

      name: 'city',
      label: 'Plaats',
      type: 'text',
      placeholder: 'Plaats',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'telephone',
      label: 'Telefoon',
      type: 'text',
      placeholder: 'Telefoon',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {

      name: 'email',
      label: 'Email club',
      type: 'text',
      placeholder: 'Email',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'

    },
    {
      name: 'website',
      label: 'Website',
      type: 'text',
      placeholder: 'Website',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'

    },
    {

      name: 'categories',
      label: 'Categorieën',
      type: 'checkboxList',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      chunks: 3,
      options: catOptions()

    },
    {
      name: 'picture',
      label: 'Logo',
      type: 'plupload',
      placeholder: 'Bestand',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      url: '/api/dashboard/accounts/upload',
      headers: {
        Authorization: 'Bearer ' + token
      },
      multi_selection: false,
      hideOnStatic: true
    },

    {
      row: {
        hideOnStatic: true,
        col: [
          {
            md: 12,
            children: [
              {type: 'success', message: 'De gegevens zijn opgeslagen.'},
              {type: 'error', message: 'Er zijn fouten opgetreden, controleer het formulier.'}
            ]
          },
          {hideOnStatic: true, md: 12, children: [{type: 'submit', name: 'submit', value: 'volgende'}]}
        ]
      }
    }
  ]);
}

