import validator from 'utils/validator';
const msgMandatory = 'Dit veld is verplicht.';
import iban from 'iban';
const msgIban = 'Iban is niet geldig';
const msgTelephone = 'Dit is geen geldig telefoonnummer formaat.';
const msgNumeric = 'Alleen een cijfers';

export default function validate(data) {
  const errors = {};
  if (!data.name || validator.isNull(data.name)) errors.name = msgMandatory;
  if (!data.description || validator.isNull(data.description)) errors.description = msgMandatory;
  if (!data.address || validator.isNull(data.address)) errors.address = msgMandatory;
  if (!data.postcode || validator.isNull(data.postcode)) errors.postcode = msgMandatory;
  if (!data.email || !validator.isEmail(data.email)) errors.email = msgMandatory;
  if (!data.telephone || !validator.isPhoneNumber(data.telephone)) errors.telephone = msgTelephone;
  if (!data.city || validator.isNull(data.city)) errors.city = msgMandatory;
  return errors;
}

export function validateBank(data) {
  const errors = {};
  if (!data.payment_bank || validator.isNull(data.payment_bank)) errors.payment_bank = msgMandatory;
  if (!data.payment_account_name || validator.isNull(data.payment_account_name)) errors.payment_account_name = msgMandatory;
  if (!data.payment_account_number || validator.isNull(data.payment_account_number)) errors.payment_account_number = msgMandatory;
  if (!data.payment_account_number || !iban.isValid(data.payment_account_number)) errors.payment_account_number = msgIban;
  return errors;
}

export function validateExtra(data) {
  const errors = {};
  if (!data.members || validator.isNull(data.members)) errors.members = msgMandatory;
  if (!data.goal1 || !validator.isNull(data.goal1) && !validator.isNumeric(data.goal1)) errors.goal1 = msgNumeric;
  if (data.extern && !validator.isNumeric(data.extern)) errors.extern = msgNumeric;
  return errors;
}

export function validatePI(data) {
  const errors = {};
  if (!data.initials || validator.isNull(data.initials)) errors.initials = msgMandatory;
  if (!data.firstname || validator.isNull(data.firstname)) errors.firstname = msgMandatory;
  if (!data.lastname || validator.isNull(data.lastname)) errors.lastname = msgMandatory;
  return errors;
}
