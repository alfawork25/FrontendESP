import { Autocomplete, Button,Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import AlertCustom from "../../Alert/Alert";
import MultipleSelect from "../../MultipleSelect/MultipleSelect";
import MultipleSelectUncontrolled from "../../MultipleSelect/MultipleSelectUncontrolled";

const RouteForm = ({state,setPopupHandler,refresh,sendData,checkCodeValueChanged,addCheckProhibitionHandler,deleteCheckProhibitionHandler,updateCheckProhibitionsHandler}) => {
  
    return (
            <Box>
                <Box display='flex' justifyContent='flex-end' mr={15} mt={5} >
                    <Button onClick={refresh}>Добавить Маршрут</Button>
                </Box>
                <Container sx={{mt:5,p:5, boxShadow:"0px 0px 1px black"}}>    
                <Formik enableReinitialize={true} 
                        initialValues={{id:state.id,name:state.name,code:state.code,checkCodeId:'',prohibitionCodeIds:[]}}
                        onSubmit={(values) => {
                            sendData(values);
                            setPopupHandler(true);
                        }}>
                    {
                        (formik => (
                        
                            <Box display='flex' justifyContent='center'>
                                <form onSubmit={formik.handleSubmit}>
                                    <Stack margin="0 auto" width={500} spacing={5} >
                                        <Box>
                                            { state.popup && <AlertCustom setAlert={setPopupHandler} />}
                                        </Box>
                                        <Box>
                                            <Typography textAlign='center' variant="h3">Маршрут</Typography>
                                        </Box>
                                        <Box>
                                            <TextField {...formik.getFieldProps('name')} label='Название' multiline  fullWidth/>
                                        </Box>
                                        <Box>
                                            <TextField {...formik.getFieldProps('code')} label='Код' fullWidth/>
                                        </Box>
                                        <Box display='flex' justifyContent='flex-end'>
                                            <Button type="submit">Сохранить</Button>
                                        </Box>
                                        <Box>
                                            <Stack direction="row" spacing={3} >
                                                <Autocomplete
                                                    id="combo-box-demo"
                                                    options={state.checkCodes.map(x => ({label:`${x.name} (${!x.isActive ? 'Есть ПИН' : 'Нет Пина'})`,id:x.id}))}
                                                    onChange={(event,value) => checkCodeValueChanged(formik.setFieldValue,value)}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    sx={{ width: 190 }}
                                                    renderInput={(params) => <TextField {...params} label="Код проверки" />}
                                                />
                                                
                                                <MultipleSelect 
                                                        minWidth={190}
                                                        maxWidth={190}
                                                        label="Код запрета" 
                                                        items={state.prohibitionCodes}
                                                        setFieldValue={formik.setFieldValue}
                                                        {...formik.getFieldProps('prohibitionCodeIds')} 
                                                />
                                                <Button variant='outlined' size="small" onClick={() => addCheckProhibitionHandler(formik.values)} >Добавить</Button>
                                            </Stack>
                                        </Box>
                                    
                                    </Stack>
                                    <TableContainer sx={{mt:5}} component={Paper}>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Id</TableCell>
                                                        <TableCell align="center">Проверка</TableCell>
                                                        <TableCell align="center">Код проверки</TableCell>
                                                        <TableCell align="center">Код запрета</TableCell>
                                                        <TableCell align="center">Операция</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {state.checkProhibitions.map((checkProhibition) => (
                                                        <TableRow
                                                            key={checkProhibition.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                            <TableCell component="th" scope="row">
                                                                {checkProhibition.id}
                                                            </TableCell>
                                                            <TableCell align="center">{checkProhibition.title}</TableCell>
                                                            <TableCell align="center">{checkProhibition.name}</TableCell>
                                                            <TableCell align="center"><MultipleSelectUncontrolled width={190} items={state.checkCodes.length ? state.checkCodes.find(x => x.id === checkProhibition.id).prohibitionCodes : []} value={checkProhibition.prohibitionCodes} onChanged={(value) => updateCheckProhibitionsHandler(checkProhibition.id,value)} name='Код запретов' size='small'  /></TableCell>
                                                            <TableCell align="center"><Button onClick={() => deleteCheckProhibitionHandler(checkProhibition.id)}>Удалить</Button></TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table> 
                                        </TableContainer>
                                </form>
                            </Box>
                        ))
                    }
                </Formik>
            </Container>
        </Box>
    )
}

export default RouteForm;