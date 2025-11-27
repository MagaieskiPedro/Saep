import estilo from './Home.module.css';


export function Home(){

    return(
        <main className={estilo.container}>
            <section>
                <h1>Monitoramento de Estoque</h1>
                
                <p>
                    Gestão de estoque para aparelhos eletronicos
                    monitore em tempo real a movimentação de aparelhos eletronicos na
                    sua lojinha.
                </p>
                
            </section>
            
        </main>
    )
}