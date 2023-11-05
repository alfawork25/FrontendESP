import React from "react";


import { 
    TextField,
    Container, 
    Typography,
    Stack,
    Button} from "@mui/material";

const BlockForm = ({sendData, formik}) => {

    return (
        <Container maxWidth="md">
          <Typography variant="h3" mt={10} textAlign="center">Наименование блока</Typography>
            <Stack m={5} spacing={3}>
                <TextField id="name" label="Блок" name="name" variant="outlined" onChange={formik.handleChange} value={formik.values.name}   />
                    <Button onClick={() => sendData(formik.values)}>Сохранить</Button>
            </Stack>
        </Container>

    );
}


export default BlockForm;