import estilo from './Cabecalho.module.css';
import { Link } from "react-router-dom"

export function Cabecalho(){
    const deslogar = async() => {
        localStorage.setItem('access_token', "");
        localStorage.setItem('refresh_token', "");
        localStorage.setItem("user", "")
    }
    const nome = localStorage.getItem("user")
    console.log(nome)
    return (
        <header className={estilo.container}>
            <section>
            <h1><Link to="/">SAEP</Link></h1>

            {nome ? (
                <h2>{nome}</h2>
            ):(
                <p></p>
            )}
            </section>

            
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