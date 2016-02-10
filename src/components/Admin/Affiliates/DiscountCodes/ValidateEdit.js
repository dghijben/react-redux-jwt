import validator from 'utils/validator';

export default function validate(data) {
  const errors = {};
  if (validator.isNull(data.name)) errors.name = 'Dit veld is verplicht.';
  if (validator.isNull(data.description)) errors.description = 'Dit veld is verplicht.';
  if (validator.isNull(data.discount_code)) errors.discount_code = 'Dit veld is verplicht.';
  if (validator.isNull(data.discount)) errors.discount = 'Dit veld is verplicht.';
  if (validator.isNull(data.discount_type)) errors.discount = 'U heeft nog geen eenheid gekozen';
  if (validator.isNull(data.start)) errors.start = 'Dit veld is verplicht.';
  if (validator.isNull(data.end)) errors.end = 'Dit veld is verplicht.';
  if (data.url && !validator.isURL(data.url)) errors.url = 'Dit is geen geldige URL.';
  return errors;
}
