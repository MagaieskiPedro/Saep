import estilo from './Cabecalho.module.css';
import { Link } from "react-router-dom"

export function Cabecalho(){
    return (
        <header className={estilo.container}>
            <h1>SAEP</h1>
            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/cadastro">Cadastro</Link></li>
                    <li><Link to="/"></Link></li>
                    <li><Link to="/"></Link></li>
                </ul>
            </nav>
        </header>
    )
}