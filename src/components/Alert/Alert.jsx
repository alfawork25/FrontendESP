import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function AlertCustom({setAlert}) {
  
    const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: '30%',position:'fixed',top:'20px',right:'0px' }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                setAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Маршрут успешно сохранен
        </Alert>
      </Collapse>
    </Box>
  );
}