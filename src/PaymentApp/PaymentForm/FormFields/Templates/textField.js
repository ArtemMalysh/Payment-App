import React from 'react';
import { useField } from 'formik';
import { at } from 'lodash';
import { TextField } from '@material-ui/core';

export default function TextFieldTemplate(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);

  function renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
    return null
  }

  return (
    <TextField
      error={meta.touched && meta.error && true}
      helperText={renderHelperText()}
      {...field}
      {...rest}
    />
  );
}
