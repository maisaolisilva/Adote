'use client';
import React from "react";
import styled from "styled-components";
import Cabecalho from "../Cabecalho";

interface MainProps {
  children: React.ReactNode;
}

const StyledContainer = styled.section`
    margin: 45px 10px;
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
    </StyledContainer>
  </>
  
  )
}
