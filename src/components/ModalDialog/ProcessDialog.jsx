import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatuses } from '../../features/Status/statusSlice';
import BasicSelect from '../BasicSelect/BasicSelect';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { setStatusHistory, updateProcess } from '../../features/Process/processSlice';
import { useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },

}));

export default function ProcessDialog({id,name,startDate,
  startDateLastRevision, primaryDate,count,lastDateRevision, statusDate,enrollments,statusHistories}) {
  
  const state = useSelector(state => state.status);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    dispatch(getStatuses());
  },[])


  let primaryConnectionStatus = enrollments.find(x => x.type === 'primaryConnectionStatus');
  
  if(primaryConnectionStatus) {
    primaryConnectionStatus = primaryConnectionStatus.statusId;
  }

   
   let lastRevisionStatus = enrollments.find(x => x.type === 'lastRevisionStatus');
   
   if(lastDateRevision) {
     lastRevisionStatus = lastRevisionStatus.statusId;
   }



  const formik = useFormik({
    initialValues:{
      id,
      startDate,
      primaryConnectionStatus: primaryConnectionStatus || '',
      startDateLastRevision, 
      primaryDate,
      count:count || 1, 

      lastRevisionStatus: lastRevisionStatus || '',
      statusDate,
      lastDateRevision
    },
    enableReinitialize:true
  });


  const [localPrimaryRevisionStatus,setLocalPrimaryRevisionStatus] = useState(primaryConnectionStatus);

  const [localLastRevisionStatus,setLocalRevisionStatus] = useState(lastRevisionStatus);

  let sendData = (values) => {
    
    
    let request = {
      id,
      ...values,
      startDate: values.startDate ? dayjs(values.startDate).format("DD.MM.YYYY") : null,
      primaryDate: values.primaryDate ? dayjs(values.primaryDate).format("DD.MM.YYYY") : null,
      startDateLastRevision: values.startDateLastRevision ? dayjs(values.startDateLastRevision).format("DD.MM.YYYY") : null,
      statusDate: values.statusDate ? dayjs(values.statusDate).format("DD.MM.YYYY") : null,
      lastDateRevision: values.lastDateRevision ? dayjs(values.lastDateRevision).format("DD.MM.YYYY") : null,
      Type:'Base'
    }
  

    
    
    let changes = [];
 
    if(request.primaryConnectionStatus !== localPrimaryRevisionStatus) {
        let newPrimaryConnectionStatus = state.statuses.find(z => z.id === request.primaryConnectionStatus);

        if(newPrimaryConnectionStatus) {
          changes.push({date:new Date().toLocaleDateString(),description:'Статус первичного подключение к ЕСП',name:newPrimaryConnectionStatus.name});
          setLocalPrimaryRevisionStatus(request.primaryConnectionStatus);
        }
       
    }
  
    if(request.lastRevisionStatus !== localLastRevisionStatus) {
      let newLastRevisionStatus = state.statuses.find(z => z.id === request.lastRevisionStatus);

      if(newLastRevisionStatus) {
        changes.push({date:new Date().toLocaleDateString(),description:'Статус последней доработки',name:newLastRevisionStatus.name});
        setLocalRevisionStatus(request.lastRevisionStatus);
      }
     
    }

    if(changes.length) {
      
       let updateStatusHistories = [...changes,...statusHistories];
      
       dispatch(setStatusHistory(updateStatusHistories));
       request.statusHistories = changes;
    }
    dispatch(updateProcess(request));
    handleClose();
  }
 

  

  return (
    <div>
      <Button size='small' variant="outlined" color='secondary' onClick={(event) => {
        event.stopPropagation();
        handleClickOpen();
      }}>
        Общая информация
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth='md'
      >
        <DialogTitle sx={{ m: 0, p: 2, }} id="customized-dialog-title">
          {name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 7,
            top: 7,
            color: (theme) => theme.palette.error[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <DialogContent style={{display:'flex'}} dividers>
        <div>

        <Stack spacing={2.5}>
        <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker label="Дата начала"
                                inputFormat="DD.MM.YYYY"
                                value={formik.values.startDate}
                                onChange={(value) => formik.setFieldValue('startDate',value)}
                                renderInput={(params) => <TextField size='small' {...params} />}
                />   
              </LocalizationProvider>
            <div style={{marginTop:'10px'}}>
              <BasicSelect items={state.statuses.map(x => ({...x,name:`${x.code}-${x.name}`}))} {...formik.getFieldProps('primaryConnectionStatus')}  minWidth={250} maxWidth={500} label='Статус первичного подключение к ЕСП'  />        
            </div>   
        </div>
        
        <div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                
                <DesktopDatePicker label="Дата первичного внедрения"
                                inputFormat="DD.MM.YYYY"
                                value={formik.values.primaryDate}
                                onChange={(value) => formik.setFieldValue('primaryDate',value)}
                                renderInput={(params) => <TextField size='small' {...params} />}
                />   
              </LocalizationProvider>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                
                <DesktopDatePicker label="Дата начала последней доработки"
                                inputFormat="DD.MM.YYYY"
                                value={formik.getFieldProps('startDateLastRevision').value}
                                onChange={(value) => formik.setFieldValue('startDateLastRevision',value)}
                                renderInput={(params) => <TextField sx={{mt:2.5}}  size='small' {...params} />}
                />   
              </LocalizationProvider>
            </div>
            
    
        </div>

        <div>
          <TextField  id='count' name='count' value={formik.values.count}  onChange={formik.handleChange}  size='small' label='Кол-во доработок' />
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker  label="Дата внедрение последней доработки"
                                inputFormat="DD.MM.YYYY"
                                value={formik.getFieldProps('lastDateRevision').value}
                                onChange={(value) => formik.setFieldValue('lastDateRevision',value)}
                                renderInput={(params) => <TextField sx={{minWidth:250,mt:2.5}}  size='small' {...params} />}
                />   
              </LocalizationProvider>
            </div>
        </div>

        <div>
            <BasicSelect items={state.statuses.map(x => ({...x,name:`${x.code}-${x.name}`}))} value={formik.values.lastRevisionStatus} {...formik.getFieldProps('lastRevisionStatus')}  minWidth={250} maxWidth={500} label='Статус последней доработки'  />
          
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              
              <DesktopDatePicker label="Дата статуса"
                              inputFormat="DD.MM.YYYY"
                              value={formik.values.statusDate}
                              onChange={(value) => formik.setFieldValue('statusDate',value)}
                              renderInput={(params) => <TextField sx={{mt:2.5}} size='small'  {...params} />}
              /> 
            </LocalizationProvider>

        </div>
        </Stack>
        </div>
        <div style={{flex:1,marginLeft:5,marginRight:5}}>
          <Paper sx={{overflow:'auto',height:500}}>
            <Typography sx={{m:5,mt:0,mb:'5px'}}>История статусов</Typography>
            <div style={{marginLeft:50,marginRight:50}}> 
              {
                statusHistories.map((x,index) => <div key={index}>
                  <div><strong>{x.description}</strong></div>
                  <span>{x.date}: {x.name}</span>
                  <Divider sx={{m:1.5}}/>
                </div>)
              }
            </div>
          
          </Paper>
        
        </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => sendData(formik.values)}>
            Сохранить изменения
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}