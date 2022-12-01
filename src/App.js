import { useState, useEffect } from 'react';
import "./App.css";

// Use this API
// https://api2.binance.com/api/v3/ticker/24hr
// https://api.binance.us/api/v3/ticker/24hr

const COIN_NAMES = {
  BTCUSDT: 'Bitcoin',
  ETHUSDT: 'Ethereum',
  SOLUSDT: 'Solana',
  ADAUSDT: 'Cardano',
  DOGEUSDT: 'DogeCoin',
}


export default function App() {

  const [cryptoData, setCryptoData] = useState({});
  useEffect(() => {
    fetch('https://api.binance.us/api/v3/ticker/24hr')
      .then(res => res.json())
      .then(data => setCryptoData(data.filter(item => Object.keys(COIN_NAMES).includes(item.symbol))));
  },[]);

  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(cryptoData).length !== 0  &&
              cryptoData.map((coin, i) => {
                return (
                  <tr key={coin.symbol}>
                    <td>{i + 1}</td>
                    <td>{COIN_NAMES[coin.symbol]}</td>
                    <td>${Number(coin.lastPrice).toLocaleString()}</td>
                    <td 
                      style={
                        Number(coin.priceChangePercent) > 0 
                          ? { color: "green" }
                          : {color: "red"
                        }
                      }
                    >
                      {Number(coin.priceChangePercent) > 0 
                        ? '▲' 
                        : '▼' 
                      }
                      {coin.priceChangePercent}%
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    </div>
  );
}
