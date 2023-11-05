import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Container} from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProcessOneLevels } from "../../../features/ProcessOneLevel/processOneLevel";
import { useEffect } from "react";



const ProcessOneLevels = () => {

    const state = useSelector(state => state.processOneLevel);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProcessOneLevels());
    },[])

    function goToProcessOneLevel(url) {
        navigate(url);
    }

    
    return (
        <Container maxWidth='xs'>
            <Link className="linkAdditional" to={"/processOneLevel"}>Добавить процесс 1-го уровня</Link>
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
                        {state.processOneLevels.map((processFirstLevel) => (
                            <TableRow
                                onClick={() => goToProcessOneLevel(`/processOneLevel/${processFirstLevel.id}`)}
                                hover={true}
                                key={processFirstLevel.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{processFirstLevel.id}</TableCell>
                                        <TableCell align="right">{processFirstLevel.code}</TableCell>
                                        <TableCell align="right">{processFirstLevel.name}</TableCell>
                                    </TableRow>
                                    
                                ))}
                                </TableBody>
                            </Table>
                    </TableContainer>
                </Container>
    )
}

export default ProcessOneLevels;