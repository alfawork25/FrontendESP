import React, { memo } from "react";
import { Box, InputLabel,  Stack, TextField } from "@mui/material";






const Persons = ({formik}) => {

    return (
        <Box>
              <Stack spacing={.7}>

                <div>
                <InputLabel>Конт.лица от процесса</InputLabel>
                <TextField multiline  sx={{width:500}} {...formik.getFieldProps('contactName')} size='small' />
                </div>
                <div>
                <InputLabel>Ответственный от ОКЭБП</InputLabel>
                <TextField multiline sx={{width:500}}  {...formik.getFieldProps('responsibleOKBP')}   size='small'  />
                </div>
                <div>
                <InputLabel>Отвественный от технологов</InputLabel>
                <TextField multiline sx={{width:500}}  {...formik.getFieldProps('responsibleTechnologist')}  size='small'/>
                </div>
                
              </Stack>
            </Box>
    )
}

export default memo(Persons)