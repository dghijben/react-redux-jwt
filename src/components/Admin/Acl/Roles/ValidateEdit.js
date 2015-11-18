import validator from 'utils/validator';

export default function validate(data) {
  const errors = {};
  if (validator.isNull(data.role)) errors.initials = 'Dit veld is verplicht.';
  if (validator.isNull(data.desc)) errors.initials = 'Dit veld is verplicht.';
  return errors;
}
