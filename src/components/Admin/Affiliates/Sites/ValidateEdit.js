import validator from 'utils/validator';

export default function validate(data) {
  const errors = {};
  if (validator.isNull(data.name)) errors.name = 'Dit veld is verplicht.';
  if (validator.isNull(data.description)) errors.description = 'Dit veld is verplicht.';
  if (validator.isNull(data.url_site)) errors.url_site = 'Dit veld is verplicht.';
  if (!validator.isURL(data.url_site)) errors.url_site = 'Dit is geen geldige website url';
  if (validator.isNull(data.url_affiliate)) errors.url_affiliate = 'Dit veld is verplicht.';
  if (!validator.isURL(data.url_affiliate)) errors.url_affiliate = 'Dit is geen geldige website url';
  return errors;
}
