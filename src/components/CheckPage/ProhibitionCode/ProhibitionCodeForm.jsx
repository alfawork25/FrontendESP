import React from "react";
import { 
    TextField,
    Container,
    Stack,
    Select,
    MenuItem,
    FormControl,
    InputLabel, 
    Button,
    createTheme,ThemeProvider} from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ModalDialog from "../../ModalDialog/ModalDialog";
import ClearIcon from '@mui/icons-material/Clear';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { Box } from "@mui/system";
import { DataGrid,ruRU } from "@mui/x-data-grid";

const ProhibitionCodeForm = ({state,sendData,filter,deleteProhibtionCode,formik}) => {

    const theme = createTheme({
        palette: {
        primary: { main: '#1976d2' },
        },
    },
    ruRU);

  const [startDate, setStartDateValue] = React.useState(dayjs(new Date()));
  const handleChange = (newValue) => {
    setStartDateValue(newValue);
    formik.setFieldValue('startDate',dayjs(newValue).format("DD.MM.YYYY"))
  };

  const [endDate, setEndDate] = React.useState(null);
  const endDatehandleChange = (newValue) => {
    setEndDate(newValue);

    if(newValue == null) {
        formik.setFieldValue('endDate',null);
    }else {
        formik.setFieldValue('endDate',dayjs(newValue).format("DD.MM.YYYY"));
    }
   
  };
  


    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Код запрета',width:150},
        { field: 'checkCode', headerName: 'Проверка',flex:1},
        
        { field: 'checkCodeName',headerName: 'Код',flex:1},
        { field: 'checkCodeActive', headerName: 'Статус код проверки',flex:1 },
        { field: 'prohibitionCodeIsActive', headerName: 'Статус',flex:1,renderCell:(params) => params.value ? "Активный" : "Истек" }, 
        { field: 'default', headerName: 'Cтандарт',flex:1, renderCell:(params) => params.value ? <VerifiedOutlinedIcon color="primary"/> : 'X' },
        { field: 'startDate', headerName: 'Дата начало', flex:1 , renderCell:(params) => dayjs(params.value).format("DD.MM.YYYY")},
        { field: 'endDate', headerName: 'Дата окончания', flex:1, renderCell:(params) => params.value != null ? dayjs(params.value).format("DD.MM.YYYY") : null},
        { field: 'action', headerName:'Действие',flex:1, renderCell:(params) => {
           
         
            return (
                <Stack justifyContent={"flex-end"} direction={"row"}>
                    <ModalDialog modalState={params.row}/>
                    <Button color="error" onClick={() => deleteProhibtionCode(params.id)}><ClearIcon/></Button>
                </Stack>
            )
        }}
        
    
    ];

  const rows = [...state.prohibitonCodes];
  return (
        <Container maxWidth="xl">
            <Stack m={5} spacing={3} direction={"row"}>
               <TextField  size='small'  sx={{maxWidth:150}} id="name" label="Код запрета" name="name" variant="outlined" onChange={formik.handleChange} value={formik.values.name}  />
                    <FormControl sx={{ m: 1, minWidth:150 }} size='small'>
                        <InputLabel id="demo-simple-select-helper-label">Код проверки</InputLabel>
                        <Select labelId="demo-simple-select-helper-label"
                                id="checkCodeId"
                                name="checkCodeId"
                                value={formik.values.checkCodeId}
                                onChange={formik.handleChange}
                                label="Код проверки">
                             <MenuItem value="">
                                <em>Код проверки</em>
                            </MenuItem>
                            {
                                state.checkCodes && 
                                state.checkCodes.map(checkCode => 
                                <MenuItem key={checkCode.id} value={checkCode.id}>
                                    <Box sx={{display:"flex",flexDirection:"column",width:"100%"}}>
                                        <div>{checkCode.title}</div>
                                        <div>{checkCode.name}:{checkCode.isActive ? "Новый/нет ПИНа" : "Есть ПИН"}</div>
                                     </Box>                  
                                </MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size='small' >
                        <InputLabel id="demo-simple-select-helper-label">Статус</InputLabel>
                        <Select labelId="demo-simple-select-helper-label" 
                                id="isActive"
                                name="isActive"
                                value={formik.values.isActive}
                                onChange={formik.handleChange}
                                label="Категория">
                             <MenuItem value="">
                                <em>Статус кода проверки</em>
                            </MenuItem>        
                            <MenuItem value={true}>Активный</MenuItem>
                            <MenuItem value={false}>Истек</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Дата начало"
                        inputFormat="DD.MM.YYYY"
                        value={startDate}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} size='small' sx={{maxWidth:200}} />}
                        />   
                        <DesktopDatePicker
                        label="Дата окончания"
                        inputFormat="DD.MM.YYYY"
                        value={endDate}
                        onChange={endDatehandleChange}
                        renderInput={(params) => <TextField {...params} size='small' sx={{maxWidth:200}} />}
                        />   
                    </LocalizationProvider>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size='small' >
                        <InputLabel id="demo-simple-select-helper-label">Cтандартный</InputLabel>
                        <Select labelId="demo-simple-select-helper-label" 
                                id="default"
                                name="default"
                                value={formik.values.default}
                                onChange={formik.handleChange}
                                label="Cтандартный">
                             <MenuItem value="">
                            </MenuItem>        
                            <MenuItem value={true}>Да</MenuItem>
                            <MenuItem value={false}>Нет</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={() => sendData()} >Добавить</Button>
            </Stack>
            <Stack>
            {
                state.isLoading ? (
                    <p align="center">Загрузка...</p>
                ) : (
                    <Box sx={{ height:2875, width: '100%',display:'flex',justifyContent:'center' }}>
                        <ThemeProvider theme={theme}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={52}
                                    rowsPerPageOptions={[52]}
                                    
                                    disableSelectionOnClick
                                />
                        </ThemeProvider>
                     
                    </Box>
                )
            }
            
            </Stack>
        </Container>
    )
}

export default ProhibitionCodeForm;