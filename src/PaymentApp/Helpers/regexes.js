export const onlyAlphaCharsRegEx = /^[aA-zZ\s]+$/
export const notNumbersRegEx = /\D/g
export const groupOfFourRegEx = /.{1,4}/g

export const validCardNumberRegEx = /\b(?:(?:\d[ -]*?){17,}|((?:\d[ -]*?){13,16}))\b/
export const masterCardRegEx = /^5[1-5][0-9]{14}$/
export const visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/
export const amexRegEx = /^3[47][0-9]{13}$/