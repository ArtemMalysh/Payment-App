import React from 'react';
import { useField } from 'formik';
import { at } from 'lodash';
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core';

function SelectTemplate(props) {
  const { label, data, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;
  function renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
    return null
  }

  return (
    <FormControl {...rest} error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} value={selectedValue}>
        {data.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {renderHelperText()}
    </FormControl>
  );
}

export default SelectTemplate;
