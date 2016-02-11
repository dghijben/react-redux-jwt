import validator from 'utils/validator';

export default function validate(data) {
  const errors = {};
  if (validator.isNull(data.email)) errors.email = 'Dit veld is verplicht.';
  if (!validator.isEmail(data.email)) errors.email = 'Dit is geen geldig e-mailadres.';
  if (!validator.isPassword(data.password)) errors.password = 'Minimaal 6 karakters lang, getallen en letters.';
  if (!validator.isNull(data.password) &&
    !validator.isNull(data.password_confirmation) &&
    data.password !== data.password_confirmation) errors.password_confirmation = 'De wachtwoorden komen niet overeen.';

  return errors;
}
