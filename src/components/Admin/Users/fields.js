export default function fields(userId, token) {
  return ([

    {
      name: 'picture',
      label: 'Foto',
      type: 'plupload',
      placeholder: 'Bestand',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      url: '/api/admin/users/' + userId + '/upload',
      headers: {
        Authorization: 'Bearer ' + token
      },
      multi_selection: false,
    },

    {
      name: 'initials',
      label: 'Voorletters',
      type: 'text',
      placeholder: 'Voorletters',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'firstname',
      label: 'Voornamen',
      type: 'text',
      placeholder: 'Voornamen',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'middlename',
      label: 'Tussenvoegsel',
      type: 'text',
      placeholder: 'Tussenvoegsel',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'lastname',
      label: 'Achternaam',
      type: 'text',
      placeholder: 'Achternaam',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'text',
      placeholder: 'E-mail',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      row: {
        col: [
          {
            md: 10, mdOffset: 2, children: [
            {type: 'success', message: 'Het formulier is opgeslagen'},
            {type: 'error', message: 'Er zijn fouten opgetreden, controleer het formulier.'}
            ]
          },
          {md: 10, mdOffset: 2, children: [{type: 'submit', name: 'submit', value: 'versturen'}]}
        ]
      }
    }
  ]);
}
