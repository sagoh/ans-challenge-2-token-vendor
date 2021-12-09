import React, { useState } from "react";
import { useBalance } from "eth-hooks";

const { utils } = require("ethers");

/*
  ~ What it does? ~

  Displays a balance of given address in ether & dollar

  ~ How can I use? ~

  <Balance
    address={address}
    provider={mainnetProvider}
    price={price}
  />

  ~ If you already have the balance as a bignumber ~
  <Balance
    balance={balance}
    price={price}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to given address
  - Provide provider={mainnetProvider} to access balance on mainnet or any other network (ex. localProvider)
  - Provide price={price} of ether and get your balance converted to dollars
*/

export default function TokenBal(props) {
  const [dollarMode, setDollarMode] = useState(true);

  // const [listening, setListening] = useState(false);

  const balance = useBalance(props.provider, props.address);

  let floatBalance = parseFloat("0.00");

  let usingBalance = balance;

  if (typeof props.balance !== "undefined") {
    usingBalance = props.balance;
  }
  if (typeof props.value !== "undefined") {
    usingBalance = props.value;
  }

  if (usingBalance) {
    const balance = usingBalance * (10 ** 18);
    floatBalance = parseFloat(usingBalance);
    
  }

  let displayBalance = floatBalance.toFixed(0);

  

  return (
    <span
      style={{
        verticalAlign: "middle",
        fontSize: props.size ? props.size : 24,
        padding: 8,
        cursor: "pointer",
      }}
      
    >
      {displayBalance}
    </span>
  );
}