import { AddOutlined } from "@mui/icons-material";
import { Button, Container, Divider, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography  } from "@mui/material";
import React from "react";
import ModificationDialog from "../ModalDialog/ModificationDialog";



const Modification = ({sendData,getRevisionByIdHandler,resetState,deleteRevision,state,tempData}) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (revisionId) => {
    if(revisionId) {
        getRevisionByIdHandler(revisionId);
    }
    setOpen(true);
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

    return <Container>
        
        <Typography m={1.5} component='h5'>{tempData.name}</Typography>
        <div>
            <div>
                <Button sx={{m:1}} variant="outlined" onClick={() => handleClickOpen(0)} startIcon={<AddOutlined/>}>
                        Доработки
                </Button>
            </div>
           
            <Divider/>
            <ModificationDialog open={open} state={state} tempData={tempData} sendData={sendData} handleClose={handleClose}/>
            <div style={{margin:5}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Название</TableCell>
                                <TableCell>Действие</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            state.revisions.map(x => 
                            <TableRow onClick={() => handleClickOpen(x.id)} hover={true}>
                                <TableCell>{x.id}</TableCell>
                                <TableCell>{x.name}</TableCell>
                                <TableCell width={25} ><Button onClick={(event) => {
                                    event.stopPropagation();
                                    deleteRevision(x.id);
                                }} size="small" variant="outlined" color="error">Удалить</Button></TableCell>
                            </TableRow>
                            )
                        }
                       
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
        </div>
    </Container>
}

export default Modification;



  
