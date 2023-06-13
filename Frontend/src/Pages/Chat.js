import React from "react";
import { Box, TextField, Button, Grid, Container, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import axios from 'axios';
import { styled } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';
import ReactMarkdown from 'react-markdown';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Linkify from "linkify-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const renderCodeBlock = ({ language, value }) => {
    return <SyntaxHighlighter style={dark} language='python'>{value}</SyntaxHighlighter>;
  };

//const test = '```python\n# importar las librerias pyvo y matplotlib\nfrom pyvo.dal import tap\nfrom matplotlib import pyplot as plt\n\n# URL del servicio TAP\ntap_url = "http://dc.zah.uni-heidelberg.de/tap"\n\n# Crear una conexión con el servicio TAP\nservice = tap.TAPService(tap_url)\n\n# Construir la consulta\nquery = \'\'\'\nSELECT access_url\nFROM ivoa.obscore\nWHERE target_name = \'Jupiter\'\n  AND dataproduct_type = \'image\'\n\'\'\'\n\n# Ejecutar la consulta\nresult = service.search(query)\n\n# Obtener la URL de la imagen de Júpiter\nif len(result) > 0:\n    access_url = result[\'access_url\'][0]\n    print(access_url)\n    print("URL de la imagen de Júpiter:", access_url)\nelse:\n    print("No se encontraron imágenes de Júpiter en el espectro visible.")\n```'

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
                        <Container style={{ background: '#9ba3c9' }} sx={{minWidth:'100%', textAlign:'left'}} >
                            <Typography variant="h4" color='black'>{x[0]}</Typography>
                            {/*<Typography variant="h7" sx={{ml:5}}>{x[1]}</Typography>*/}
                            <Typography color='black'><ReactMarkdown renderers={{ code: renderCodeBlock }}>{x[1]}</ReactMarkdown></Typography>
                        </Container> 
                    )
                } else if (x[0] == 'Ejecución API de búsqueda'){
                    return(
                        <Container sx={{minWidth:'100%', textAlign:'left'}} >
                            <Typography variant="h4">{x[0]}</Typography>
                            {/*<Typography variant="h7" sx={{ml:5}}>{x[1]}</Typography>*/}
                            <ReactMarkdown renderers={{ code: renderCodeBlock }}>{x[1]}</ReactMarkdown>
                        </Container>
                    )

                } else {
                    return(
                        <Container sx={{minWidth:'100%', textAlign:'left'}} >
                            <Typography variant="h4">{x[0]}</Typography>
                            {/*<Typography variant="h7" sx={{ml:5}}>{x[1]}</Typography>*/}
                            <ReactMarkdown renderers={{ code: renderCodeBlock }}>{x[1]}</ReactMarkdown>
                        </Container>
                    )
                }
            })
        );
    }

    function execRes(){
        setLoading(true)
        var toSend = {mensaje: messages[messages.length-1][1], id_chat:id_chat}
        console.log(toSend)
        let messages1 = messages.map((x) => x);
        axios({
            method:'POST',
            url:"http://localhost:8001/code",
            headers: {
                'Content-Type': 'multipart/form-data'},
            data: toSend,
            }).then(
            (res) => {
                if((res.data).hasOwnProperty('resultado')){
                    messages1.push(["Ejecución API de búsqueda", res.data.resultado])
                    setMessages(messages1)
                    console.log(res.data)
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

    function sendMessage(){
        if(mensaje == ''){
            return
        }
        setLoading(true)
        var toSend = {}
        let messages1 = messages.map((x) => x);
        messages1.push(["Usuario", mensaje])
        setMessages(messages1)
        if(id_chat != ''){
            toSend = {mensaje:mensaje, id_chat:id_chat}
        } else {
            toSend = {mensaje:mensaje}
        }
        if(mensaje == 'EXAMPLE'){
            toSend = {mensaje:'EXAMPLE', id_chat:'55'}
        }
        if(mensaje == 'EXAMPLE2'){
            toSend = {mensaje:'EXAMPLE2', id_chat:'57'}
        }
        if(mensaje == 'EXAMPLE3'){
            toSend = {mensaje:'EXAMPLE3', id_chat:'58'}
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
                    <Container style={{ background: '#9ba3c9' }} sx={{minWidth:'100%', textAlign:'left'}} >
                        <Typography variant="h4" color='black'>GPT</Typography>
                        <Typography variant="h7" color='black' sx={{ml:5}}>Hola!, a continuación escribe tu pregunta acerca de una búsqueda en particular</Typography>
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
                                    sx={{minWidth:'100%', my:1}}
                                    inputProps={{ maxLength: 200 }}
                                    onKeyDown={(ev) => {
                                        console.log(`Pressed keyCode ${ev.key}`);
                                        if (ev.key === 'Enter') {
                                          sendMessage();
                                          ev.preventDefault();
                                        }
                                    }}
                                />  
                            </Grid>
                            <Grid item alignItems="stretch" style={{ display: "flex" }} xs={1}>
                                <Button type='submit' disabled={loading} variant="contained" onClick={sendMessage} sx={{mx:1}}><SendIcon /></Button>
                                <Button type='submit' disabled={loading} variant="contained" color='secondary' sx={{mx:1}} onClick={execRes}><FindInPageIcon /></Button>
                            </Grid>
                        </Grid>
                    </Container>
                </MyMessageBox>
            </center>
        </>
    )
}