import validator from 'utils/validator';

export default function validate(data) {
  const errors = {};
  if (validator.isNull(data.name)) errors.name = 'Dit veld is verplicht.';
  if (validator.isNull(data.description)) errors.description = 'Dit veld is verplicht.';
  if (validator.isNull(data.start)) errors.start = 'Dit veld is verplicht.';
  if (validator.isNull(data.end)) errors.end = 'Dit veld is verplicht.';
  return errors;
}
