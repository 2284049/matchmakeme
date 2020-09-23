$("#sign-up-button").click(function () {
  const email = $("#email-sign-up").val();
  console.log(`The user inputted: ${email}`);
  const trimmedAndLowerCasedEmail = email.trim().toLowerCase();
  console.log(
    `The user's trimmed and lower cased email address: ${trimmedAndLowerCasedEmail}`
  );

  if (email.length === 0) {
    $("#email-sign-up").addClass("is-invalid");
    $("#enter-email-error").removeClass("d-none");
  } else if (email.length > 0) {
    $("#email-sign-up").removeClass("is-invalid");
    $("#email-sign-up").addClass("is-valid");
    $("#enter-email-error").addClass("d-none");
  }

  // ONE WAY TO SEPARATE LOCAL PART OF EMAIL
  // USING DELIMITER & SLICE METHOD
  // const delimiter = "@";
  // const indexOfEmailAtDelimiter = trimmedAndLowerCasedEmail.indexOf(delimiter);
  // const localPartEmail = trimmedAndLowerCasedEmail.slice(0, indexOfEmailAtDelimiter);
  // console.log(
  //    `This is the user inputted local part of email: ${localPartEmail}`
  // );
  // const localPartEmailLength = localPartEmail.length;
  // console.log(`The lenght of the local part of the inputted email is: `, localPartEmailLength);

  // SECOND WAY TO SEPARATE LOCAL PART OF EMAIL
  // USING SPLIT METHOD
  const emailParts = trimmedAndLowerCasedEmail.split("@");
  console.log(`Here is the lower cased email in parts: `, emailParts);
  const localPartEmail = emailParts[0];
  console.log(`Here is the local part of the email: `, localPartEmail);

  const password = $("#password-sign-up").val();
  console.log(`The user inputted: ${password}`);

  // combining mostInsecurePasswords and secondMostInsecurePasswords
  const allInsecurePasswords = mostInsecurePasswords.concat(
    secondMostInsecurePasswords
  );
  console.log(`Entire list of insecure passwords:\n`, allInsecurePasswords);

  const allFlatInsecurePasswords = allInsecurePasswords.flat();
  console.log(
    `Here's a list of all flat insecure passwords:\n `,
    allFlatInsecurePasswords
  );

  // getting rid of duplicates
  const allUniqueInsecurePasswords = [...new Set(allFlatInsecurePasswords)];
  console.log(
    `Here's a list of all unique insecure passwords:\n `,
    allUniqueInsecurePasswords
  );

  const firstSliceOfInsecurePasswords = allUniqueInsecurePasswords.slice(
    0,
    allUniqueInsecurePasswords.indexOf("skywalker")
  );
  console.log(
    `Here is the first slice of unacceptable passwords:\n `,
    firstSliceOfInsecurePasswords
  );
  const secondSliceOfInsecurePasswords = allUniqueInsecurePasswords.slice(
    allUniqueInsecurePasswords.indexOf("1010101010"),
    allUniqueInsecurePasswords.indexOf("obama2016")
  );
  console.log(
    `Here is the second slice of unacceptable passwords:\n `,
    secondSliceOfInsecurePasswords
  );
  const thirdSliceOfInsecurePasswords = allUniqueInsecurePasswords.slice(
    allUniqueInsecurePasswords.indexOf("mypassword")
  );
  console.log(
    `Here is the third slice of unacceptable passwords:\n `,
    thirdSliceOfInsecurePasswords
  );

  const unacceptablePasswordsWithBooleans = firstSliceOfInsecurePasswords.concat(
    secondSliceOfInsecurePasswords,
    thirdSliceOfInsecurePasswords
  );
  console.log(
    `At long last, here is the list of unacceptable passwords with Booleans and numbers:\n`,
    unacceptablePasswordsWithBooleans
  );

  let unacceptablePasswordStrings = [];
  for (let i = 0; i < unacceptablePasswordsWithBooleans.length; i++) {
    const value = unacceptablePasswordsWithBooleans[i];
    // remove the booleans and keep numbers and strings:
    if (typeof value === "number" || typeof value === "string") {
      // convert numbers to strings:
      unacceptablePasswordStrings = unacceptablePasswordStrings.concat(
        String(value)
      );
    }
  }
  console.log(
    `Here is a list of unacceptable password strings: `,
    unacceptablePasswordStrings
  );

  let unacceptableReversedPasswords = [];
  for (let i = 0; i < unacceptablePasswordStrings.length; i++) {
    const unaccPassStr = unacceptablePasswordStrings[i];
    const unaccPassStrChars = unaccPassStr.split("");
    const copyOfUnaccPassChars = [...unaccPassStrChars];
    const reverseUnaccPassChars = copyOfUnaccPassChars.reverse();
    const newUnaccPassStr = reverseUnaccPassChars.join("");
    unacceptableReversedPasswords = unacceptableReversedPasswords.concat(
      newUnaccPassStr
    );
  }
  console.log(
    `Here are the reversed passwords: `,
    unacceptableReversedPasswords
  );

  const unaccStrAndReversedPasswords = [
    ...unacceptablePasswordStrings,
    ...unacceptableReversedPasswords,
  ];
  console.log(
    `Here are all the unacceptable password strings and reversed strings: `,
    unaccStrAndReversedPasswords
  );

  let lowerCasedUnaccPasswords = [];
  for (let i = 0; i < unaccStrAndReversedPasswords.length; i++) {
    const unacceptablePassword = unaccStrAndReversedPasswords[i];
    const lowerCasedUnaccPass = unacceptablePassword.toLowerCase();
    lowerCasedUnaccPasswords = lowerCasedUnaccPasswords.concat(
      lowerCasedUnaccPass
    );
  }
  console.log(
    `Here are the lower cased unacceptable passwords: `,
    lowerCasedUnaccPasswords
  );

  const unacceptablePasswords = [...new Set(lowerCasedUnaccPasswords)];
  console.log(
    `Here's a list of all unique, reversed, lower cased passwords:\n `,
    unacceptablePasswords
  );

  if (password.length === 0) {
    $("#password-sign-up").addClass("is-invalid");
    $("#password-error").removeClass("d-none");
    $("#password-error").html("Please create a password.");
  } else if (password.length < 9 && password.length > 0) {
    $("#password-sign-up").addClass("is-invalid");
    $("#password-error").removeClass("d-none");
    $("#password-error").html("Your password must be at least 9 characters.");
  } else if (
    password.toLowerCase().includes(localPartEmail) &&
    localPartEmail.length >= 4
  ) {
    $("#password-sign-up").addClass("is-invalid");
    $("#password-error").removeClass("d-none");
    $("#password-error").html(
      "All or part of your email address cannot be used in your password."
    );
  } else if (unacceptablePasswords.includes(password.toLowerCase())) {
    $("#password-sign-up").addClass("is-invalid");
    $("#password-error").removeClass("d-none");
    $("#password-error").html(
      `Your password contains a commonly used password, “${password.toLowerCase()}” and can be easily discovered by attackers. Please use something else.`
    );
  } else {
    $("#password-sign-up").removeClass("is-invalid");
    $("#password-sign-up").addClass("is-valid");
    $("#password-error").addClass("d-none");
    $("#password-error").html("");
  }

  let today = new Date(Date.now());
  // to test other days:
  //today = new Date(2020, 6, 2);
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const hour = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const milliseconds = today.getMilliseconds();

  const yearPart = String(year);

  const monthPart = String(month + 1);
  let paddedMonth = monthPart;
  if (monthPart.length < 2) {
    paddedMonth = "0" + monthPart;
  }

  const dayPart = String(day);
  let paddedDay = dayPart;
  if (dayPart.length < 2) {
    paddedDay = "0" + dayPart;
  }
  const createdAt = yearPart + paddedMonth + paddedDay;
  console.log(`Created at: ${createdAt}`);
});
