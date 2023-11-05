import React, { memo } from "react";
import BasicSelect from "../BasicSelect/BasicSelect";
import { useSelector } from "react-redux";
import { Box, InputLabel, MenuItem, Stack, TextField } from "@mui/material";





const ProcessInfoBlock = ({formik}) => {
   
    const statusState = useSelector(state => state.status);

    let currentOptions = [
        {
          id:0,
          name:'Новый'
        },
        {
          id:1,
          name:'Действующий'
      }]


    
    
    return (
        <Box>
                <Stack direction='row' spacing={.5}>
                  <Box>
                     <InputLabel shrink>Первичная разработка или доработки</InputLabel>
                     <TextField  {...formik.getFieldProps('primaryModification')} size='small' />
                  </Box>
                  <Box>
                    <InputLabel shrink>Новый/Действующий процесс</InputLabel>
                    <TextField sx={{width:200}} {...formik.getFieldProps('current')}  size='small' select> 
                      {
                        currentOptions.map(x => <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>)
                      }
                    </TextField>
                  </Box>
                  <Box>
                    <InputLabel shrink>Дата начала</InputLabel>
                    <TextField {...formik.getFieldProps('startDate')} size='small' />
                  </Box>
                 <Box>
                     <InputLabel shrink>Статус работ</InputLabel>
                     <BasicSelect label={null} items={statusState.statuses.map(x => ({...x,name:`${x.code}-${x.name}`}))} {...formik.getFieldProps('status')}  minWidth={150} maxWidth={150}  />
                 </Box>
                 <Box>
                    <InputLabel shrink>Информация по процессу</InputLabel>
                    <TextField multiline {...formik.getFieldProps('processInfo')} size='small' />
                 </Box>
                  
                  <Box>
                      <InputLabel shrink>Субъекты проверок</InputLabel>
                      <TextField multiline {...formik.getFieldProps('subjects')}  size='small' />
                  </Box>
                
                </Stack>

            </Box>
    )
}


export default memo(ProcessInfoBlock);