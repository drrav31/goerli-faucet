import { useRef, useState } from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import { Header } from "./components/Header";
import { Donate } from "./components/Donate";
import { Footer } from "./components/Footer";
import pepolice from "../src/icons/pepolice.png";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  align-items: center;
  padding: 16px;
  border-radius: 7px;
  background-color: white;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 50px;
  margin-top: 50px;
`;

const Form = styled.form`
  display: flex;
  width: 80%;
  margin-bottom: 30px;
  justify-content: space-evenly;
  align-items: space-evenly;
`;

const Input = styled.input`
  border-radius: 7px;
  width: 60%;
  height: 60px;
  border: 1px solid rgba(255, 106, 106);
  outline: none;
  margin: 0;
  padding: 4px;
  font-size: 1.2rem;
`;

const Button = styled.button`
  border-radius: 7px;
  width: 30%;
  /* height: 70px; */
  background-color: rgb(255, 106, 106);
  border: none;
  outline: none;
  color: white;
  margin: 0;
  padding: 8px;
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const TransactionContainer = styled.div`
  width: 80%;
  background-color: rgb(255, 106, 106);
  color: white;
  padding: 8px;
  overflow-x: auto;
`;

const ErrorContainer = styled.div`
  width: 75%;
  padding: 8px;
  background-color: rgb(255, 100, 100);
  border-radius: 5px;
  box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.2);
`;
const ErrorMessage = styled.p`
  color: white;
  font-size: 1rem;
  display: flex;
  justify-content: center;
`;
const WarnIcon = styled.img``;
function App() {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [status, setStatus] = useState("");
  const [txhash, setTxHash] = useState("");
  const timestamp = useRef();
  const [requestAllowed, setRequestAllowed] = useState();
  const REQUEST_LIMIT_TIME = 43200000;
  const [hasEnoughBalance, setHasEnoughBalance] = useState();
  let balanceStatus;
  let requestStatus;
  const providerKey = process.env.REACT_APP_PROVIDER_API_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://goerli.infura.io/v3/${providerKey}`
  );

  // Get the wallet instance
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  //Set timestamp to local storage
  const setLocalStorage = () => {
    localStorage.setItem("lastRequestTime", Date.now());
    requestStatus = true;
    setRequestAllowed(requestStatus);
  };

  //Get timestamp from local storage
  const getFromLocalStorage = (lastRequested) => {
    return localStorage.getItem(lastRequested);
  };

  //Check wallet balance of the requester
  const checkBalance = async (recipientAddress) => {
    let balance = await provider.getBalance(recipientAddress);
    if (balance >= ethers.parseEther("0.2")) {
      balanceStatus = true;
      setHasEnoughBalance(balanceStatus);
      requestStatus = false;
      setRequestAllowed(requestStatus);
    } else {
      balanceStatus = false;
      setHasEnoughBalance(balanceStatus);
    }
  };

  const checkRequestTimeValidity = (timestamp) => {
    if (Date.now() < timestamp + REQUEST_LIMIT_TIME) {
      requestStatus = false;
      setRequestAllowed(requestStatus);
    } else {
      setLocalStorage();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRecipientAddress("");
    await checkBalance(recipientAddress);
    timestamp.current = parseInt(getFromLocalStorage("lastRequestTime"));
    if (!balanceStatus) {
      timestamp.current
        ? checkRequestTimeValidity(timestamp.current)
        : setLocalStorage();
    }
    if (requestStatus) {
      // Set up the transaction object
      const tx = {
        to: recipientAddress,
        value: ethers.parseEther("0.01"), // Amount of ether to send
      };

      // Send the transaction
      try {
        const txResponse = await wallet.sendTransaction(tx);
        setStatus(`Transaction sent Successfully with Hash: `);
        setTxHash(txResponse.hash);
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setStatus("");
    }
  };

  return (
    <BodyContainer>
      <Header />
      <FormContainer>
        <Form id="form" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your Ethereum Address(0xTh3fz...)"
            value={recipientAddress}
            required
            onChange={(event) => setRecipientAddress(event.target.value)}
          />
          <Button id="submit" type="submit">
            Send Me ETH
          </Button>
        </Form>

        {status ? (
          <TransactionContainer>
            {status}
            <a
              href={`https://goerli.etherscan.io/tx/${txhash}`}
              target="_blank"
              rel="noreferrer"
            >
              {txhash}
            </a>
          </TransactionContainer>
        ) : (
          <></>
        )}
        {hasEnoughBalance || requestAllowed === false ? (
          <ErrorContainer>
            {hasEnoughBalance ? (
              <ErrorMessage>
                Hey, Your wallet already has enough number of tokens. Your
                request won't be processed to be fair to others who might not
                have coins!
              </ErrorMessage>
            ) : requestAllowed === false ? (
              <ErrorMessage>
                <WarnIcon src={pepolice} alt="" width="50" height="40" />
                Hey, You were caught making too many requests in a short period
                of time. Your hands are cuffed for 12 hours from now{" "}
              </ErrorMessage>
            ) : (
              <></>
            )}
          </ErrorContainer>
        ) : (
          <></>
        )}
      </FormContainer>
      <Donate />
      <Footer />
    </BodyContainer>
  );
}

export default App;
