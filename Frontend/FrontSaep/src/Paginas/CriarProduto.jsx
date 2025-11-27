import estilo from "./Login.module.css"
import axios from 'axios';
import React, {use, useState} from 'react';
import {data, useNavigate} from 'react-router-dom'

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemaLogin = z.object({
    modelo: z.string()
        .min(1,'Informe o modelo')
        .max(50, 'Informe um modelo de até 50 caracteres'),
    tipo: z.string().refine(
        (value) => value === "Notebook" || value === "Smartphone" || value === "TV Smart",
        {message: "Valor deve ser Notebook, Smartphone ou TV Smart"}
    ).transform((value) => value === 'Smartphone'),
    armazenamento: z.number()
        .gte(5,"Informe a quantidade de armazenamento acima de 5 Gb")
        .lte(30000, "Informe a quantidade de armazenamento inferior a 30 Tb"),
    largura: z.number()
        .gte(5,"Informe a largura  acima de 5")
        .lte(30000, "Informe a largura  inferior a 30k"),
    altura: z.number()
        .gte(5,"Informe a altura acima de 5")
        .lte(30000, "Informe a altura inferior a 30k"),
    tensao: z.number()
        .gte(110,"Informe a tensão acima de 1 V")
        .lte(220, "Informe a tensão inferior a 220 V"),
    conectividade: z.string()
        .min(1,'Informe os tipos de conectividade com mais de 1 caractere')
        .max(50, 'Informe os tipos de conectividade com até 120 caracteres'),   
})

const API_URL = 'http://127.0.0.1:8000'

export function CriarProduto(){
    
}