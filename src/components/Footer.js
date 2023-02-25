import styled from "styled-components";
import peepolove from "../icons/peepolove.png";
const FooterContainer = styled.div`
  background-color: rgb(255, 106, 106);
  width: 100vw;
  height: 70px;
  color: white;
  padding: 20px;
  text-align: center;
`;
export const Footer = () => {
  return (
    <FooterContainer>
      <h2>
        Made for Stackies with{" "}
        <img src={peepolove} alt="" height="30" width="40" />
      </h2>
    </FooterContainer>
  );
};
