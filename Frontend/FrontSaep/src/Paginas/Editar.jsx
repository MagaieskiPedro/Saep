import estilo from "./Editar.module.css"

import { useEffect, useState } from 'react';
import {data, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form';

import { Link } from 'react-router-dom';
import axios from 'axios';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const API_URL = 'http://127.0.0.1:8000'

const schemaEstoque = z.object({
    responsavel: z.string()
        .min(1,'Informe o responsavel por essa mudança')
        .max(50, 'Informe o responsavel por essa mudança com até 50 caracteres'),
    quantidade: z.number()
        .gte(2, 'Informe a quantidade do produto no estoque superior a 2'),
    preco: z.number()
        .gte(2, 'Informe o preço do produto superior a 2'),
})

export function Editar(){
    const navigate = useNavigate();
    
    const access_token = localStorage.getItem('access_token');
    const idEstoque = localStorage.getItem("id-estoque");
    const responsavelId = localStorage.getItem("id-produto");

    const{
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaEstoque)
    })

    useEffect(() => {
        if (idEstoque ) {
            axios.get(`/estoque/${idEstoque }`)
                .then(res => {
                    reset({quantidade: res.data.quantidade,
                        preco:res.data.preco,
                        responsavel:""
                    }); // 🔹 aqui acontece o autocomplete
                    console.log(res.data) // terminar aqui
                })
                .catch(err => console.error("Erro ao carregar estoque:", err));
            
        }
        
    }, [idEstoque , reset]);



    const alterarEstoque = async (data) =>{
        try{
            const responseEstoque = await axios.patch(`${API_URL}/api/estoque/${idEstoque }/`, {
                'quantidade': data.quantidade,
                'preco': data.preco,
            },{
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
                },
            });
            console.log(responseEstoque)

            const responseInOut = await axios.post(`${API_URL}/api/entradasaida/`, {
                'responsavel': data.responsavel,
                'produto': responsavelId,
            },{
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
                },
            });

            console.log(responseInOut)
            localStorage.setItem("id-estoque", "")
            localStorage.setItem("id-produto", "")

            navigate('/gerenciar')
        }catch(error){
            console.error('erro no cadastro', error);
            alert('erro ao cadastrar')
        }
    }

    return (
        <main className={estilo.container}>
            <section>
                <h1></h1>
                <form onSubmit={handleSubmit(alterarEstoque)}>
                    <label htmlFor="responsavel">Responsavel: </label>
                    <input {...register('responsavel')} type="text" name="responsavel" />
                    {errors.responsavel && <p>{errors.responsavel.message}</p>}
                    

                    <label htmlFor="quantidade">Quantidade: </label>
                    <input {...register('quantidade',{
                                    setValueAs: (quantidade) => Number(quantidade),
                                })} type="number" name="quantidade"/>
                    {errors.quantidade && <p>{errors.quantidade.message}</p>}
 

                    <label htmlFor="preco">Preco: </label>
                    <input {...register('preco',{
                                    setValueAs: (preco) => Number(preco),
                                })} type="number" name="preco" />
                    {errors.armazenamento && <p>{errors.armazenamento.message}</p>}

                    <button type="submit">Cadastrar Produto</button>
                </form>
            </section>
        </main>
    )

}