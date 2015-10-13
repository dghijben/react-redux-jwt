import validator from '../../../utils/validator';

export default function validateLogin(data) {
  const errors = {};

  if (validator.isNull(data.email)) errors.email = 'Dit veld is verplicht.';
  else if (!validator.isEmail(data.email)) errors.email = 'Geen geldig e-mailadres.';

  if (validator.isNull(data.password)) errors.password = 'Dit veld is verplicht.';
  else if (!validator.isPassword(data.password)) errors.password = 'Geen geldig wachtwoord.';

  return errors;
}
