import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export default function NotFound() {
    return (
        <div>
            <center>
                <h1>Ups! Te perdiste.</h1>
                <p>Aquí un link para regresar</p>
                <Link to="/"><Button variant="contained">Home</Button></Link>
            </center>
        </div>
    )
}