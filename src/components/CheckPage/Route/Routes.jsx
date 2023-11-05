import { Box, createTheme, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import React from "react";
import { DataGrid,ruRU } from "@mui/x-data-grid";
import styles from './Route.module.css'


const Routes = ({state, deleteRouteHandler}) => {

    const theme = createTheme({
        palette: {
          primary: { main: '#1976d2' },
        },
      },
      ruRU
    )
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Название',width: 190},
        { field: 'code', headerName: 'Код',width: 150},
        { field: 'prohibitionCodes', headerName: 'Код запретов',width: 200 }, 
        
        { field: 'checkCodes', headerName: 'Код проверки', width: 200},
        { field: 'action',headerName: 'Действие',width:230, renderCell:(params) => {
        
            return (
                <Box>
                    <Link style={{color:'#1976d2'}}  className={styles.action} to={`/route/${params.id}`}>Редактировать</Link>
                    <Link style={{color:"#c81600"}}  className={styles.action} onClick={() => deleteRouteHandler(params.id)}>Удалить</Link>
                </Box>
            )
        } }
       
    ];
    const rows = [...state.routes];

    return (
        <Container maxWidth='lg'>
            <Link className="linkAdditional" to={"/route"}>Добавить маршрут</Link>
            <Box sx={{ height: 1190, width: '100%' }}>
                <ThemeProvider theme={theme}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}

                        disableSelectionOnClick
                    />
                </ThemeProvider>
            </Box>
        </Container>
    )
}

export default Routes;