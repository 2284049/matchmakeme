$("#show-not-interested").click(function () {
  $("#not-interested-button").removeClass("d-none");
});

$("#sign-up-button").click(function () {
  const emailInput = $("#email-sign-up-input").val();
  const email = emailInput.trim().toLowerCase();
  const password = $("#password-sign-up-input").val();

  const emailError = getEmailError(email); // emailError = whatever return it gets when it executes that function
  console.log(emailError);
  if (emailError !== "") {
    showError("#email-sign-up", emailError);
  } else {
    hideError("#email-sign-up", emailError);
  }

  const passwordError = getPasswordError(email, password); // passwordError = whatever return it gets when it executes that function
  console.log(passwordError);
  if (passwordError !== "") {
    showError("#password-sign-up", passwordError);
  } else {
    hideError("#password-sign-up", passwordError);
  }

  console.log(`User inputted email: ${email}`);
  console.log(`User inputted password: ${password}`);

  const createdAt = getCreatedAt();
  console.log(`Created at: ${createdAt}`);

  const id = createRandomID();
  console.log(`The random user ID is: ${id}`);

  const user = {
    email: email,
    password: password,
    createdAt: createdAt,
    id: id,
    emailTld: getTld(email),
    socialProfiles: [
      {
        site: "facebook",
        siteId: "530c2716-36e2-4a80-93b7-0e8483d629e1",
        username: "",
        image: {
          sm: "",
          orig: "",
        },
      },
      {
        site: "twitter",
        siteId: "79023b4d-57a2-406b-8efe-bda47fb1696c",
        username: "",
        image: {
          sm: "",
          md: "",
          orig: "",
        },
      },
    ],
  };

  activeUser = makeDeepCopySafely(user);
  if (activeUser !== undefined) {
    activeUser.isActive = true;
    activeUser.createdAt = Date.now();
    delete activeUser.socialProfiles[0].image["sm"];
    delete activeUser.socialProfiles[1].image["sm"];
    delete activeUser.socialProfiles[1].image["md"];
  }

  const users = [user, activeUser];
  const currentUsers = users
    .map((user) => {
      const currentUser = {
        id: user.id,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        isActive: getIsActive(user),
      };
      return currentUser;
    })
    .filter((user) => {
      return user.isActive === true;
    });

  const currentUser = currentUsers[0];
  if (passwordError === "" && emailError === "") {
    window.location.href = "http://wet-grain.surge.sh/questionnaire.html";
    console.log(`The current user is: `, currentUser);
  }
});

function getIsActive(user) {
  if (user.hasOwnProperty("isActive")) {
    return user.isActive;
  } else {
    return false;
  }
}

function makeDeepCopySafely(obj) {
  const str = JSON.stringify(obj);
  return safelyParseJson(str);
}
function safelyParseJson(str) {
  try {
    JSON.parse(str);
  } catch {
    return str;
  }
  return JSON.parse(str);
}

function getTld(email) {
  return email.slice(email.lastIndexOf(".") + 1);
}

function createRandomID() {
  let today = new Date(Date.now());
  const milliseconds = String(today.getMilliseconds());
  const paddedMS = milliseconds.padStart(3, "0");
  const randomNum = String(getRandomInt(0, 999));
  const paddedRandomNum = randomNum.padStart(3, "0");
  const randomID = paddedRandomNum + paddedMS;
  console.log(`The padded random number for the id is: ${paddedRandomNum}`);
  console.log(`The padded milliseconds for the id is: ${paddedMS}`);
  return randomID;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getCreatedAt() {
  let today = new Date(Date.now());
  // to test other days:
  //today = new Date(2020, 6, 2);
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const yearPart = String(year);
  const monthPart = String(month + 1);
  const dayPart = String(day);
  const paddedMonth = padLeft(monthPart);
  const paddedDay = padLeft(dayPart);
  const createdAt = yearPart + paddedMonth + paddedDay;
  return Number(createdAt);
}

function padLeft(datePart) {
  if (datePart.length < 2) {
    return "0" + datePart;
  } else {
    return datePart;
  }
}

function showError(element, errorMessage) {
  $(`${element}-input`).addClass("is-invalid");
  $(`${element}-error`).html(errorMessage);
}

function hideError(element, errorMessage) {
  $(`${element}-input`).removeClass("is-invalid");
  $(`${element}-error`).html(errorMessage);
}

function showHiddenElement(id) {
  $(id).removeClass("d-none");
}

function hideElement(id) {
  $(id).addClass("d-none");
}

function styleCardCreationValidation(
  inputname,
  inputcharsid,
  inputcharactercountid,
  buttonid
) {
  if (inputname.length <= maxChar && inputname.length > 0) {
    $(buttonid).removeAttr("disabled");
    $(inputcharsid).removeClass("text-danger");
    $(inputcharsid).addClass("text-muted");
  } else if (inputname.length > maxChar) {
    $(buttonid).attr("disabled", "disabled");
    $(inputcharsid).removeClass("text-muted");
    $(inputcharsid).addClass("text-danger");
  } else if (inputname.length === 0) {
    $(buttonid).attr("disabled", "disabled");
    $(inputcharsid).removeClass("text-danger");
    $(inputcharsid).addClass("text-muted");
  }
  $(inputcharactercountid).html(inputname.length);
}

function checkIsOver(input, num, charactercount) {
  if (input.length > num) {
    $(charactercount).addClass("text-danger");
  } else {
    $(charactercount).removeClass("text-danger");
  }
}

function updateCharCount(id, input) {
  $(id).html(input.length);
}

function showOverlay(id) {
  $(id).toggleClass("d-flex d-none");
}
