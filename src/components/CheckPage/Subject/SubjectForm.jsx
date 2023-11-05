import React from "react";

import { 
    TextField,
    Container, 
    Typography,
    Stack,
    Button,
    TableCell,TableHead,TableRow,TableBody,TableContainer,Table,Paper } from "@mui/material";


const SubjectForm = ({state,sendData,formik}) => {

    return (
        <Container maxWidth="md">
        <Typography variant="h3" mt={10} textAlign="center">Субъект</Typography>
          <Stack m={5} spacing={3}>
              <TextField id="subject" label="Субъект" name="subject" variant="outlined" onChange={formik.handleChange} value={formik.values.subject}   />
                <Button onClick={() => sendData()}>Сохранить</Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="center">Краткое наименование</TableCell>
                                <TableCell align="center">Полное наименование</TableCell>
                                <TableCell align="center">Коды проверок</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.checkBlocks.map((checkBlock) => (
                                <TableRow
                                    key={checkBlock.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {checkBlock.id}
                                    </TableCell>
                                    <TableCell align="center">{checkBlock.shortName}</TableCell>
                                    <TableCell align="center">{checkBlock.fullName}</TableCell>
                                    <TableCell align="center">{checkBlock.checkCodes.map(code => code.name)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> 
                    </TableContainer>
          </Stack>
      </Container>
    )
}

export default SubjectForm;