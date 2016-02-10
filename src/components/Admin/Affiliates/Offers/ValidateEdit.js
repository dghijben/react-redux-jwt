import validator from 'utils/validator';

export default function validate(data) {
  const errors = {};
  if (!data.name || validator.isNull(data.name)) errors.name = 'Dit veld is verplicht.';
  if (!data.description || validator.isNull(data.description)) errors.description = 'Dit veld is verplicht.';
  if (!data.start || validator.isNull(data.start)) errors.start = 'Dit veld is verplicht.';
  if (!data.end || validator.isNull(data.end)) errors.end = 'Dit veld is verplicht.';
  if (data.url && !validator.isURL(data.url)) errors.url = 'Dit is geen geldige URL.';
  return errors;
}
