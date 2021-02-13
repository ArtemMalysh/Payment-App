const required = (fieldName) => fieldName + ' is required'
const notValid = (fieldName) => fieldName + ' is not valid'

export default {
  cardType: {
    name: 'cardType',
    label: 'Card Type*',
    requiredErrorMsg: required('Card Type'),
    invalidErrorMsg: notValid('Card Type')
  },
  cardNumber: {
    name: 'cardNumber',
    label: 'Card number*',
    requiredErrorMsg: required('Card Number'),
    invalidErrorMsg: notValid('Card Number'),
    invalidErrorMsgAmex: 'Amex card number is not valid (has to be 15 digits)'
  },
  expiry: {
    name: 'expiry',
    label: 'Expiry*',
    requiredErrorMsg: required('Expiry date'),
    invalidErrorMsg: notValid('Expiry date')
  },
  name: {
    name: 'name',
    label: 'Name*',
    requiredErrorMsg: required('Name'),
    invalidErrorMsgMax: 'Maximum 50 characters',
    invalidErrorMsgAlphabetic: 'Only alpa characters allowed'
  },
  email: {
    name: 'email',
    label: 'Email',
    invalidErrorMsg: notValid('Email')
  }
};