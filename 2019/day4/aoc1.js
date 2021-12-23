const isValid = password => {
  const passwordAsString = String(password);

  let hasEqualValues = false;
  let hasDescending = false;

  for (let index = 0; index < passwordAsString.length - 1; index++) {
    const first = parseInt(passwordAsString[index]);
    const second = parseInt(passwordAsString[index + 1]);

    if (first === second) {
      hasEqualValues = true;
    }

    if (first > second) {
      hasDescending = true;
    }
  }

  return hasEqualValues && !hasDescending;
}

// WARNING: extremely inneficent
const solution = input => {
  const [ boundStart, boundEnd ] = input;
  let password = boundStart;
  let totalValidPasswords = 0;
  while (password <= boundEnd) {
    if (isValid(password)) {
      totalValidPasswords += 1
    }
    password = password + 1;
  }

  return totalValidPasswords;
}

module.exports = solution