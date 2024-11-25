'use client';

import styled from "styled-components";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import Link from "next/link";
import BotaoHome from "@/components/BotaoHome";

const StyledSection = styled.header`
  position: absolute;
    top: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    a {
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 20px;
      color: #FEF9F2;
      font-size: 18px;
      font-weight: bold;
      background-color: #624E88;
      &:hover {
        opacity: 0.8;
      }
    }

    .lado-direito{
        display: flex;
        gap: 10px;
    }
`

export default function Cabecalho() {
    const { data: session, status } = useSession();
    const [isSessionUpdated, setIsSessionUpdated] = useState(false);

    useEffect(() => {
      if (session) {
        setIsSessionUpdated(true);
      }
    }, [session]);

    if (status === "loading") {
      return <p>Carregando...</p>;
    }

    return(
        <StyledSection>
        <BotaoHome />
      {status === "authenticated" ? (
          <>
            <div className="lado-direito">
              <Link href="/profile">Perfil</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          </>
        ) : (
          <>
            <div className="lado-direito">
              <Link href="/auth/signin">Login</Link>
              <Link href="/auth/register">Cadastro</Link>
            </div>
          </>
        )}
    </StyledSection>
    )
    
    
}