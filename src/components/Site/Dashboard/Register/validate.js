import validator from 'utils/validator';
const msgMandatory = 'Dit veld is verplicht.';
import iban from 'iban';
const msgIban = 'Iban is niet geldig';
const msgTelephone = 'Dit is geen geldig telefoonnummer formaat.';
const msgNumeric = 'Alleen een cijfers';

export default function validate(data) {
  const errors = {};
  if (validator.isNull(data.name)) errors.name = msgMandatory;
  if (validator.isNull(data.description)) errors.description = msgMandatory;
  if (validator.isNull(data.address)) errors.address = msgMandatory;
  if (validator.isNull(data.postcode)) errors.postcode = msgMandatory;
  if (!validator.isEmail(data.email)) errors.email = msgMandatory;
  if (!validator.isPhoneNumber(data.telephone)) errors.telephone = msgTelephone;
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
  if (validator.isNull(data.voorwaarden) || data.voorwaarden === false) errors.voorwaarden = 'U moet de voorwaarden accepteren.';
  if (validator.isNull(data.members)) errors.members = msgMandatory;
  if (!validator.isNull(data.goal1) && !validator.isNumeric(data.goal1)) errors.goal1 = msgNumeric;
  if (!validator.isNull(data.goal2) && !validator.isNumeric(data.goal2)) errors.goal2 = msgNumeric;
  return errors;
}

export function validatePI(data) {
  const errors = {};
  if (validator.isNull(data.initials)) errors.initials = msgMandatory;
  if (validator.isNull(data.firstname)) errors.firstname = msgMandatory;
  if (validator.isNull(data.lastname)) errors.lastname = msgMandatory;
  return errors;
}
