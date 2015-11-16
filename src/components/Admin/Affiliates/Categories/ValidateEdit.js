import validator from 'utils/validator';

export default function validate(data) {
  const errors = {};
  if (validator.isNull(data.name)) errors.name = 'Dit veld is verplicht.';
  return errors;
}
