import validator from '../../../../utils/validator';

export default function validateLogin(data) {
  const errors = {};

  if (validator.isNull(data.email)) errors.email = 'Dit veld is verplicht.';
  else if (!validator.isEmail(data.email)) errors.email = 'Geen geldig e-mailadres.';

  return errors;
}
