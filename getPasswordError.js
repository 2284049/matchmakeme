function getPasswordError(email, password) {
  const emailParts = email.split("@"); // ["mike", "gmail.com"]
  const localPartEmail = emailParts[0]; // "mike"
  const lowerCasedPassword = password.toLowerCase();

  const unacceptablePasswords = getAllUnacceptablePasswords(); //return a list
  console.log(unacceptablePasswords);

  const isMinNineChars = unacceptablePasswords.every((password) => {
    return password.length >= 9;
  });
  console.log(`Every password is at least 9 characters: `, isMinNineChars);

  const hasQwertyInPassword = unacceptablePasswords.some((password) => {
    return password.includes("qwerty");
  });
  console.log(`Do any passwords contain "qwerty"? `, hasQwertyInPassword);

  if (password.length === 0) {
    return "Please create a password.";
  } else if (password.length < 9) {
    return "Your password must be at least 9 characters.";
  } else if (
    lowerCasedPassword.includes(localPartEmail) &&
    localPartEmail.length >= 4
  ) {
    return "All or part of your email address cannot be used in your password.";
  } else if (unacceptablePasswords.includes(lowerCasedPassword)) {
    return `Your password contains a commonly used password, “${lowerCasedPassword}” and can be easily discovered by attackers. Please use something else.`;
  } else {
    return "";
  }
}

function getAllUnacceptablePasswords() {
  // combining mostInsecurePasswords and secondMostInsecurePasswords from their files
  const allInsecurePasswords = mostInsecurePasswords.concat(
    secondMostInsecurePasswords
  );

  const allFlatInsecurePasswords = allInsecurePasswords.flat();

  // getting rid of duplicates
  const allUniqueInsecurePasswords = [...new Set(allFlatInsecurePasswords)];

  const firstSliceOfInsecurePasswords = allUniqueInsecurePasswords.slice(
    0,
    allUniqueInsecurePasswords.indexOf("skywalker")
  );

  const secondSliceOfInsecurePasswords = allUniqueInsecurePasswords.slice(
    allUniqueInsecurePasswords.indexOf("1010101010"),
    allUniqueInsecurePasswords.indexOf("obama2016")
  );

  const thirdSliceOfInsecurePasswords = allUniqueInsecurePasswords.slice(
    allUniqueInsecurePasswords.indexOf("mypassword")
  );

  const unacceptablePasswordsWithBooleans = firstSliceOfInsecurePasswords.concat(
    secondSliceOfInsecurePasswords,
    thirdSliceOfInsecurePasswords
  );

  // let unacceptablePasswordStrings = [];
  // for (let i = 0; i < unacceptablePasswordsWithBooleans.length; i++) {
  //    const value = unacceptablePasswordsWithBooleans[i];
  //    // remove the booleans and keep numbers and strings:
  //    if (typeof value === "number" || typeof value === "string") {
  //       // convert numbers to strings:
  //       unacceptablePasswordStrings = unacceptablePasswordStrings.concat(
  //          String(value)
  //       );
  //    }
  // }
  let unacceptablePasswordStrings = [];
  unacceptablePasswordsWithBooleans.forEach((password) => {
    if (typeof password === "number" || typeof password === "string") {
      unacceptablePasswordStrings = unacceptablePasswordStrings.concat(
        String(password)
      );
    }
  });
  // console.log(
  //    `Unacceptable password strings without booleans: `,
  //    unacceptablePasswordStrings
  // );

  // let unacceptableReversedPasswords = [];
  // for (let i = 0; i < unacceptablePasswordStrings.length; i++) {
  //    const unaccPassStr = unacceptablePasswordStrings[i];
  //    const unaccPassStrChars = unaccPassStr.split("");
  //    const copyOfUnaccPassChars = [...unaccPassStrChars];
  //    const reverseUnaccPassChars = copyOfUnaccPassChars.reverse();
  //    const newUnaccPassStr = reverseUnaccPassChars.join("");
  //    unacceptableReversedPasswords = unacceptableReversedPasswords.concat(
  //       newUnaccPassStr
  //    );
  // }

  let unacceptableReversedPasswords = [];
  unacceptablePasswordStrings.forEach((password) => {
    unacceptableReversedPassword = toReverse(password);
    unacceptableReversedPasswords = unacceptableReversedPasswords.concat(
      unacceptableReversedPassword
    );
  });

  const unaccStrAndReversedPasswords = [
    ...unacceptablePasswordStrings,
    ...unacceptableReversedPasswords,
  ];

  let lowerCasedUnaccPasswords = [];
  unaccStrAndReversedPasswords.forEach((password) => {
    const lowerCasedUnaccPass = password.toLowerCase();
    lowerCasedUnaccPasswords = lowerCasedUnaccPasswords.concat(
      lowerCasedUnaccPass
    );
  });

  const combinedUnacceptablePasswords = [
    ...moreInsecurePasswords,
    ...lowerCasedUnaccPasswords,
  ];

  const nineCharUnaccPasswords = combinedUnacceptablePasswords.filter(
    (password) => {
      return password.length >= 9;
    }
  );
  console.log(
    `Here are unacceptable passwords 9 characters or longer: `,
    nineCharUnaccPasswords
  );

  //    const allUnacceptablePasswords = [...new Set(combinedUnacceptablePasswords)];
  //    return allUnacceptablePasswords;

  let allUnacceptablePasswords = [];
  nineCharUnaccPasswords.forEach((password) => {
    if (allUnacceptablePasswords.includes(password) === false) {
      allUnacceptablePasswords = allUnacceptablePasswords.concat(password);
    }
  });
  return allUnacceptablePasswords;
}

function toReverse(str) {
  if (str === "") {
    throw Error("String cannot be empty.");
  }
  try {
    const chars = str.split(""); // returns ["H", "e", "l", "l", "o"]
    const copyOfChars = [...chars]; // returns ["H", "e", "l", "l", "o"]
    const reversedChars = copyOfChars.reverse(); // returns ["o", "l", "l", "e", "H"]
    const reversedStr = reversedChars.join(""); // returns [olleH]
    return reversedStr;
  } catch {
    return "Error: there is a problem with toReverse().";
  }
}
