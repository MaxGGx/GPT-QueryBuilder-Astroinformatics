import React from "react";
import { Box, TextField, Button, Grid } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '25px',
    width: '100%',
    heigth:'100%',
    boxShadow: 24,
    p: 4,
  };

export default function Chat() {
    return(
        <Box style={style}>
            <Grid container>
                <Grid item>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Mensaje"
                    color="secondary"
                    multiline
                    maxRows={4}
                    />  
                </Grid>
                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                    <Button variant="contained"><SendIcon /></Button>
                </Grid>
            </Grid>
        </Box>
        
    )
}