import React from "react";
import { Link } from "react-router-dom";
import { Button,Alert,Stack, createTheme, ThemeProvider } from "@mui/material";
import { Box, Container } from "@mui/system";
import { DataGrid,ruRU } from "@mui/x-data-grid";


const Subjects = ({state,deleteSubjectById}) => {

    const theme = createTheme({
        palette: {
          primary: { main: '#1976d2' },
        },
      },
      ruRU
    )

    const columns = [
        { field: 'id', headerName: 'ID', flex:1 },
        { field: 'name', headerName: 'Субъект',flex:1},
        { field: 'action',headerName: 'Действие',flex:1, renderCell:(params) => {
            return (
                <Box>
                    <Button className="customAddButton" variant="contained" color="warning"><Link className="link" to={`/subjectEdit/${params.id}`}>Редактировать</Link></Button>
                    <Button sx={{m:'18px'}} variant="contained" color="error" onClick={() => deleteSubjectById(params.id)}>Удалить</Button>
                </Box>
            )
        } }
       
    ];
    const rows = [...state.subjects]

    return state.isLoading ? (<div>Загрузка</div>) : (

        <div>
            {
                state.subjects.length !== 0 ? 
                (
                    <Container maxWidth='md'>
                    <Link className="linkToAdd" to={"/subjectAdd"}>Добавить субъект</Link>
                        <Box sx={{ height: 790, width: '100%' }}>
                            <ThemeProvider theme={theme}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={13}
                                    rowsPerPageOptions={[13]}
                                    
                                    disableSelectionOnClick
                                />
                            </ThemeProvider>
                           
                        </Box>
                     </Container>
                ) :
                (
                    <Stack sx={{ width: '50%',m:4 }} spacing={2}>
                    <Alert variant="filled" severity="info">
                            Список субъектов пуст
                    </Alert>
                    <Button variant="contained" sx={{width:'150px'}} >
                         <Link to={"/subjectAdd"}>Добавить</Link>
                     </Button>
                </Stack>    
                )
            }
           
        </div>
    )
}

export default Subjects