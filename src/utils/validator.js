const validator = require('validator');
validator.extend('isPassword', (str) => {
  const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(str);
});

validator.extend('isPhoneNumber', (str) => {
  const re = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/;
  return re.test(str);
});

export default validator;
