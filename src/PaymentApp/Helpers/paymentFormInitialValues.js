import formFieldsModel from './fieldsModel'

const {
    cardType,
    cardNumber,
    expiry,
    name,
    email
} = formFieldsModel

export default {
    [cardType.name]: '',
    [cardNumber.name]: '',
    [expiry.name]: '',
    [name.name]: '',
    [email.name]: ''
}