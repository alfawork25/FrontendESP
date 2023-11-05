import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BasicSelect({label = "No label",name,value,onChange,minWidth,maxWidth,width,items,required}) {

  return (
    <Box sx={{ minWidth:minWidth, maxWidth:maxWidth}}>
      <FormControl size='small' fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select

          required={required}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          name={name}
          label={label}
          onChange={onChange}
        >

          {
            items.map(item => (<MenuItem  key={item.id} value={item.id}>{item.name}</MenuItem>))
          }
        </Select>
      </FormControl>
    </Box>
  );
}