import estilo from "./Login.module.css"
import axios from 'axios';
import React, {use, useState} from 'react';
import {data, useNavigate} from 'react-router-dom'

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemaLogin = z.object({
    username: z.string()
        .min(1,'Informe seu usuário')
        .max(15, 'Informe um usuário de até 15 caracteres'),
    password: z.string()
        .min(1,'Informe sua senha')
        .max(15, 'Informe uma senha de até 15 caracteres'),
})

const API_URL = 'http://127.0.0.1:8000'

export function Login(){
    const navigate = useNavigate();

    const{
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schemaLogin)
    })

    //  Função de login
    const enviarDadosFormulario = async(data) =>{
        try{
            const response = await axios.post(`${API_URL}/api/login/`,{
                            username: data.username,
                            password: data.password
                        });
            const {access, refresh, usuario } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem("user",data.username)
            navigate('/')
        }catch(error){
            console.error('erro no login', error);
            alert('credenciais inválidas')
        }
    }

    return(
        <main className={estilo.container}>
            <section>
                <h1>Faça login: </h1>
                <form onSubmit={handleSubmit(enviarDadosFormulario)}>
                    <label htmlFor="username">Nome: </label>
                    <input {...register('username')} type="text" name="username" placeholder="Digite seu nome" />
                    {errors.username && <p className={estilo.erro}>{errors.username.message}</p>}
                    
                    <label htmlFor="password">Senha: </label>
                    <input {...register('password')} type="password" name="password" placeholder="Digite sua senha" />
                    {errors.password && <p className={estilo.erro}>{errors.password.message}</p>}

                    <button type="submit">Logar</button>
                </form>
                
            </section>

        </main>
    )
}