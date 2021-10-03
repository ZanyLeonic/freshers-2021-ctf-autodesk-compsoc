const codeRegex = /CSCTFFLAG\[([0-9a-f]{8})\]/g;
const VALID_SERIAL = 1552976231;

function verifyCode(flag) {
  const match = codeRegex.exec(flag);
  if (!match) return false;
  const hex = match[1];
  let output = 0;
  for (let i = 0; i < hex.length; i++) {
    const char = hex[i];
    let value = parseInt(char, 16);
    output <<= 4;
    output |= value;
  }
  output = ~output
  output ^= 32188132
  return output === VALID_SERIAL;
}

function reverseCode(serial) {
  let input = 32188132;

  input ^= serial;
  input = ~input;
  
  let a = new Number(input & 0xffff).toString(16);
  let b = new Number((input >> 16 ) & 0xffff).toString(16);

  return (b + a);
}

let code = reverseCode(VALID_SERIAL);

console.log("Got code \"" + code + "\" from serial \"" + VALID_SERIAL + "\".");
console.log("Code valid? " + verifyCode("CSCTFFLAG["+ code +"]"));