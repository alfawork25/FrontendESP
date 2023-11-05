import {  Alert, Button, Container, TextField, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from "formik";
import React, { useState } from "react";





const Pattern = ({state,sendData}) => {

    const [alert,setAlert] = useState(false);

    const formik = useFormik({
        initialValues:{
            id:state.id,
            script:state.script,
            testinfo:state.testinfo,
            cases:state.cases,
            connectionInformationToProduction:state.connectionInformationToProduction
        },
        enableReinitialize:true
    })
    
    
    const onSubmit = (event) => {
      
        sendData(formik.values);
        setAlert(true);
    }

    return (

        <Container maxWidth='sm'>
            { alert && <Alert severity="success" style={{display:'flex',margin:'10px'}}  
            
            action={
            <ClearIcon
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    setAlert(false)
                }}
            ></ClearIcon>
            }>
            Паттерн успешно сохранен</Alert>}
            <form style={{marginTop:'50px'}}>
            <div>
                <Typography>Скрипт</Typography>
                <TextField fullWidth size="small" {...formik.getFieldProps("script")}/>
            </div>
            <br/>
            <div>
                <Typography>Информация по тестированию</Typography>
                <TextField fullWidth multiline size="small" {...formik.getFieldProps("testinfo")}/>
            </div>    
            <br/>
            <div>
                <Typography>Предоставление кейсов</Typography>
                <TextField fullWidth multiline size="small" {...formik.getFieldProps("cases")}/>
            </div>
            <br/>
            <div>
                <Typography>Информация по подключению в бой</Typography>
                <TextField fullWidth multiline rows={5} size="small" {...formik.getFieldProps("connectionInformationToProduction")}/>
            </div>
            <br/>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <Button onClick={onSubmit}>Сохранить</Button>
            </div>
            </form>
        </Container>
    );
    
};

export default Pattern