import validator from 'utils/validator';
import iban from 'iban';
const msgMandatory = 'Dit veld is verplicht.';
const msgEmail = 'E-mailadres is niet geldig';
const msgIban = 'Iban is niet geldig';

export default function validate(data) {
  const errors = {};
  if (validator.isNull(data.name)) errors.name = msgMandatory;
  if (validator.isNull(data.description)) errors.description = msgMandatory;
  if (validator.isNull(data.address)) errors.address = msgMandatory;
  if (validator.isNull(data.postcode)) errors.postcode = msgMandatory;
  if (validator.isNull(data.city)) errors.city = msgMandatory;
  if (validator.isNull(data.telephone)) errors.telephone = msgMandatory;
  if (validator.isNull(data.email)) errors.email = msgMandatory;
  if (!validator.isEmail(data.email)) errors.email = msgEmail;
  if (validator.isNull(data.payment_bank)) errors.payment_bank = msgMandatory;
  if (validator.isNull(data.payment_account_name)) errors.payment_account_name = msgMandatory;
  if (validator.isNull(data.payment_account_number)) errors.payment_account_number = msgMandatory;
  if (!iban.isValid(data.payment_account_number)) errors.payment_account_number = msgIban;

  return errors;
}
