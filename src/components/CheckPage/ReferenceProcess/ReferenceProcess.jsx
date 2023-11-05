import {Button, Container, Stack, TextField, } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import BasicSelect from "../../BasicSelect/BasicSelect";
import { useNavigate } from "react-router";





const ReferenceProcess = ({state,sendValues}) => {
    
    const [commandMessage,setCommandMessage] = useState("Сохранить");

    const formik = useFormik({
        
        initialValues:{
            systemCode:state.systemCode,
            processFirstLevel:state.processFirstLevel,
            processSecondLevel:state.processSecondLevel,
            processCodeThirdLevel:state.processCodeThirdLevel,
            processNameThirdLevel:state.processNameThirdLevel,
        },
        enableReinitialize:true,
        validateOnChange:false,
    
    })

    let systemCodeName = state.systemBlocks.find(z => z.id === formik.values.systemCode) ?
                         state.systemBlocks.find(z => z.id === formik.values.systemCode).name : '';
    
    let processFirstLevelName = state.processFirstLevels.find(z => z.id === formik.values.processFirstLevel) ? 
                                state.processFirstLevels.find(z => z.id === formik.values.processFirstLevel).name : '';

    let processSecondLevelName = state.processSecondLevels.find(z => z.id === formik.values.processSecondLevel) ? 
                                 state.processSecondLevels.find(z => z.id === formik.values.processSecondLevel).name : '';    


    let IdProcess = [];

    if(systemCodeName) {
       IdProcess.push(state.systemBlocks.find(z => z.id === formik.values.systemCode).code);
    }

    if(processFirstLevelName) {
        IdProcess.push(state.processFirstLevels.find(z => z.id === formik.values.processFirstLevel).code);
    }

    if(processSecondLevelName) {
        IdProcess.push(state.processSecondLevels.find(z => z.id === formik.values.processSecondLevel).code);
    }
    
    IdProcess.push(formik.values.processCodeThirdLevel);

    let processName = `${systemCodeName}. ${processFirstLevelName}. ${processSecondLevelName}. ${formik.values.processNameThirdLevel}`;

    let sendValuesHandler = () => {
        let request = {
            id:state.id,
            ...formik.values,
            processReferenceUniqueName:IdProcess.join('.'),
            processName,
        }
        sendValues(request);
        setCommandMessage("Процесс cохранен");
    }

    const navigate = useNavigate();

    function goToProcesses() {
        navigate('/referenceProcesses')
    }

    return <Container maxWidth='xs' onClick={() => setCommandMessage("Сохранить")}>
        <Stack style={{marginTop:50,marginBottom:50}} spacing={5}>
        <div>
        <BasicSelect label="Код Системы" {...formik.getFieldProps('systemCode')}  items={state.systemBlocks.map(z => ({...z,name:`${z.code}-${z.name}`}))} />
        <TextField  sx={{mt:1,width:397}} size="small" label='Наименование системы' value={systemCodeName} disabled />
        </div>
       
        <div>
        <BasicSelect label="Код процесса 1-го уровня" {...formik.getFieldProps('processFirstLevel')} items={state.processFirstLevels.map(z => ({...z,name:`${z.code}-${z.name}`}))} />
        <TextField sx={{mt:1,width:397}} size="small" label='Наименование процесса 1-го уровня' value={processFirstLevelName} disabled />
        </div>
       
        <div>
        <BasicSelect label="Код процесса 2-го уровня" {...formik.getFieldProps('processSecondLevel')} items={state.processSecondLevels.map(z => ({...z,name:`${z.code}-${z.name}`}))} />
        <TextField sx={{mt:1,width:397}} size="small" label='Наименование процесса 2-го уровня' value={processSecondLevelName} disabled />
        </div>

        <div>
        <TextField {...formik.getFieldProps('processCodeThirdLevel')} sx={{mt:1,width:397}} size="small" label='Код процесса 3-го уровня' />
        <TextField {...formik.getFieldProps('processNameThirdLevel')} sx={{mt:1,width:397}} multiline size="small" label='Наименование процесса 3-го уровня' />
        </div>

        <div>
            <TextField value={`${IdProcess.join('.')}`} size="small" label='ID процесса' />
        </div>
        <div>
            <TextField sx={{width:399}} multiline value={processName} size="small" label='Наименование процесса' />
        </div>
        <div style={{display:'flex'}}>
        <Button onClick={(event) => { event.stopPropagation();sendValuesHandler()}}>{commandMessage}</Button> 
        <div>
        <Button  onClick={goToProcesses}>Назад</Button>
        </div> 
        </div>
       
        </Stack>
    </Container>
}


export default ReferenceProcess;