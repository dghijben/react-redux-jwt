import validator from 'utils/validator';
const msgMandatory = 'Dit veld is verplicht.';
import iban from 'iban';
const msgIban = 'Iban is niet geldig';
const msgTelephone = 'Dit is geen geldig telefoonnummer formaat.';

export default function validate(data) {
  const errors = {};
  if (validator.isNull(data.name)) errors.name = msgMandatory;
  if (validator.isNull(data.description)) errors.description = msgMandatory;
  if (validator.isNull(data.address)) errors.address = msgMandatory;
  if (validator.isNull(data.postcode)) errors.postcode = msgMandatory;
  if (!validator.isNull(data.telephone) && !validator.isPhoneNumber(data.telephone)) errors.telephone = msgTelephone;
  if (validator.isNull(data.city)) errors.city = msgMandatory;
  return errors;
}

export function validateBank(data) {
  const errors = {};
  if (validator.isNull(data.payment_bank)) errors.payment_bank = msgMandatory;
  if (validator.isNull(data.payment_account_name)) errors.payment_account_name = msgMandatory;
  if (validator.isNull(data.payment_account_number)) errors.payment_account_number = msgMandatory;
  if (!iban.isValid(data.payment_account_number)) errors.payment_account_number = msgIban;
  return errors;
}

export function validateExtra(data) {
  const errors = {};
  if (validator.isNull(data.members)) errors.members = msgMandatory;
  return errors;
}
