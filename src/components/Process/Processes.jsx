import { Box, ThemeProvider,Typography, createTheme, } from "@mui/material";
import React from "react";
import { DataGrid, ruRU } from "@mui/x-data-grid";
import Loader from "../Loader/Loader";




const Processes = ({state,goToProcessCard}) => {

    const theme = createTheme({
        palette: {
          primary: { main: '#1976d2' },
        },

      },
      ruRU
    )
    const columns = [
        { field: 'rowId', headerName: 'Id',flex:.25},
        { field: 'clientType', headerName: 'Тип клиента',flex:.5},
        { field: 'systemCode', headerName: 'Код процесса',flex:.5},
        { field: 'name', headerName: 'Наименование',flex:1},
        { field: 'startDate', headerName: 'Дата начала',flex:.7},
        { field: 'primaryConnectionStatus', headerName: 'Cтатус первичного подключения к ЕСП',flex:1},
        { field: 'primaryDate', headerName: 'Дата первичного внедрения',flex:.7},
        { field: 'count', headerName: 'Кол-во доработок',flex:.7},
        { field: 'startDateLastRevision', headerName: 'Дата начала последней доработки',flex:.7},
        { field: 'lastRevisionStatus', headerName: 'Статуc последней доработки',flex:1 },
        { field: 'lastDateRevision', headerName: 'Дата внедрения последеней доработки',flex:.7}
        
       
    ];
    const rows = [...state.processes.map((z,y) => ({...z,rowId:y+=1}))];
    let styles = {
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
          },
          '& .MuiDataGrid-iconSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            borderRight: `1px solid ${
              theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
          },
          '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
            borderBottom: `1px solid ${
              theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
          },
          '& .MuiDataGrid-cell': {
            color:
              theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
          },
          '& .MuiPaginationItem-root': {
            borderRadius: 0,
          },
            
    }

    return (
        state.isLoading  ? <Loader/> :
        <div style={{marginTop:25}}>
            <div>
                <Box>
                    <Typography variant="h5">Реестр процессов</Typography>
                </Box>
                    <Box sx={{ height: 2150, width: '100%' }}>
                        <ThemeProvider theme={theme}>
                            <DataGrid
                            sx={{
                                "& .MuiDataGrid-columnHeaderTitle": {
                                  whiteSpace: "normal",
                                  lineHeight: "normal",
                                  fontSize:11
                                },
                                ".MuiDataGrid-cellContent":{whiteSpace:'normal',wordBreak:'break-word', fontSize:10,p:.5 },
                                ...styles
                              }}
                                rows={rows}
                                columns={columns}
                                getRowHeight={() => 'auto'}
                                pageSize={50}
                                rowsPerPageOptions={[50]}
                                headerHeight={90} 
                                onCellClick={(process) => goToProcessCard(`/testProcess/${process.id}`)}
                            />
                        </ThemeProvider>
                    </Box>
            </div>
        </div> 
    )
}

export default Processes;