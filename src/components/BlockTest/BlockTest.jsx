import React, { memo } from "react";
import { Box, InputLabel,  MenuItem,  Stack, TextField } from "@mui/material";


const BlockTest = ({formik}) => {
  let currentOptions = [
    {
      id:0,
      name:'Нет'
    },
    {
      id:1,
      name:'Есть'
  }]
  
    return (
        <Box>        
              <Stack spacing={.9}>
                <Box>
                <InputLabel>Дата запроса кейса от процесса</InputLabel>
                <TextField {...formik.getFieldProps('requestDate')}   sx={{width:500}} size='small' />
                </Box>
                <Box>
                <InputLabel>Дата направление кейсов</InputLabel>
                <TextField {...formik.getFieldProps('directionDate')} sx={{width:500}} size='small'  />
                </Box>
                <Box>
                <InputLabel>Дата получения рез-тов тест-я от процесса</InputLabel>
                <TextField {...formik.getFieldProps('resultDate')}   sx={{width:500}} size='small'/>
                </Box>
                <Box>
                <InputLabel>Замечания</InputLabel>
                <TextField sx={{width:500}} {...formik.getFieldProps('note')}  size='small' select> 
                      {
                        currentOptions.map(x => <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>)
                      }
                </TextField>
                </Box>
                <Box>
                <InputLabel>Дата завершение тестирования</InputLabel>
                <TextField {...formik.getFieldProps('endDate')}  sx={{width:500}} size='small'/>
                </Box>
              </Stack>
            </Box>
    )
}

export default memo(BlockTest)