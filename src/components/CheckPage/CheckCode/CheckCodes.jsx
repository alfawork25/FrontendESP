import React from "react";
import { Link } from "react-router-dom";
import { Button,Alert,Stack, createTheme, ThemeProvider } from "@mui/material";
import { Box, Container } from "@mui/system";
import { DataGrid,ruRU } from "@mui/x-data-grid";

const CheckCodes = ({state,deleteCheckCodeById}) => {


    const theme = createTheme({
        palette: {
          primary: { main: '#1976d2' },
        },
      },
      ruRU
    )

    const columns = [
        { field: 'id', headerName: 'ID', width:50 },
        { field: 'title', headerName: 'Наименование',width:200},
        { field: 'name', headerName: 'Код проверки',width:100},
        { field: 'prohibitionCodes', headerName: 'Коды запрета', width:200, renderCell:(params) => params.value.map(x => x.name).join() },
        { field: 'action',headerName: 'Действие',flex:1, renderCell:(params) => {
            return (
                <Box>
                    <Button className="customAddButton" variant="contained" color="warning"><Link className="link" to={`/checkCodeEdit/${params.id}`}>Редактировать</Link></Button>
                    <Button sx={{m:'18px'}} variant="contained" color="error" onClick={() => deleteCheckCodeById(params.id)}>Удалить</Button>
                </Box>
                
            )
        } }
       
    ];
    const rows = [...state.checkCodes];

    return state.isLoading ? (<div>Загрузка...</div>) : (
        <div>
 
            {
                state.checkCodes !== 0 ? (
                <Container maxWidth='md'>
                    <Link className="linkToAdd" to={"/checkCodeAdd"}>Добавить код проверки</Link>
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
                         <Link className="link" to={"/checkCodeAdd"}>Добавить</Link>
                     </Button>
                </Stack>    
                )
            }
            
        </div>
    )
}


export default CheckCodes;