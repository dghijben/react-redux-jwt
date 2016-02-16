import validator from 'utils/validator';

export default function validate(data) {
  const errors = {};
  if (!data.site_name || validator.isNull(data.site_name)) errors.site_name = 'Dit veld is verplicht.';
  if (!data.site_email || validator.isNull(data.site_email)) errors.site_email = 'Dit veld is verplicht.';
  if (!data.payout || validator.isNull(data.payout)) errors.payout = 'Dit veld is verplicht.';
  return errors;
}
