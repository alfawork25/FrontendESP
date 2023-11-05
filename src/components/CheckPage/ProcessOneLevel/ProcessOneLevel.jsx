import React from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Formik } from "formik";




const ProcessOneLevel = ({state,sendData,deleteProcessOneLevel}) => {

    return (
        <Container maxWidth="sm" sx={{mt:10,height:400,p:5, boxShadow:"0px 0px 1px black"}}>
            
        <Formik enableReinitialize={true} 
                initialValues={{id:state.id,code:state.code,name:state.name}} 
                onSubmit={(values) => sendData(values) }>
            {
                (formik => (
                    <Box>
                        <form onSubmit={formik.handleSubmit}>
                            <Box>
                                <Typography variant="h5">Процесс 1-го уровня</Typography>
                            </Box>
                            <Stack direction="row" spacing={5} mt={3}>
                                    <Box>
                                        <Box>Код</Box>
                                        <TextField size="small" {...formik.getFieldProps('code')} />
                                    </Box>
                                    <Box>
                                        <Box>Название</Box>
                                        <TextField size="small" {...formik.getFieldProps('name')} />
                                    </Box>
                            </Stack>
                            <Box display='flex' alignItems='center' justifyContent='flex-end' height={200} mt={3} mr={7}>
                            {state.id ? <Button onClick={deleteProcessOneLevel}>Удалить</Button> : null }
                                <Button type="submit">Сохранить</Button>
                            </Box>
                        </form>
                    </Box>
                ))
            }
        </Formik>

    </Container>
    )
}

export default ProcessOneLevel;