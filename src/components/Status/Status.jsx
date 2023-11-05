import { Check, Close } from "@mui/icons-material";
import { Alert, Button, Container, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";






const Status = ({state,sendData}) => {
    
    let [alert,setAlert] = useState(false);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            id:state.id,
            code:state.code,
            name:state.name
        },
        enableReinitialize:true,
        onSubmit:(values) => {
            
            sendData(values);
            setAlert(true);
        },
    });
    
    return <Container maxWidth='sm'> 
        <Stack spacing={5} mt={5}>
            <div style={{display:'flex',justifyContent:'end'}}>
            { alert && <Alert style={{width:'200px'}} onClick={() => setAlert(false)} icon={<Check fontSize="inherit" />} action={<Close />}  severity="success">
                Статус сохранен
            </Alert>}
            </div>
            <form onSubmit={formik.handleSubmit}>
            <div>
                <p>Код</p>
                <TextField fullWidth size="small" {...formik.getFieldProps("code")}/>
            </div>
            <div>
                <p>Cтатус</p>
                <TextField fullWidth multiline size="small" {...formik.getFieldProps("name")}/>
            </div><br/>
            <div style={{display:'flex',justifyContent:'space-evenly'}}>
                <Button type="submit">Сохранить</Button>
                <Button onClick={() => navigate('/statuses')} >Назад</Button>
            </div>
            </form>
    </Stack>
</Container> 
}

export default Status;