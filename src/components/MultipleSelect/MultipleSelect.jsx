import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({label = "No label",name,value,minWidth,maxWidth,width,items,setFieldValue,required}) {

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setFieldValue(name,typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box sx={{ minWidth:minWidth, maxWidth:maxWidth}}>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          required={required}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={value}
          name={name}
          label={label}
          onChange={handleChange}
          MenuProps={MenuProps}>
          {
            items.map((item) => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))
          }
        </Select>
      </FormControl>
    </Box>
  );
}