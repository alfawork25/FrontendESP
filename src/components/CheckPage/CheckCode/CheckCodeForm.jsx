import React from "react";

import { 
    TextField,
    Container, 
    Typography,
    Stack,
    Select,
    MenuItem,
    FormControl,
    InputLabel, 
    Button,
    TableCell,TableHead,TableRow,TableBody,TableContainer,Table,Paper } from "@mui/material";
import dayjs from 'dayjs';



const CheckCodeForm = ({ state,sendData, formik }) => {

    return (
        <Container maxWidth="md">
          <Typography variant="h3" mt={10} textAlign="center">Коды проверок</Typography>
            <Stack m={5} spacing={3}>
                <TextField id="title" label="Наименование" name="title" variant="outlined" onChange={formik.handleChange} value={formik.values.title} />
                <TextField id="code" label="Код" name="code" variant="outlined" onChange={formik.handleChange} value={formik.values.code} />
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Статус</InputLabel>
                        <Select labelId="demo-simple-select-helper-label" 
                                id="status"
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                label="Статус">
                            <MenuItem value="">
                                <em>Cтатусы</em>
                            </MenuItem>
                            <MenuItem value={false}>Есть ПИН</MenuItem>
                            <MenuItem value={true}>Новый/нет ПИНа</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={() => sendData(formik.values) }>Сохранить</Button>               
                    <Typography variant="h5">Список код запретов</Typography>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Код запрета</TableCell>
                                <TableCell align="right">Статус</TableCell>
                                <TableCell align="right">Дата начало</TableCell>
                                <TableCell align="right">Дата окончания</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.prohibitionCodes.map((code,index) => (
                                <TableRow
                                    key={code.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="right">{code.name}</TableCell>
                                    <TableCell align="right">{code.isActive ? "Активный" : "Истек"}</TableCell>
                                    <TableCell align="right">{dayjs(code.startDate).format("DD.MM.YYYY")}</TableCell>
                                    <TableCell align="right">{code.endDate !=null ? dayjs(code.endDate).format("DD.MM.YYYY") : code.endDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> 
                    </TableContainer>
                </Stack>
        </Container>

    );
}


export default CheckCodeForm;