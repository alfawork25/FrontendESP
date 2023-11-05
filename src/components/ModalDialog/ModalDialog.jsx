import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {TextField,Button,Stack,Typography, Checkbox, FormControlLabel} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProhibitionCode } from '../../features/ProhibitionCode/prohibitionCodeSlice';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalDialog({modalState}) {

  
  const dispatch = useDispatch();
 
  const [prohibitionCode,setProhibitonCode] = useState(modalState.name);
  const [defaultValue,setDefaultValue] = useState(modalState.default);
  const [checked, setChecked] = React.useState(true);

  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeDefaultValue = (event) => {
    setDefaultValue(event.target.checked);
  };


  const [startDate, setStartDateValue] = React.useState(dayjs(modalState.startDate));
  const handleChange = (newValue) => {
      setStartDateValue(newValue);
  };

  let defaultEndDate = modalState.endDate ? dayjs(modalState.endDate) : null;
  const [endDate, setEndDate] = React.useState(defaultEndDate);
  const endDatehandleChange = (newValue) => {
  
    if(newValue == null) {
      setEndDate(null);
    }else {
        setEndDate(newValue);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function updateProhibitonCodeHandler() {

      let request = {
        id:modalState.id,
        name:prohibitionCode,
        isActive:checked,
        default:defaultValue,
        startDate:dayjs(startDate).format("DD.MM.YYYY"),
        endDate:endDate ? dayjs(endDate).format("DD.MM.YYYY") : null
      }

      dispatch(updateProhibitionCode(request));
      handleClose();
  }
  return (
    <div>
      <Button onClick={handleOpen}><EditIcon/></Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography m={3} id="transition-modal-title" variant="h6" component="h2">
              Редактирование записи : {modalState.id}
            </Typography>
            <Stack spacing={4}>
                <TextField label="Код запрета" value={prohibitionCode}  onChange={(event) => setProhibitonCode(event.target.value)}  />
                <FormControlLabel control={<Checkbox  checked={checked} onChange={handleChangeChecked} inputProps={{ 'aria-label': 'controlled' }} />} label="Активный" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Дата начало"
                        inputFormat="DD.MM.YYYY"
                        value={startDate}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                        />   
                        <DesktopDatePicker
                        label="Дата окончания"
                        inputFormat="DD.MM.YYYY"
                        value={endDate}
                        onChange={endDatehandleChange}
                        renderInput={(params) => <TextField {...params} />}
                        />   
                    </LocalizationProvider>
                    <FormControlLabel control={<Checkbox  checked={defaultValue} onChange={handleChangeDefaultValue} inputProps={{ 'aria-label': 'controlled' }} />} label="Стандартный" />
            </Stack>
            <Button onClick={updateProhibitonCodeHandler} sx={{mt:3}} >Сохранить</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}