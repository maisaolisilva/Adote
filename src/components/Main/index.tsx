'use client';
import React from "react";
import styled from "styled-components";
import Cabecalho from "../Cabecalho";
import Rodape from "@/components/Rodape";

interface MainProps {
  children: React.ReactNode;
}

const StyledContainer = styled.section`
    margin: 45px 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export default function Main({ children }: MainProps) {
  return( 
  <>
    <StyledContainer>
      <Cabecalho />
      <main>{children}</main>
      <Rodape />
    </StyledContainer>
  </>
  
  )
}
