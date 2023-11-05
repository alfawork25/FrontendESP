import React, { useEffect, useState } from "react";
import { 
    TextField,
    Container, 
    Typography,
    Stack,
    ToggleButtonGroup,
    ToggleButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem, 
    Button, 
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Box} from "@mui/material";
import MultipleSelect from "../../MultipleSelect/MultipleSelect";
import MultipleSelectUncontrolled from "../../MultipleSelect/MultipleSelectUncontrolled";
 
const CheckBlockForm = ({state,sendData,addCheckCode,setSelectedCode,handleSubjects,handleCheckCode,onDisabled,deleteCheckCode,formik}) => {
    
    const [selectedCodes,setSelectedCodes] = useState([])

    useEffect(() => {
        
        let temp = [...state.selectedCodes.map(x => ({...x,disabled:true}))]
        setSelectedCodes(temp);
        
    },[state.selectedCodes.length])



    return (
        <Container maxWidth="md">
        <Typography variant="h3" mt={10} textAlign="center">Проверка</Typography>
           <Stack onDoubleClickCapture={() => onDisabled(selectedCodes,setSelectedCodes)} m={5} spacing={3}>
           <TextField id="sequenceNumber" label="Порядковый номер" name="sequenceNumber" variant="outlined" onChange={formik.handleChange} value={formik.values.sequenceNumber} />
           <FormControl>
                   <InputLabel id="demo-simple-select-helper-label">Блок</InputLabel>
                    <Select labelId="demo-simple-select-helper-label" 
                            id="block"
                            name="block"
                            value={formik.values.block}
                            onChange={formik.handleChange}
                            label="Блок">
                            {
                                state.blocks && state.blocks.map((v,index) => (
                                    <MenuItem key={index} value={v.id}>
                                         <em>{v.name}</em>
                                    </MenuItem>
                                ))
                            }
                     </Select>
            </FormControl>
            <TextField id="shortName" label="Краткое наименование" name="shortName" variant="outlined" onChange={formik.handleChange} value={formik.values.shortName} />
            

            <Stack mt={3}>
                  <MultipleSelect
                      minWidth={200} 
                      maxWidth={230} 
                      label="Тип клиента процесса"
                      items={state.clientTypeItems}
                      setFieldValue={formik.setFieldValue}
                      {...formik.getFieldProps('clientTypes')}
                  />                    
            </Stack>

            <ToggleButtonGroup
                value={formik.values.subjects}
                onChange={handleSubjects}
                aria-label="person"
                color="primary">
                {
                    state.subjectList && state.subjectList.map(subject => (
                        <ToggleButton key={subject.id} value={subject.name} aria-label={subject.name}>{subject.name}</ToggleButton>
                    ))
                }
             
             </ToggleButtonGroup>
            <div style={{display:'flex'}}> 

                <Box>
                    <p>Выберите код проверки</p>
                    <FormControl sx={{ width: 250 }}>
                    <InputLabel id="demo-simple-select-helper-label">Код проверки</InputLabel>
                    <Select labelId="demo-simple-select-helper-label" 
                            id="code"
                            name="code"
                            value={formik.values.code}
                            onChange={handleCheckCode}
                            label="Код проверки">
                            <MenuItem value="">
                                <em>Код проверки</em>
                            </MenuItem>
                            {
                                state.codes && state.codes.map((code,index) => (
                                    <MenuItem key={index} value={code}>
                                        <em>{code.name}-{!code.isActive ? "Есть ПИН" : "Нет ПИНа"}</em>
                                    </MenuItem>
                                ))
                            }
                    </Select>
                </FormControl>
                </Box>
                
                <Box ml='5px' display='flex' alignItems='flex-end'>
                    {state.subjectList && <MultipleSelect 
                                                        items={state.subjectList}  
                                                        minWidth={200}
                                                        maxWidth={200}
                                                        label="Субъекты" 
                                                        setFieldValue={formik.setFieldValue}
                                                        {...formik.getFieldProps('subjectsToCheckCode')} />
                    }        
                </Box>        
            </div>
            <Typography variant="h5">Список код проверок</Typography>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="center">Наименование</TableCell>
                                <TableCell align="center">Код проверки</TableCell>
                                <TableCell align="right">Статус субъекта</TableCell>
                                <TableCell align="right">Код запрета</TableCell>
                                <TableCell align="right">Субъект</TableCell>
                                <TableCell align="right">Операция</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedCodes && selectedCodes.map((code,index) => (
                                <TableRow
                                    key={code.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                                    <TableCell component="th" scope="row">
                                        {code.id}
                                    </TableCell>
                                    <TableCell align="center">{code.title}</TableCell>
                                    <TableCell align="center">{code.name}</TableCell>
                                    <TableCell align="right">{code.isActive ? "Новый/Нет ПИНа" : "Есть ПИН"}</TableCell>
                                    <TableCell sx={{wordBreak:'break-word',maxWidth:'20px'}} align="right">{code.prohibitionCodes.map(x => x.name).join()}</TableCell> 
                                    <TableCell onClickCapture={() => onDisabled(selectedCodes,setSelectedCodes,code.id) } sx={{wordBreak:'break-word',maxWidth:'20px'}} align="right">{code.disabled ? code.subjectsToCheckCode.map(x => x.name).join() : <MultipleSelectUncontrolled width={110} items={state.subjectList} value={code.subjectsToCheckCode} onChanged={(value) => setSelectedCode(code.id,value)} name='Субъекты' size='small'  /> }</TableCell>
                                    <TableCell align="right"><Button onClick={() => deleteCheckCode(code.id)}>Удалить</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> 
                </TableContainer>
            <Button onClick={() => sendData(formik.values)}>Сохранить</Button>
           </Stack>
      </Container>
    )
}

export default CheckBlockForm;