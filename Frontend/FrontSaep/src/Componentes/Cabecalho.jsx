import estilo from './Cabecalho.module.css';
import { Link } from "react-router-dom"

export function Cabecalho(){
    const deslogar = async() => {
        localStorage.setItem('access_token', "");
        localStorage.setItem('refresh_token', "");
    }
    return (
        <header className={estilo.container}>
            <h1><Link to="/">SAEP</Link></h1>
            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/cadastro">Cadastro</Link></li>
                    <li><Link to="/criar">Criar Produto</Link></li>
                    <li><Link to="/gerenciar">Gerenciar</Link></li>
                    <li><Link to="/" onClick={deslogar}>Logoff</Link></li>
                </ul>
            </nav>
        </header>
    )
}