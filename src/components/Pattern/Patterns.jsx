import { Alert, Box, Button, Container, Stack, ThemeProvider, createTheme } from "@mui/material";
import { DataGrid, ruRU } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";






const Patterns = ({state,deletePatternById}) => {

    const theme = createTheme({
        palette: {
          primary: { main: '#1976d2' },
        },
      },
      ruRU
    )
    
    const columns = [
        { field: 'id', headerName: 'ID', width:5 },
        { field: 'script', headerName: 'Скрипт',flex:1},
        { field: 'testInfo', headerName: 'Информация по тестированию',flex:1},
        { field: 'cases', headerName: 'Предоставление кейсов', flex:1, },
        { field: 'connectionInformationToProduction', headerName: 'Информация по подключению в бой', flex:1, },
        { field: 'action',headerName: 'Действие',flex:1, renderCell:(params) => {
            return (
                <Box>
                    <Button className="customAddButton" variant="contained" color="warning"><Link className="link" to={`/pattern/${params.id}`}>Редактировать</Link></Button>
                    <Button sx={{m:'18px'}} variant="contained" color="error" onClick={() => deletePatternById(params.id)}>Удалить</Button>
                </Box>
                
            )
        } }
       
    ];
    const rows = [...state.patterns];
    
    
    return state.isLoading ? <div>Загрузка...</div> : 
    
    <div>
        {
                state.patterns !== 0 ? (
                <Container maxWidth='xl'>
                    <Link className="linkToAdd" to={"/pattern"}>Добавить паттерн</Link>
                    <Box sx={{ height: 900, width: '100%' }}>
                        <ThemeProvider theme={theme}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={19}
                                rowsPerPageOptions={[19]}
                                
                                disableSelectionOnClick
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

export default Patterns;