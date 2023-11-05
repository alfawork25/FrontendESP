import { Button, Container, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import MultipleSelect from "../../MultipleSelect/MultipleSelect";


const ClientTypeForm = ({state,sendData,deleteClientTypeHanlder}) => {

    return (
        <Container maxWidth="sm" sx={{mt:10,height:400,p:5, boxShadow:"0px 0px 1px black"}}>
            
            <Formik enableReinitialize={true} 
                    initialValues={{id:state.id,code:state.code,name:state.name,clientTypeIds:state.subjects}} 
                    onSubmit={(values) => sendData(values) }>
                {
                    (formik => (
                        <Box>
                            <form onSubmit={formik.handleSubmit}>
                                <Box>
                                    <Typography variant="h5">Тип клиента процесса</Typography>
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
                                <Stack mt={3}>
                                        <Box>
                                            <MultipleSelect
                                                minWidth={200} 
                                                maxWidth={230} 
                                                label="Субъекты"
                                                items={state.subjectItems}
                                                setFieldValue={formik.setFieldValue}
                                                {...formik.getFieldProps('clientTypeIds')}
                                            />
                                        </Box>
                                </Stack>
                                <Box display='flex' alignItems='center' justifyContent='flex-end' height={200} mt={3} mr={7}>
                                    <Button onClick={deleteClientTypeHanlder}>Удалить</Button>
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


export default ClientTypeForm;