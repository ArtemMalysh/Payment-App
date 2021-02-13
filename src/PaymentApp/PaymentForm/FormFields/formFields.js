import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Typography } from '@material-ui/core'
import { TextFieldTemplate, DatePickerTemplate, SelectTemplate } from './Templates'
import { groupOfFourRegEx, notNumbersRegEx } from '../../Helpers/regexes'

export default function FormFields(props) {
  const [cardTypes, setCardTypes] = useState([])
  useEffect(() => {
    axios.get('http://www.mocky.io/v2/5d145fa22f0000ff3ec4f030').then(({ data }) => {
      const allowedCardTypes = ['Amex', 'Visa', 'MasterCard']
      const filteredCardTypes = data.cardTypes
        .filter(card => allowedCardTypes.indexOf(card.value) >= 0)
        .map(card => ({ ...card, label: card.value }))
      setCardTypes(filteredCardTypes)
    })
  }, [])

  const {
    formField: { cardType, cardNumber, expiry, name, email }
  } = props;

  function addDashes(value) {
    if (value) {
      const numericValue = value.replace(notNumbersRegEx, "")
      if (numericValue) {
        return numericValue.match(groupOfFourRegEx).join('-')
      }
      return ''
    }
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectTemplate
            name={cardType.name}
            label={cardType.label}
            data={cardTypes}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldTemplate
            name={cardNumber.name}
            label={cardNumber.label}
            onChange={({target: { value }}) => {
              props.setFieldValue(cardNumber.name, addDashes(value))
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <DatePickerTemplate
            name={expiry.name}
            label={expiry.label}
            format="MM/yy"
            views={['year', 'month']}
            minDate={new Date()}
            maxDate={new Date('2050/12/31')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldTemplate name={name.name} label={name.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextFieldTemplate name={email.name} label={email.label} fullWidth />
        </Grid>
      </Grid>
    </>
  );
}