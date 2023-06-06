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
    height: 80,
    textAlign: 'center',
});

export default function Chat() {
    const [loading, setLoading] = React.useState(false);
    const [mensaje, setMensaje] = React.useState('');
    const [messages,setMessages]= React.useState([]);
    const [id_chat, setid_chat] = React.useState('');

    function processmessages(mensajeL){
        return(
            mensajeL.map((x, index) => {
                if(x[0] == 'GPT'){
                return(
                    <Container style={{ background: '#9ab2d9' }} sx={{minWidth:'100%', textAlign:'left'}} >
                        <Typography variant="h4">{x[0]}</Typography>
                        <Typography variant="h7" sx={{ml:5}}>{x[1]}</Typography>
                    </Container> 
                )
                } else {
                return(
                    <Container sx={{minWidth:'100%', textAlign:'left'}} >
                        <Typography variant="h4">{x[0]}</Typography>
                        <Typography variant="h7" sx={{ml:5}}>{x[1]}</Typography>
                    </Container>
                )
                }
            })
        );
    }

    function sendMessage(){
        if(mensaje == ''){
            return
        }
        setLoading(true)
        var toSend = {}
        let messages1 = messages.map((x) => x);
        messages1.push(["Usuario", mensaje])
        setMessages(messages1)
        console.log("ID_CHAT", id_chat)
        if(id_chat != ''){
            toSend = {mensaje:mensaje, id_chat:id_chat}
        } else {
            toSend = {mensaje:mensaje}
        }
        axios({
            method:'POST',
            url:"http://localhost:8000/chat",
            headers: {
                'Content-Type': 'multipart/form-data'},
            data: toSend,
            }).then(
            (res) => {
                if((res.data).hasOwnProperty('mensaje')){
                    messages1.push(["GPT", res.data.mensaje])
                    setMessages(messages1)
                    console.log(res.data)
                    setid_chat(res.data.id_chat)
                    setMensaje('');
                    setLoading(false);
                }
            }).catch(
                (err) => {
                    console.log("Error", err);
                    setMensaje('');
                    setLoading(false);
            });
        
    }

    return(
        <>
            <center>
                <Container sx={{minWidth:'100%', height:'75vh', overflowY:'scroll'}} >
                    <Container style={{ background: '#9ab2d9' }} sx={{minWidth:'100%', textAlign:'left'}} >
                        <Typography variant="h4">GPT</Typography>
                        <Typography variant="h7" sx={{ml:5}}>Hola!, a continuación escribe tu pregunta acerca de una búsqueda en particular</Typography>
                    </Container>
                    {processmessages(messages)}
                </Container>
            
                <MyMessageBox>
                    {loading ? <><Box sx={{ width: '100%'}}><LinearProgress /></Box></> : <></>}
                    <Container sx={{minWidth:'100%'}} >
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
                                <Button disabled={loading} variant="contained" onClick={sendMessage}><SendIcon /></Button>
                            </Grid>
                        </Grid>
                    </Container>
                </MyMessageBox>
            </center>
        </>
    )
}