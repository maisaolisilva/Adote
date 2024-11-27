'use client';

import Titulo from "@/components/Titulo";
import { TituloSecundario } from "@/components/TituloSecundário";
import styled from "styled-components";

const AboutContainer = styled.section`
    margin: 10px 10px;
    a {
        font-weight: 700;
    }
    h1{
        margin-bottom: 10px;
    }
    h2{
        margin: 10px 5px;
    }
    .negrito {
        font-weight: 700;
    }
`

export default function About() {
    return(
        <AboutContainer>
            <Titulo> Sobre a Aplicação</Titulo>
                <p>Bem-vindo ao Adote, uma plataforma desenvolvida com o propósito de conectar pessoas que desejam adotar ou disponibilizar animais para adoção, promovendo o bem-estar animal e contribuindo para a redução do abandono de pets. O foco inicial da aplicação é atender à região de Visconde de Mauá (RJ-MG), mas a estrutura do sistema permite que ele seja adaptado para outras localidades, incentivando iniciativas semelhantes em diferentes partes do Brasil.</p>
            <TituloSecundario>Propósito da Aplicação</TituloSecundario>
                <p>O Adote foi criado como parte de um projeto de extensão universitária, com o objetivo de oferecer uma solução digital acessível para facilitar o processo de adoção responsável. Queremos incentivar a conexão entre quem busca dar um novo lar para um animal e quem tem um amigo peludo esperando por uma nova família.</p>
                <p>Além disso, buscamos promover a conscientização sobre a importância da adoção e cuidados responsáveis com os animais, destacando valores como empatia, responsabilidade social e sustentabilidade.</p>
            <TituloSecundario>Como Utilizar o Adote</TituloSecundario>
                <p>O uso da aplicação é simples e intuitivo. Veja como você pode interagir com o Adote:</p>
                <p className="negrito">Para quem deseja adotar:</p>
                <ul>
                    <li key={1}><p><span className="negrito">Navegue pela página inicial</span> para ver a lista de animais disponíveis para adoção.</p></li>
                    <li key={2}><p>Clique em <span className="negrito">"Conferir Detalhes"</span> para visualizar informações completas sobre o animal, incluindo idade, comportamento e dados de contato do responsável.</p></li>
                    <li key={3}><p>Entre em contato com o responsável pelo animal diretamente pelo telefone ou email fornecido.</p></li>
                </ul>
                <p className="negrito">Para quem deseja cadastrar um animal:</p>
                <ul>
                    <li key={4}>
                        <p>Crie uma conta na aplicação preenchendo os dados de registro.</p>
                    </li>

                    <li key={5}>
                        <p>Acesse o <span className="negrito">Dashboard</span> para gerenciar seus animais cadastrados.</p>
                    </li>

                    <li key={6}>
                        <p>Utilize a opção de c<span className="negrito">adastrar novo animal</span>, fornecendo informações como fotos, idade aproximada, comportamento e contato.</p>
                    </li>

                </ul>
                <p className="negrito">Funcionalidades Adicionais: </p>
                <ul>
                    <li key={7}>
                        <p><span className="negrito">Dashboard personalizado</span> para acompanhar seus animais cadastrados, editar informações ou excluí-los.</p>
                    </li>
                    <li key={8}>
                        <p>Atualizações frequentes na página inicial para garantir que os animais mais recentes sejam exibidos.</p>
                    </li>
                </ul>

                <TituloSecundario>Uso dos Dados</TituloSecundario>
                    <p>A privacidade e a segurança dos usuários são nossas prioridades. Todos os dados fornecidos, como informações pessoais e fotos de animais, são utilizados exclusivamente para o funcionamento da plataforma, permitindo que as conexões entre adotantes e responsáveis sejam feitas de forma eficiente.</p>
                    <p>Os dados de cadastro são protegidos por criptografia e armazenados com segurança no banco de dados. Além disso:</p>
                    <ul>
                        <li key={9}>
                            <p>Nenhuma informação será compartilhada com terceiros sem o consentimento explícito do usuário.</p>
                        </li>
                        <li key={10}>
                            <p>Você pode solicitar a exclusão de seus dados ou informações cadastradas a qualquer momento entrando em contato com a equipe do projeto. </p>
                        </li>
                    </ul>

                <TituloSecundario>Sobre a Criadora</TituloSecundario>
                    <p>O Adote foi desenvolvido por Maisa de Oliveira Silva, aluna de graduação em engenharia de software, como parte de um projeto de extensão universitária voltado para o impacto social. A aplicação reflete o compromisso com a causa animal e a inclusão digital.</p>
                    <p>Sinta-se à vontade para conhecer mais sobre minha trajetória profissional através do meu <a href="https://www.linkedin.com/in/maisa-oliveira-981411238/">Linkedin</a> ou<a href="https://github.com/maisaolisilva?tab=repositories"> GitHub</a>, onde inclusive mantenho público o código do projeto.</p>
                    <p>Caso queira entrar em contato diretamente comigo, pode me enviar uma mensagem diretamente para meu <a href="https://wa.me/+5524992581089?text=Estou%20entrando%20em%20contato%20pelo%20projeto%20Adote.">WhatsApp</a>.</p>
        </AboutContainer>
    )
}