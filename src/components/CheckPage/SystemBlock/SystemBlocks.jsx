import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Container} from "@mui/system";
import { Link } from "react-router-dom";
import React from "react";



const SystemBlocks = ({state, goToSystemBlock}) => {

    return (
        <Container maxWidth='xs'>
            <Link className="linkAdditional" to={"/systemBlock"}>Добавить блок системы</Link>
            <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell align="right">Код</TableCell>
                                    <TableCell align="right">Название</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {state.systemBlocks.map((systemBlock) => (
                            <TableRow
                                onClick={() => goToSystemBlock(`/systemBlock/${systemBlock.id}`)}
                                hover={true}
                                key={systemBlock.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{systemBlock.id}</TableCell>
                                        <TableCell align="right">{systemBlock.code}</TableCell>
                                        <TableCell align="right">{systemBlock.name}</TableCell>
                                    </TableRow>
                                    
                                ))}
                                </TableBody>
                            </Table>
                    </TableContainer>
                </Container>
    )
}

export default SystemBlocks;