import styled from "styled-components";
import pepeth from "../icons/pepethhh.png";
const HeaderDiv = styled.div`
  height: 70px;
  padding: 16px;
  text-align: center;
  width: 100vw;
  background-color: rgb(248, 245, 245);
  color: rgb(255, 106, 106);
  border-bottom: 1px solid rgb(255, 106, 106);
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = () => {
  return (
    <HeaderDiv>
      <h1>Goerli Eth Faucet for Stackies</h1>
      <img src={pepeth} alt="" width="50" height="50" />
    </HeaderDiv>
  );
};
