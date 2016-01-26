import validator from 'utils/validator';

export default function validate(data) {
  const errors = {};
  if (validator.isNull(data.name)) errors.name = 'Dit veld is verplicht.';
  // if (validator.isNull(data.description)) errors.description = 'Dit veld is verplicht.';
  if (validator.isNull(data.url_site)) errors.url_site = 'Dit veld is verplicht.';
  if (!validator.isURL(data.url_site)) errors.url_site = 'Dit is geen geldige website url';
  if (validator.isNull(data.url_affiliate)) errors.url_affiliate = 'Dit veld is verplicht.';
  if (!validator.isURL(data.url_affiliate)) errors.url_affiliate = 'Dit is geen geldige website url';
  if (!validator.isNull(data.cps) && !validator.isFloat(data.cps)) errors.cps = 'Dit veld mag alleen getallen bevatten';
  if (!validator.isNull(data.cpl) && !validator.isFloat(data.cpl)) errors.cpl = 'Dit veld mag alleen getallen bevatten';
  if (!validator.isNull(data.cpm) && !validator.isFloat(data.cpm)) errors.cpm = 'Dit veld mag alleen getallen bevatten';
  if (!validator.isNull(data.cpc) && !validator.isFloat(data.cpc)) errors.cpc = 'Dit veld mag alleen getallen bevatten';
  if (!validator.isNull(data.csr) && !validator.isFloat(data.csr)) errors.csr = 'Dit veld mag alleen getallen bevatten';
  if (!validator.isNull(data.ecpc) && !validator.isFloat(data.ecpc)) errors.ecpc = 'Dit veld mag alleen getallen bevatten';

  return errors;
}
