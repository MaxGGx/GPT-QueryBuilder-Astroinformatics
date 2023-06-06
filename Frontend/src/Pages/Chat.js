import React from "react";
import { Box, TextField, Button, Grid, Container, Stack, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { styled } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';



const MyMessageBox = styled('div')({
    overflow:'auto',
    display:'bottom',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 60,
    textAlign: 'center',
});

export default function Chat() {
    const [loading, setLoading] = React.useState(false);
    const [mensaje, setMensaje] = React.useState('');

    var messages = [];
    var id_chat = ''

    function sendMessage(mensaje){
        setLoading(true)
        if(id_chat != ''){
            toSend = {mensaje:mensaje, id_chat:id_chat}
        } else {
            toSend = {mensaje:mensaje}
        }
        axios.post("http://localhost:8000/Chat", toSend).then(
            (res) => {
                if((res.data).hasOwnPProperty('mensaje')){
                    messages.push(["GPT", res.data.mensaje])
                    id_chat = res.data.id_chat
                }
            }).catch(
                (err) => {
                    console.log("Error", err);
            });
    }

    return(
        <>
            <center>
                <Container style={{ background: '#9ab2d9' }} sx={{minWidth:'100%'}} >
                    <Container style={{ background: '#9ab2d9' }} sx={{minWidth:'100%', textAlign:'left'}} >
                        <Typography variant="h4">GPT</Typography>
                        <Typography variant="h7" sx={{ml:5}}>Mensaje generico XDD</Typography>
                    </Container>
                </Container>
            
                <MyMessageBox>
                    {loading ? <><Box sx={{ width: '100%'}}><LinearProgress /></Box></> : <></>}
                    <Container style={{ background: '#9ab2d9' }} sx={{minWidth:'100%'}} >
                        <Grid container sx={{minWidth:'100%'}}>
                            <Grid item xs={11}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Mensaje"
                                    color="secondary"
                                    multiline
                                    maxRows={2}
                                    value = {mensaje}
                                    onChange = {(newVal) => setMensaje(newVal.target.value)}
                                    sx={{minWidth:'100%'}}
                                    inputProps={{ maxLength: 200 }}
                                />  
                            </Grid>
                            <Grid item alignItems="stretch" style={{ display: "flex" }} xs={1}>
                                <Button disabled={loading} variant="contained"><SendIcon /></Button>
                            </Grid>
                        </Grid>
                    </Container>
                </MyMessageBox>
            </center>
        </>
    )
}