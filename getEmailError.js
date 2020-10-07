function getEmailError(email) {
  const emailFormat = /^\w+.*@[a-zA-Z0-9][\w-]+\.[a-zA-Z]{2,}$/gm;
  const isValidEmail = emailFormat.test(email);
  if (email.length === 0) {
    return "Please enter your email address.";
  } else if (isValidEmail === false) {
    return "Please enter a valid email address.";
  } else {
    return "";
  }
}
