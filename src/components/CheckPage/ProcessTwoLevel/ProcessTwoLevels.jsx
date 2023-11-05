import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Container} from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProcessTwoLevels } from "../../../features/ProcessTwoLevel/ProcessTwoLevel";
import { useEffect } from "react";



const ProcessTwoLevels = () => {

    const state = useSelector(state => state.processTwoLevel);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProcessTwoLevels());
    },[])

    function goToProcessTwoLevel(url) {
        navigate(url);
    }
   
    return (
        <Container maxWidth='xs'>
            <Link className="linkAdditional" to={"/processTwoLevel"}>Добавить процесс 2-го уровня</Link>
            <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                        </TableHead>
                        <TableBody>
                        {state.processTwoLevels.map((processTwoLevel) => (
                            <TableRow
                                onClick={() => goToProcessTwoLevel(`/processTwoLevel/${processTwoLevel.id}`)}
                                hover={true}
                                key={processTwoLevel.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{processTwoLevel.id}</TableCell>
                                        <TableCell align="right">{processTwoLevel.code}</TableCell>
                                        <TableCell align="right">{processTwoLevel.name}</TableCell>
                                    </TableRow>
                                    
                                ))}
                                </TableBody>
                            </Table>
                    </TableContainer>
                </Container>
    )
}

export default ProcessTwoLevels;