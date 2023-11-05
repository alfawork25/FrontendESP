import React, { memo } from "react";
import { Box, InputLabel,  Stack, TextField } from "@mui/material";




const Integration = ({formik}) => {


    return (
        <Box>
                
        <Stack spacing={.9}>
        
        <Box>
         <InputLabel>Согласована Анкета</InputLabel>
          <TextField multiline sx={{width:500}} {...formik.getFieldProps('approvedProfile')} size='small'/>
        </Box>
        <Box>
          
        <InputLabel>Согласована в пром</InputLabel>
        <TextField multiline sx={{width:500}}{...formik.getFieldProps('approvedProm')}  size='small'/>
        </Box>
        <Box>
        <InputLabel>Согласована в пром с замечаниями</InputLabel>
        <TextField multiline  sx={{width:500}}{...formik.getFieldProps('approvedWithNote')} size='small' />
        </Box>
        <Box>
        <InputLabel>Дата внедрение</InputLabel>
        <TextField multiline  sx={{width:500}}{...formik.getFieldProps('integrated')} size='small' />
        </Box>
        
      </Stack>
    </Box>
    )
}

export default memo(Integration);