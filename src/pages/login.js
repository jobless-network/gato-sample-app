import React from "react";
import styles from "../../styles/About.module.css";
import { ethers } from "ethers";

export default function Login() {
  const login = async () => {
    const { ethereum } = window;

    await ethereum.request({
      method: "eth_requestAccounts",
    });

    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const res = await fetch(
      `https://gato-api-server.herokuapp.com/authorization/signature_request?address=${address}`
    );
    const data = await res.json();

    const signature = await signer.signMessage(data.message);

    document.cookie = `signature=${signature}; path=/`;
    document.cookie = `wallet=${address}; path=/`;

    window.location.href = window.location.search.substring(1).split("=")[1];
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>This page is for members only</h2>
      <p className={styles.description}>
        Please authenticate with your wallet to proceed.
      </p>
      <button onClick={login}>Connect Wallet</button>
    </div>
  );
}
