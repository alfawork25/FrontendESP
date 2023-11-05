import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box,MenuItem,Tab,Tabs, TextField } from "@mui/material";
import { useFormik } from 'formik';
import { getStatuses } from '../../features/Status/statusSlice';
import { useDispatch, } from 'react-redux';
import { useEffect } from 'react';
import ProcessInfoBlock from '../ProcessInfoBlock/ProcessInfoBlock';
import TechnogistBlock from '../TechologistBlock/TechnogistBlock';
import BlockTest from '../BlockTest/BlockTest';
import Integration from '../Integration/Integration';
import Persons from '../Persons/Persons';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },}
  )
);
export default function ModificationDialog({open,state,tempData,sendData,handleClose}) {
  

  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const formik = useFormik(
    {
        initialValues:{
          revisionType:state.revisionType,
          modificationName:state.revisionName,
          primaryModification:state.primaryModification,
          current:Number(state.current),
          startDate:state.startDate,
          status:state.status,
          processInfo:state.processInfo,
          processCode:state.processCode,
          profile:state.profile,
          rsOneCode:state.rsOneCode,
          rsOneName:state.rsOneName,
          groupCode:state.groupCode,
          checkCall:state.checkCall,
          requestDate:state.requestDate,
          directionDate:state.directionDate,
          resultDate:state.resultDate,
          endDate:state.endDate,
          note:+state.note,
          approvedProfile:state.approvedProfile,
          approvedProm:state.approvedProm,
          approvedWithNote:state.approvedWithNote,
          integrated:state.integrated,
          contactName:state.contactName,
          responsibleOKBP:state.responsibleOKBP,
          subjects:tempData.subjects.join(','),
          responsibleTechnologist:state.responsibleTechnologist,
        },
        enableReinitialize:true,        
        validateOnChange:false})
  
  useEffect(() => {
    dispatch(getStatuses());
  },[])
 
  function sendDataHandler() {
    formik.resetForm();
    sendData(formik.values);
    handleClose();
  }

  function closeHandler() {
    handleClose();
  }
  
  let menuItems = [{

    id:0,
    name:"Первичная доработка"
  },{
    id:1,
    name:"Последняя доработка"
  },{
    id:2,
    name:"Стандарт"
  }]

  

  return (

    <div>

      <BootstrapDialog
        onClose={closeHandler}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth='xl'

      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Доработки
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeHandler}
          sx={{
            position: 'absolute',
            right: 7,
            top: 7
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <TextField  sx={{m:1.5,width:500}} label='Доработка' size='small' {...formik.getFieldProps('modificationName')} />
        <TextField  sx={{m:1.5,width:500}} label='Тип доработки' size='small' {...formik.getFieldProps('revisionType')} select>
            {
              menuItems.map(x => <MenuItem id={x.id} value={x.name}>{x.name}</MenuItem>)
            }
        </TextField>
          <Box>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                
                allowScrollButtonsMobile
          
                aria-label="secondary tabs example"
                >
                <Tab label="Блок доп инфо процессу"  />
                <Tab label="Блок Технологов" />
                <Tab label="Блок Тестирования" />
                <Tab label="Внедрение" />
                <Tab label="Контактные лица" />
                
            </Tabs>
            <TabPanel value={value} index={0}>
              <ProcessInfoBlock formik={formik} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TechnogistBlock formik={formik} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <BlockTest formik={formik} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Integration formik={formik} />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Persons formik={formik} />
            </TabPanel>
            </Box>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={sendDataHandler}>
            Сохранить изменения
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

