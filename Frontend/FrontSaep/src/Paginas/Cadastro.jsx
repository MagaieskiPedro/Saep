import estilo from "./Cadastro.module.css"

import axios from 'axios';
import React, {use,useState} from 'react';

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom'


const API_URL = 'http://127.0.0.1:8000'

const schemaLogin = z.object({
    username: z.string()
        .min(1,'Informe seu nome')
        .max(15, 'Informe um nome de até 15 caracteres'),
    password: z.string()
        .min(1,'Informe sua senha')
        .max(15, 'Informe uma senha de até 15 caracteres'),
    password2: z.string()
        .min(1,'Informe novamente sua senha')
        .max(15, 'Confirme uma senha de até 15 caracteres'),
})

export function Cadastro(){
    // navegação por rotas 
    const navigate = useNavigate();

    // recebe dados do formulario e valida/ devolve erros
    const{
            register,
            handleSubmit,
            formState: { errors }
        } = 
    useForm({
            resolver: zodResolver(schemaLogin)
    })

    // Função de post do formulario
    const enviarDadosFormulario = async(data) =>{
        console.log(`Dados: ${data}`)
        try{
            const response = await axios.post(`${API_URL}/api/cadastro/`,{
                  'username': data.username,
                  'password': data.password,
                  'password2': data.password2,
                            });
            const cadastro = response.data;
            // console.log(cadastro)
            navigate('/')
        }catch(error){
            console.error('erro no cadastro: ', error);
            alert('erro no cadastro:')
        }
    }


    return(
        
        <main className={estilo.container}>
            <section>
                <h1>Cadastre-se</h1>
                <form onSubmit={handleSubmit(enviarDadosFormulario)} >
                    <label htmlFor="username">Nome: </label>
                    <input {...register('username')} type="text" name="username" placeholder="Digite seu nome"/>
                    {errors.username && <p className={estilo.erro}>{errors.username.message}</p>}
                    
                    <label htmlFor="password">Senha: </label>
                    <input {...register('password')} type="password" name="password" placeholder="Digite sua senha"/>
                    {errors.password && <p className={estilo.erro}>{errors.password.message}</p>}
                    
                    <label htmlFor="password2">Confirme sua senha: </label>
                    <input {...register('password2')} type="password" name="password2" placeholder="Confirme aqui sua senha"/>
                    {errors.password2 && <p className={estilo.erro}>{errors.password2.message}</p>}
                    
                    <button type="submit">Cadastrar</button>
                </form>

                
            </section>

        </main>
    )

}