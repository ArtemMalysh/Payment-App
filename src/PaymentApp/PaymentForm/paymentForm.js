import React from "react"
import axios from "axios"
import { Formik, Form } from "formik"
import { Paper, Button } from "@material-ui/core"
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { visaRegEx, masterCardRegEx, amexRegEx } from '../Helpers/regexes'
import './paymentForm.css'

import FormFields from "./FormFields/formFields"

import yupValidationSchema from "../Helpers/yupValidationSchema"
import formFieldsModel from "../Helpers/fieldsModel"
import initialValues from "../Helpers/paymentFormInitialValues"

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const theme = responsiveFontSizes(darkTheme);

export default function PaymentForm({ setPaymentInvoice }) {

  function handleSubmit(values) {

    const makePureQuery = (query) => {
      const enteredCardNumber = query.cardNumber
      const pureCardNumber = enteredCardNumber.split('-').join('')
      return { ...query, cardNumber: pureCardNumber }
    }

    const pureQuery = makePureQuery(values)
    const { cardType, cardNumber } = pureQuery

    switch (cardType) {
      case ('Visa'): {
        getPaymentInfo(visaRegEx)
        break
      }
      case ('MasterCard'): {
        getPaymentInfo(masterCardRegEx)
        break
      }
      case ('Amex'): {
        getPaymentInfo(amexRegEx)
        break
      }
    }

    function getPaymentInfo(cardRegEx) {
      if ((cardNumber).match(cardRegEx)) {
        axios.post('http://www.mocky.io/v2/5d8de422310000b19d2b517a', pureQuery).then(({ data }) => {
          setPaymentInvoice({ success: data })
        }).catch(({ response: { data } }) => {
          setPaymentInvoice({ fail: data })
        })
      } else {
        axios.post('http://www.mocky.io/v2/5d8de441310000a2612b517c', pureQuery).then(({ data }) => {
          setPaymentInvoice({ succes: data })
        }).catch(({ response: { data } }) => {
          setPaymentInvoice({ fail: data })
        })
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper className="form">
        <Formik
          initialValues={initialValues}
          validationSchema={yupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, isValid, dirty, setFieldValue }) => (
            <Form>
              <FormFields setFieldValue={setFieldValue} handleChange={handleChange} formField={formFieldsModel} />

              <div className="button-wrapper">
                <Button
                  disabled={!dirty || !isValid}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="submit-button"
                >
                  Submit payment
              </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </ThemeProvider>
  );
}