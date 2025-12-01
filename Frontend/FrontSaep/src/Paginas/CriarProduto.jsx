import estilo from "./CriarProduto.module.css"
import axios from 'axios';

import React, {use, useState} from 'react';
import {data, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form';

import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemaProduto = z.object({
    modelo: z.string()
        .min(1,'Informe o modelo')
        .max(50, 'Informe um modelo de até 50 caracteres'),
    tipo: z.string()
        .min(1, 'Informe o tipo do produto'),
    armazenamento: z.number()
        .gte(5,"Informe a quantidade de armazenamento acima de 5 Gb")
        .lte(30000, "Informe a quantidade de armazenamento inferior a 30 Tb"),
    largura: z.number()
        .gte(5,"Informe a largura  acima de 5 mm")
        .lte(1350, "Informe a largura  inferior a 135 cm"),
    altura: z.number()
        .gte(5,"Informe a altura acima de 5 mm")
        .lte(30000, "Informe a altura inferior a 620 cm"),
    tensao: z.number()
        .gte(110,"Informe a tensão acima de 110 V")
        .lte(220, "Informe a tensão inferior a 220 V"),
    conectividade: z.string()
        .min(1,'Informe os tipos de conectividade com mais de 1 caractere')
        .max(50, 'Informe os tipos de conectividade com até 120 caracteres'),
    quantidade: z.number()
        .gte(2, 'Informe a quantidade do produto no estoque superior a 2'),
    preco: z.number()
        .gte(2, 'Informe o preço do produto superior a 2'),
})

const API_URL = 'http://127.0.0.1:8000'

export function CriarProduto(){

    const navigate = useNavigate();
    const access_token = localStorage.getItem('access_token')

    const{
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(schemaProduto),
    })
    
    const obterForm = async (data) => {
        console.log(data)
        try{
            const responseProduto = await axios.post(`${API_URL}/api/produto/`,{
                'modelo':data.modelo,
                'tipo':data.tipo,
                'armazenamento':data.armazenamento,
                'largura':data.largura,
                'altura':data.altura,
                'tensao':data.tensao,
                'conectividade':data.conectividade,
            },{
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
                },
            });

            console.log(responseProduto)
            const produtoId = responseProduto.data.id;

            const responseEstoque = await axios.post(`${API_URL}/api/estoque/`, {
                produto: produtoId,
                quantidade: data.quantidade,
                preco: data.preco,
            }, {
                headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
                }
            });
            console.log(responseEstoque)

            navigate('/gerenciar')
        }catch(error){
            console.error('erro no cadastro', error);
            alert("erro ao criar produto!")
        }
    }
            return (
            <main className={estilo.container}> 
                <section>
                    <h1></h1>
                    <form onSubmit={handleSubmit(obterForm)}>
                        
                        <label htmlFor="modelo">Modelo: </label>
                        <input {...register('modelo')} type="text" name="modelo" />
                        {errors.modelo && <p>{errors.modelo.message}</p>}

                        <label htmlFor="tipo">Tipo: </label>
                        <select {...register('tipo')} name="tipo" id="tipo">
                            <option value="Notebook">Notebook</option>
                            <option value="Smartphone">Smartphone</option>
                            <option value="TV Smart">TV Smart</option>
                        </select>
                        {errors.tipo && <p>{errors.tipo.message}</p>}

                        <label htmlFor="armazenamento">Armazenamento: </label>
                        <input {...register('armazenamento',{
                                        setValueAs: (armazenamento) => Number(armazenamento),
                                    })} type="number" name="armazenamento" />
                        {errors.armazenamento && <p>{errors.armazenamento.message}</p>}

                        <label htmlFor="largura">Largura: </label>
                        <input {...register('largura',{
                                        setValueAs: (largura) => Number(largura),
                                    })} type="number" name="largura" />
                        {errors.largura && <p>{errors.largura.message}</p>}


                        <label htmlFor="altura">Altura:  </label>
                        <input {...register('altura',{
                                        setValueAs: (altura) => Number(altura),
                                    })} type="number" name="altura" />
                        {errors.altura && <p>{errors.altura.message}</p>}

                        <label htmlFor="tensao">Tensao: </label>
                        <input {...register('tensao',{
                                        setValueAs: (tensao) => Number(tensao),
                                    })} type="number" name="tensao" />
                        {errors.tensao && <p>{errors.tensao.message}</p>}
                        
                        <label htmlFor="conectividade">Conectividade: </label>
                        <input {...register('conectividade')} type="text" name="conectividade" />
                        {errors.conectividade && <p>{errors.conectividade.message}</p>}
                        
                        <label htmlFor="quantidade">Quantidade no Estoque: </label>
                        <input
                            {...register('quantidade', {
                            setValueAs: (quantidade) => Number(quantidade),
                            })}
                            type="number"
                            name="quantidade"
                        />
                        {errors.quantidade && <p>{errors.quantidade.message}</p>}

                        <label htmlFor="preco">Preço: </label>
                        <input
                            {...register('preco', {
                            setValueAs: (preco) => Number(preco),
                            })}
                            type="number"
                            name="preco"
                        />
                        {errors.preco && <p>{errors.preco.message}</p>}


                        <button type="submit">Cadastrar Produto</button>
                    </form>
                </section>
            </main>
        )
}