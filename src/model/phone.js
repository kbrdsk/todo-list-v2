export const clean = (str) => {
  let phoneRegex = /^(?:\+?1)?\s*\(?([2-9]\d{2})\)?\s*[.-]?\s*([2-9]\d{2})\s*[.-]?\s*(\d{4})\s*$/;
  let number = str.match(phoneRegex);

  let digits = str.match(/\d/g),
    letters = str.match(/[a-z]/gi),
    punctuations = str.match(/[^\w.\-()+\s]/g),
    areaCode = str.match(/\d{3}/),
    exchangeCode = str.match(/(?<=\d{3}.*)\d{3}/);

  if (!number) {
    if (punctuations) throw new Error("Punctuations not permitted");
    if (letters) throw new Error("Letters not permitted");
    if (digits.length < 10) throw new Error("Incorrect number of digits");
    if (digits.length > 11) throw new Error("More than 11 digits");
    if (digits.length === 11 && digits[0] !== "1")
      throw new Error("11 digits must start with 1");
    if (areaCode[0][0] === "0")
      throw new Error("Area code cannot start with zero");
    if (areaCode[0][0] === "1")
      throw new Error("Area code cannot start with one");
    if (exchangeCode[0][0] === "0")
      throw new Error("Exchange code cannot start with zero");
    if (exchangeCode[0][0] === "1")
      throw new Error("Exchange code cannot start with one");
  }

  return number[1] + number[2] + number[3];
};
