// import _ from 'lodash';

export default function fields(readOnly = false) {
  const fieldType = ( readOnly === true ? 'static' : null );

  return ([
    {name: 'name', label: 'Naam', type: fieldType || 'text', placeholder: 'Voorletters', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
    {name: 'description', label: 'Omschrijving', type: 'static', placeholder: 'Voornamen', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
    {name: 'url_site', label: 'Url Site', type: fieldType || 'text', placeholder: 'Tussenvoegsel', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
    {name: 'url_affiliate', label: 'Url affiliate', type: fieldType || 'text', placeholder: 'Achternaam', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
    {name: 'active', label: 'Actief', type: fieldType || 'checkbox', placeholder: 'E-mail', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
  ]);
}

export function fieldsShow(id, token, edit, remove) {

  return fields(true).concat([
    {
      row: {
        col: [
          {md: 9, mdOffset: 3, children: [
            {type: 'button', name: 'edit', value: 'wijzigen x', onClick: edit},
            {type: 'button', name: 'remove', bsStyle: 'danger', value: 'verwijderen', onClick: remove}
          ]}
        ]
      }
    }
  ]);
}
