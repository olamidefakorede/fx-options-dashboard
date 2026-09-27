import { useState } from "react";
import MarketWatch from "./components/MarketWatch";
import TradeTicket from "./components/TradeTicket";
import TradeBlotter from "./components/TradeBlotter";

function App() {
  const [submittedTrades, setSubmittedTrades] = useState([]);
  const handleTradeSubmission = (trade) => {
    const newTrade = {
      id: Date.now(),
      ...trade,
    };

    setSubmittedTrades((submittedTrades) => [...submittedTrades, newTrade]);
  };
  return (
    <div className="app-shell">
      <h1 className="page-title">FX Options Dashboard</h1>
      <MarketWatch />
      <TradeTicket onTradeSubmission={handleTradeSubmission} />
      <TradeBlotter trades={submittedTrades} />
    </div>
  );
}

export default App;
