import validator from 'utils/validator';

export default function validate(data) {
  const errors = {};
  if (!data.type || validator.isNull(data.type)) errors.type = 'Dit veld is verplicht.';
  if (!data.menu_title || validator.isNull(data.menu_title)) errors.menu_title = 'Dit veld is verplicht.';
  if (!data.page_title || validator.isNull(data.page_title)) errors.page_title = 'Dit veld is verplicht.';
  if (!data.html || validator.isNull(data.html)) errors.html = 'Dit veld is verplicht.';
  return errors;
}
