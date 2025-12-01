
import estilo from './Gerenciar.module.css'

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus,faPenToSquare,faTrash } from "@fortawesome/free-solid-svg-icons";



const API_URL = 'http://127.0.0.1:8000';

export function Gerenciar(){

    const [produto, setProduto] = useState([]); 
    const [estoques, setEstoques] = useState([]); 
    const access_token = localStorage.getItem('access_token')


    const obterDados = async() => {
        try {
            const responseProdutos = await axios.get(`${API_URL}/api/produto/`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                  }
            });
            const responseEstoque = await axios.get(`${API_URL}/api/estoque/`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                  }
            });
            setProduto(responseProdutos.data)
            setEstoques(responseEstoque.data)
        }catch (error) {
            console.log('error: ', error)
        }
    };

    
    const editarDado = async (estoque,produto) => {
        localStorage.setItem("id-estoque",estoque)
        localStorage.setItem("id-produto",produto)
    }

    const deletarDado = async (IDNTY) => {
        try{
           const response = await axios.delete(`${API_URL}/api/produto/${IDNTY}/`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                  }
            });
            obterDados();
        }catch (error) {
            console.log('errinho: ', IDNTY, " - ",  error)
        }
    }

    useEffect(() => {
        obterDados();
    }, []);


    return (
        <main className={estilo.container}>
            <section>
                <h1>Produtos: </h1>
                <Link to={'/criar'}>
                    <button className={estilo.criar}>
                        <FontAwesomeIcon icon={faFileCirclePlus} size="lg"/>
                         Criar Produto
                    </button>
                </Link>
                {produto.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Modelo</th>
                                <th>Tipo</th>
                                <th>Armazenamento</th>
                                <th>Largura</th>
                                <th>Altura</th>
                                <th>Tensao</th>
                                <th>Conectividade</th>
                                <th>Quantidade</th>
                                <th>Preco</th>
                                <th>Editar</th> 
                                <th>Deletar</th>
                                <th>Alterações</th>  
                            </tr>
                        </thead>
                        <tbody>
                            {produto.map ((produto) =>{
                                const estoque = estoques.find((e) => e.produto === produto.id);
                        
                                return (
                                    <tr key={produto.id}>
                                        <td>{produto.modelo}</td>
                                        <td>{produto.tipo}</td>
                                        <td>{produto.armazenamento}</td>
                                        <td>{produto.largura}</td>
                                        <td>{produto.altura}</td>
                                        <td>{produto.tensao}</td>
                                        <td>{produto.conectividade}</td>
                                        <td>{estoque ? estoque.quantidade : 'N/A'}</td>
                                        <td>{estoque ? estoque.preco : 'N/A'}</td>
                                        <td>
                                            <Link to={`/editar`} >
                                                <button className={estilo.editar} onClick={() =>editarDado(estoque.id,produto.id)}><FontAwesomeIcon icon={faPenToSquare} /></button> 
                                            </Link>
                                        </td>
                                        <td>
                                            <button className={estilo.deletar} onClick={() =>deletarDado(produto.id)}><FontAwesomeIcon icon={faTrash}  size="sm"/></button>
                                        </td> 
                                        {/* //Aqui exibir o responsavel e datas de mundança de acordo com id do produto */}
                                        <td>
                                            <Link to={`/mudancas`} >
                                                <button className={estilo.consultar} onClick={() =>editarDado(estoque.id,produto.id)}><FontAwesomeIcon icon={faPenToSquare}  size="sm"/></button>
                                            </Link>
                                        </td> 
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