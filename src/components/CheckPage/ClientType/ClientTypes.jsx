import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import React from "react";


const ClientTypes = ({state, goToClientType}) => {

    
    return (
        <Container maxWidth='xs'>
            <Link className="linkAdditional" to={"/clientType"}>Добавить тип клиента</Link>
            <TableContainer  sx={{maxWidth:500}} component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell align="right">Код</TableCell>
                                    <TableCell align="right">Название</TableCell>
                                    <TableCell align="right">Субъекты</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {state.clientTypes.map((clientType) => (
                            <TableRow
                                onClick={() => goToClientType(`/clientType/${clientType.id}`)}
                                hover={true}
                                key={clientType.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{clientType.id}</TableCell>
                                        <TableCell align="right">{clientType.code}</TableCell>
                                        <TableCell align="right">{clientType.name}</TableCell>
                                        <TableCell align="right">{clientType.subjectTypes.map(x => x.name).join()}</TableCell>
                                    </TableRow>
                                    
                                ))}
                                </TableBody>
                            </Table>
                    </TableContainer>
                </Container>
    )
}

export default ClientTypes;