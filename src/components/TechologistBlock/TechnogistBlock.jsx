import React, { memo } from "react";
import { Box, InputLabel, Stack, TextField } from "@mui/material";




const TechnologistBlock = ({formik}) => {


    return (
        <Box>
               <Stack direction='row' spacing={.5}>
                 <Box>
                   <InputLabel shrink>Код процесса в вызове</InputLabel>
                   <TextField {...formik.getFieldProps('processCode')}  size='small' />
                 </Box>
                 <Box>
                   <InputLabel shrink>Профайл в вызове</InputLabel>
                   <TextField {...formik.getFieldProps('profile')}  size='small'  />
                 </Box>
                 <Box>
                 <InputLabel shrink>Код процесса для RS1</InputLabel>
                 <TextField {...formik.getFieldProps('rsOneCode')} size='small' />
                 </Box>
                 <Box>
                   <InputLabel shrink>Коды групп вызова проверок</InputLabel>
                   <TextField {...formik.getFieldProps('groupCode')} multiline size='small' />
                 </Box>
                 <Box>
                 <InputLabel shrink>Наименование процесса для RS1</InputLabel>
                   <TextField {...formik.getFieldProps('rsOneName')}  size='small'/>
                 </Box>
                 <Box>
                 <InputLabel shrink>Вызов проверок</InputLabel>
                 <TextField {...formik.getFieldProps('checkCall')} size='small' />
                 </Box>
                 <Box>
                 <InputLabel shrink>Проверки</InputLabel>
                 <TextField multiline size='small' />
                 </Box>
                
                 </Stack>
              
            </Box>
    )
}

export default memo(TechnologistBlock);