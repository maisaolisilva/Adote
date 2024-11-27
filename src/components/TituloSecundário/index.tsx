import styled from "styled-components"

const StyledH2 = styled.h2`
    font-size: 26px;
    color: #624E88;
`

export function TituloSecundario({ children }: { children: string }){

    return(
        <StyledH2>{ children }</StyledH2>
    )

}