import * as Yup from 'yup';
import moment from 'moment';
import formFieldsModel from './fieldsModel'
import { validCardNumberRegEx, onlyAlphaCharsRegEx } from './regexes'

const {
  cardType,
  cardNumber,
  expiry,
  name,
  email
} = formFieldsModel


export default Yup.object({
  [cardType.name]: Yup.string()
    .oneOf(['Visa', 'MasterCard', 'Amex'], cardType.invalidErrorMsg)
    .required(`${cardType.requiredErrorMsg}`),
  [cardNumber.name]: Yup.string()
    .matches(validCardNumberRegEx, `Invalid card`)
    .when(`${cardType.name}`, {
      is: (card) => card === 'MasterCard' || card === 'Visa',
      then: Yup.string().test('len', `${cardNumber.invalidErrorMsg}`, val => {
        if (val) {
          return val.length === 19
        }
        return false
      })
    })
    .when(`${cardType.name}`, {
      is: 'Amex',
      then: Yup.string().test('len', `${cardNumber.invalidErrorMsgAmex}`, val => {
        if (val) {
          return val.length === 18
        }
        return false
      })
    })
    .required(cardNumber.requiredErrorMsg),
  [expiry.name]: Yup.string()
    .required(`${expiry.requiredErrorMsg}`)
    .test('expDate', expiry.invalidErrorMsg, val => {
      if (val) {
        const startDate = new Date();
        const endDate = new Date(2050, 12, 31);
        if (moment(val, moment.ISO_8601).isValid()) {
          return moment(val).isBetween(startDate, endDate);
        }
        return false;
      }
      return false;
    }),
  [name.name]: Yup.string()
    .matches(onlyAlphaCharsRegEx, name.invalidErrorMsgAlphabetic)
    .max(50, name.invalidErrorMsgMax)
    .required(name.requiredErrorMsg),
  [email.name]: Yup.string()
    .email(email.invalidErrorMsg)
    .notRequired()
})