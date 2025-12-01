import estilo from './Gerenciar.module.css'

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';




const API_URL = 'http://127.0.0.1:8000';

export function Mudancas(){
    const [entradasaida, setEntradasaida] = useState([]); 
    const access_token = localStorage.getItem('access_token');
    const id_produto = localStorage.getItem("id-produto");

    const obterDados = async() => {
        try {
            const responseEntradasaida = await axios.get(`${API_URL}/api/entradasaida/`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                  }
            });
            
            setEntradasaida(responseEntradasaida.data)
             
        }catch (error) {
            console.log('error: ', error)
        }
    };

    const limparDado = async () => {
        localStorage.setItem("id-produto","")
    }

    useEffect(() => {
        obterDados();
    }, []);

    return (
        <main className={estilo.container}>
            <section>
                <h1>Produtos: </h1>
                <Link to={'/gerenciar'}>
                    <button className={estilo.criar} onClick={() =>limparDado()}>
                         Retornar
                    </button>
                </Link>
                {entradasaida.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Responsavel</th>
                                <th>Horario alteração</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entradasaida
                            .filter((e) => Number(e.produto) === Number(id_produto))
                            .map ((entradasaida) =>{
                                return (
                                        <tr key={entradasaida.id}>
                                            <td>{entradasaida ? entradasaida.responsavel : 'N/A'}</td>
                                            <td>{entradasaida ? entradasaida.ultimaAlteracao : 'N/A'}</td>
                                        </tr>
                                    )
                            })}
                        </tbody>
                    </table>
                ):(
                    <table>
                        <thead>
                            <tr>
                                <th>Nenhum Produto Cadastrado</th>
                            </tr>
                        </thead>
                    </table>
                )}
            </section>

        </main>
    )
}