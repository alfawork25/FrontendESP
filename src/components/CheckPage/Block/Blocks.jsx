import React from "react";
import { Link } from "react-router-dom";
import { Button,Alert,Stack, createTheme, ThemeProvider } from "@mui/material";
import { Box, Container } from "@mui/system";
import { DataGrid,ruRU } from "@mui/x-data-grid";


const Blocks = ({state,deleteBlockById}) => {

    const theme = createTheme({
          palette: {
            primary: { main: '#1976d2' },
          },
        },
        ruRU
      );


    const columns = [
        { field: 'id', headerName: 'ID', width:100 },
        { field: 'name', headerName: 'Блок',flex:1},
        { field: 'action',headerName: 'Действие',flex:1, renderCell:(params) => {
            return (
                <Box>
                    <Button className="customAddButton" variant="contained" color="warning"><Link className="link" to={`/blockEdit/${params.id}`}>Редактировать</Link></Button>
                    <Button sx={{m:'18px'}} variant="contained" color="error" onClick={() => deleteBlockById(params.id)}>Удалить</Button>
                </Box>
            )
        } }
       
    ];
    const rows = [...state.blocks];
    
    return state.isLoading ? (<div>Загрузка...</div>) : (
            
        <div>
            {
                state.blocks.length !== 0 ? 
                (               
                <Container maxWidth='md'>
                    <Link className="linkToAdd" to={"/blockAdd"}>Добавить блок</Link>
                    <Box sx={{ height: 500, width: '100%' }}>
                        <ThemeProvider theme={theme}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={7}
                                rowsPerPageOptions={[7]}
                                
                                disableSelectionOnClick
                            />
                        </ThemeProvider>
                    </Box>
                </Container>
                ) :
                (
                    <Stack sx={{ width: '50%',m:4 }} spacing={2}>
                    <Alert variant="filled" severity="info">
                            Список блоков пуст
                    </Alert>
                    <Button variant="contained"  sx={{width:'150px'}}>
                         <Link to={"/blockAdd"}>Добавить</Link>
                     </Button>
                </Stack>    
                )
            }
            
            
        </div>
    ) 
}


export default Blocks;