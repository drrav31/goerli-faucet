import styled from "styled-components";

const DonateContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 7px;
  background-color: white;
  padding: 16px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 50px;
`;

const AnswerList = styled.ul`
  list-style-type: none;
`;

const StepsLink = styled.a`
  color: rgba(255, 106, 106);
  &:hover {
    cursor: pointer;
  }
`;

export const Donate = () => {
  return (
    <DonateContainer>
      <h1 style={{ margin: 0 }}>FAQs</h1>
      <h4 style={{ margin: 0 }}>How to use this?</h4>
      <AnswerList>
        <li>
          To request funds, enter your valid ethereum wallet address in the
          address box above and hit the "Send me ETH" button.
        </li>
        <li>Currently you will get 0.01 ETH every 12 hours from the faucet.</li>
        <li>
          Your request won't be processed if you already have enough
          tokens(greater than 0.2 eth) in your wallet.
        </li>
      </AnswerList>
      <h4 style={{ margin: 0 }}>How can I help the faucet?</h4>
      <AnswerList>
        <li>
          You can help the faucet by sending any excess ETH you may not need to
          the address below.
        </li>
        <li>
          Faucet Address:&nbsp;
          <strong>0x84F3d2c6D3A1bBC7ae2dBB182Ae52a3bf032fEA8</strong>
        </li>
        <li>
          Follow these{" "}
          <StepsLink
            href="https://support.metamask.io/hc/en-us/articles/360015488931-How-to-send-tokens-from-your-MetaMask-Wallet"
            target="_blank"
          >
            Easy Steps
          </StepsLink>
          &nbsp;To transfer the coins from your wallet
        </li>
      </AnswerList>
    </DonateContainer>
  );
};
