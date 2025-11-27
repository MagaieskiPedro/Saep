import {Routes, Route} from 'react-router-dom';
import { Cadastro } from '../Paginas/Cadastro';
import { Login } from '../Paginas/Login';
import { Corpo } from '../Componentes/Corpo';
import { Home } from '../Paginas/Home';

export function Rotas(){
    return (
        <Routes>
            <Route path='/' element={<Corpo/>}>
                <Route path='/' index element={<Home/>}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/cadastro' index element={<Cadastro />}></Route>
            </Route>
        </Routes>
    )
}