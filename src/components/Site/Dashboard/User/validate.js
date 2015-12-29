import validator from 'utils/validator';
const msgMandatory = 'Dit veld is verplicht.';

export default function validate(data) {

  const errors = {};
  if (validator.isNull(data.initials)) errors.initials = msgMandatory;
  if (validator.isNull(data.firstname)) errors.firstname = msgMandatory;
  if (validator.isNull(data.lastname)) errors.lastname = msgMandatory;
  if (validator.isNull(data.email) || !validator.isEmail(data.email)) errors.email = msgMandatory;
  return errors;
}
