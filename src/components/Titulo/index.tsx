import styled from "styled-components";

const StyledH1 = styled.h1`
    font-size: 46px;
    color: #624E88;
`
export default function Titulo({children}: {children: string}){
    return(
        <StyledH1>{children}</StyledH1>
    )
}