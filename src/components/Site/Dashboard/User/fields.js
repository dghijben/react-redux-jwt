export const reducerIndex = 'store';
export const reducerKey = 'dashboardUser';
export const reducerItem = 'item';

export function initialValues(values) {
  return Object.assign({},
    values
  );
}

export function fieldsPI() {
  return ([
    {
      name: 'initials',
      label: 'Voorletters',
      type: 'text',
      placeholder: 'Voorletters',
      labelClassName: 'input-desc'
    },
    {
      name: 'firstname',
      label: 'Voornaam',
      type: 'text',
      placeholder: 'Voornaam',
      labelClassName: 'input-desc'
    },
    {
      name: 'middlename',
      label: 'Tussenvoegsel',
      type: 'text',
      placeholder: 'Tussenvoegsel',
      labelClassName: 'input-desc'
    },
    {
      name: 'lastname',
      label: 'Achternaam',
      type: 'text',
      placeholder: 'Achternaam',
      labelClassName: 'input-desc'
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'text',
      placeholder: 'E-mail',
      labelClassName: 'input-desc'
    },
    {
      row: {
        hideOnStatic: true,
        col: [

          {
            md: 12,
            children: [
              {type: 'error', message: 'Er zijn fouten opgetreden, controleer het formulier.'}
            ]
          },
          {hideOnStatic: true, md: 12, children: [{type: 'submit', name: 'submit', value: 'wijzigen opslaan'}]}
        ]
      },

    }
  ]);
}
