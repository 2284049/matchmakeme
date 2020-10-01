function getEmailError(email) {
   if (email.length === 0) {
      return "Please enter your email address.";
   } else {
      return "";
   }
}
