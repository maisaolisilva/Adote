'use client'

import Link from "next/link";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa6";
import { BiCopyright } from "react-icons/bi";

const StyledFooter = styled.footer`
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 10px;
    background-color: #624E88;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .botao-com-cor-de-fundo{
        background-color: #FEF9F2;
        padding: 5px;
        border-radius: 20px;
        &:hover{
            opacity: 0.6;
        }
    }
    section{
        display: flex;
        align-items: center;
    }
    .lado-esquerdo{
        display: flex;
        align-items: center;
        gap: 10px;
    }
`

export default function Rodape() {
    return(
        <StyledFooter>
            <div className="lado-esquerdo">
                <Link href="/about" className="botao-com-cor-de-fundo">Sobre a Aplicação</Link>
                <a href="https://www.linkedin.com/in/maisa-oliveira-981411238/"><IoLogoLinkedin size={30}/></a>
                <a href="https://github.com/maisaolisilva?tab=repositories"><FaGithub size={30}/></a>
                <a href="https://wa.me/+5524992581089?text=Estou%20entrando%20em%20contato%20pelo%20projeto%20Adote."><FaWhatsapp size={30}/></a>
            </div>
            <section>
                <BiCopyright size={30}/> <p>Todos os direitos reservados</p>
            </section>
        </StyledFooter>
    )
}