import Link from "next/link";
import { ImHome } from "react-icons/im";
import styled from "styled-components";

const StyledLink = styled(Link)`
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 20px;
      color: #FEF9F2;
      font-size: 18px;
      font-weight: bold;
      background-color: #624E88;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        opacity: 0.8;
      }
  
`
export default function BotaoHome() {
    return <StyledLink href="/">
         <ImHome color="#FEF9F2" size={25} />
    </StyledLink>
}