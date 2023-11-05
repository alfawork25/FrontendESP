import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Container} from "@mui/system";
import { Link } from "react-router-dom";
import React from "react";



const SystemTypes = ({state, goToSystemType}) => {

    return (
        <Container maxWidth='xs'>
            <Link className="linkAdditional" to={"/systemType"}>Добавить тип системы</Link>
            <TableContainer sx={{maxWidth:500}} component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell align="right">Код</TableCell>
                                    <TableCell align="right">Название</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {state.systemTypes.map((systemType) => (
                            <TableRow
                                onClick={() => goToSystemType(`/systemType/${systemType.id}`)}
                                hover={true}
                                key={systemType.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{systemType.id}</TableCell>
                                        <TableCell align="right">{systemType.code}</TableCell>
                                        <TableCell align="right">{systemType.name}</TableCell>
                                    </TableRow>
                                    
                                ))}
                                </TableBody>
                            </Table>
                    </TableContainer>
                </Container>
    )
}

export default SystemTypes;