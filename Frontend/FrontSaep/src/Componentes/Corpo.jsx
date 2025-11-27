import { Cabecalho } from "./Cabecalho";
import { Outlet } from "react-router-dom";
import { Rodape } from "./Rodape";

export function Corpo(){
    return (
        <>  
            <Cabecalho />
            <Outlet />
            <Rodape />
        </>
    )
}