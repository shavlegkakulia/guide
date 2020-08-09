export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Min 8 character';
  }
  else if (values.password.length > 16) {
    errors.password = 'Max 16 character';
  }
  else if (!/\d/.test(values.password)) {
    errors.password = 'The password must contain at least one digit';
  }
  else if (values.password.charAt(0) <= '9' && values.password.charAt(0) >= '0') {
    errors.password = 'The first character should not be a number';
  }
  return errors;
};