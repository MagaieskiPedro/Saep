import {Routes, Route} from 'react-router-dom';
import { Cadastro } from '../Paginas/Cadastro';
import { Login } from '../Paginas/Login';
import { Corpo } from '../Componentes/Corpo';
import { Home } from '../Paginas/Home';
import { CriarProduto } from '../Paginas/CriarProduto';
import { Gerenciar } from '../Paginas/Gerenciar';
import { Editar } from '../Paginas/Editar';

export function Rotas(){
    return (
        <Routes>
            <Route path='/' element={<Corpo/>}>
                <Route path='/' index element={<Home/>}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/cadastro' element={<Cadastro />}></Route>
                <Route path='/criar' element={<CriarProduto />}></Route>
                <Route path='/gerenciar' element={<Gerenciar />}></Route>
                <Route path='/editar' element={<Editar/>}></Route>
            </Route>
        </Routes>
    )
}