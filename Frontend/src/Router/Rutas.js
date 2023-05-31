import React from 'react';
import { Route, Routes } from "react-router";
import  Home  from "../Pages/Home";
import Chat from "../Pages/Chat";
import Navbar from '../Components/Navigation/Navbar';
import NotFound from '../Pages/NotFound';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Si se desean mas paginas basta con agregar sus datos aquí e importar el componente que sostiene la vista completa.
const links = [
    {
        path:"/",
        name:"Home",
        element:<Home/>
    },
    {
        path:"/Chat",
        name:"Chat",
        element:<Chat />
    }
]

// Para el manejo de los temas en el sitio, si se desean más, pueden agregarse utilizando la API de os componentes de MUI (lo que sostiene el frontend)
const themes = {
    dark: 
    createTheme({
        palette: {
        mode: 'dark',
        }
    }), 
    light:
    createTheme({
        palette: {
        mode: 'light',
        }
    }),
    }

// Función que maneja el cambio de rutas
export default function Rutas(){
    const [isDarkMode, setDarkMode] = React.useState(false);

    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
    };
    
    return(
        <>
            <ThemeProvider theme={isDarkMode ? themes.dark : themes.light}>
                <CssBaseline />
                <Navbar pages={links} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="Chat" element={<Chat />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </ThemeProvider>
        </>
    )
}
