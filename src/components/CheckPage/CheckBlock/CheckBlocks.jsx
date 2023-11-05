import { Button,Alert,Stack, createTheme, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid,ruRU } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";


const CheckBlocks = ({state,deleteCheckBlockById})  => {

    const theme = createTheme({
          palette: {
            primary: { main: '#1976d2' },
          },
        },
        ruRU
      );

    const columns = [
        { field: 'id', headerName: 'ID', width:100 },
        { field: 'sequenceNumber', headerName: 'Порядковый номер', flex:1 },
        { field: 'clientTypes', headerName: 'Тип клиента процесса', flex:1,renderCell:(params) => params.value.map(x => x.name).join()},
        { field: 'blockName', headerName: 'Блок',flex:1},
        { field: 'shortName', headerName: 'Наименование',flex:1},
        { field: 'subjects',headerName: 'Субъекты',flex:1},
        { field: 'checkCodes', headerName: 'Коды проверки',flex:1}, 
        { 
            field: 'status', headerName: 'Статус', flex:1
        },

        { field: 'action',headerName: 'Действие',width:400, renderCell:(params) => {
        
            return (
                <Box>
                    <Button className="customAddButton" variant="contained" color="warning"><Link className="link" to={`/checkBlockEdit/${params.id}`}>Редактировать</Link></Button>
                    <Button sx={{m:'18px'}} variant="contained" color="error" onClick={() => deleteCheckBlockById(params.id)}>Удалить</Button>
                </Box>
            )
        } }
       
    ];
    
    const rows = [...state.checkBlocks];

    return state.isLoading ? (<div>Загрузка</div>) : (
        <div>
                {
                    state.checkBlocks.length !== 0 ? (
                    <>
                        <Link className="linkToAdd" to={"/checkBlockAdd"}>Добавить проверку</Link>
                        <Box sx={{ height:1120, width: '100%',display:'flex',justifyContent:'center' }}>
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
                    </>
                    ) : 
                        (
                            <Stack sx={{ width: '50%',m:4 }} spacing={2}>
                                <Alert variant="filled" severity="info">
                                        Список проверок пуст
                                </Alert>
                                <Button variant="contained" sx={{width:'150px'}}>
                                     <Link  to={"/checkBlockAdd"}>Добавить</Link>
                                 </Button>
                            </Stack>       
                        )
                }
                
        </div>
    )
}

export default CheckBlocks;