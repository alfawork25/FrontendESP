import { Alert, Box, Button, Container, Stack, ThemeProvider, createTheme } from "@mui/material";
import { DataGrid, ruRU } from "@mui/x-data-grid";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProcessRegistry, getProcessesRegistry } from "../../../features/ReferenceProcess/referenceProcessSlice"




const ReferenceProcesses = () => {
    
    const state = useSelector(state => state.referenceProcess);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    useEffect(() => {

        dispatch(getProcessesRegistry());

    },[])


    const theme = createTheme({
        palette: {
          primary: { main: '#1976d2' },
        },
      },
      ruRU
    )
    

    const columns = [
        { field: 'id', headerName: 'ID', width:5 },
        { field: 'systemCode', headerName: 'Код системы',flex:1,renderCell:(params) => <div style={{wordBreak:'break-word'}} >{params.value}</div>},
        { field: 'systemName', headerName: 'Наименование системы',flex:1},
        { field: 'processFirstLevelCode', headerName: 'Код процесса 1-го уровня', flex:1, },
        { field: 'processFirstLevelName', headerName: 'Наименование процесса 1-го уровня', flex:1, },
        { field: 'processTwoLevelCode', headerName: 'Код процесса 2-го уровня', flex:1, },
        { field: 'processTwoLevelName', headerName: 'Наименование процесса 2-го уровня', flex:1, },
        { field: 'processThirdLevelCode', headerName: 'Код процесса 3-го уровня', flex:1, },
        { field: 'processThirdLevelName', headerName: 'Наименование процесса 3-го уровня', flex:1, },
        { field: 'processReferenceUniqueName', headerName: 'ID Процесса', flex:1, },
        { field: 'processName', headerName: 'Наименование процесса', flex:1,},
        { field: 'action',headerName: 'Действие',flex:1, renderCell:(params) => {
            return (
                <Box>
                    <Button size="small" variant="outlined" onClick={(event) =>  {
                        event.stopPropagation();
                        dispatch(deleteProcessRegistry(params.id))
                    }} color="error" >Удалить</Button>
                </Box>
                
            )
        } }
       
    ];
    const rows = [...state.processesRegistry];
    
   function goToProcess(url){
        navigate(url);
   } 

    return state.isLoading ? <div>Загрузка...</div> : 
    
    <div>
        {
                state.patterns !== 0 ? (
                <Container maxWidth='xl'>
                    <Link className="linkToAdd" to={"/referenceProcess"}>Добавить процесс</Link>
                    <Box sx={{ height:900, width: '100%' }}>
                        <ThemeProvider theme={theme}>
                           
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={50}
                                rowsPerPageOptions={[50]}
                                getRowHeight={() => 'auto'} 
                                headerHeight={97} 
                                onCellClick={(process) => goToProcess(`/referenceProcess/${process.id}`)}
                                sx={{".MuiDataGrid-columnHeaderTitle":{
                                    whiteSpace:"normal",
                                    lineHeight:1.5,
                                    fontSize:11
                                },".MuiDataGrid-cellContent":{whiteSpace:'normal',wordBreak:'break-word', fontSize:11, }}}

                            
                            />
                        </ThemeProvider>
                    </Box>
                </Container>
                ) :
                (
                    <Stack sx={{ width: '50%',m:4 }} spacing={2}>
                    <Alert variant="filled" severity="info">
                            Список кодов пуст
                    </Alert>
                    <Button className="customAddButton" variant="contained" sx={{width:'150px'}}>
                         <Link className="link" to={"/pattern"}>Добавить</Link>
                     </Button>
                </Stack>    
                )
        }
    </div>
}

export default ReferenceProcesses;