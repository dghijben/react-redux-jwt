import validator from 'utils/validator';

export default function validate(data) {
  const errors = {};
  if (validator.isNull(data.initials)) errors.initials = 'Dit veld is verplicht.';
  if (validator.isNull(data.firstname)) errors.firstname = 'Dit veld is verplicht.';
  if (validator.isNull(data.lastname)) errors.lastname = 'Dit veld is verplicht.';
  if (validator.isNull(data.email)) errors.email = 'Dit veld is verplicht.';
  else if (!validator.isEmail(data.email)) errors.email = 'Geen geldig e-mailadres.';

  return errors;
}
