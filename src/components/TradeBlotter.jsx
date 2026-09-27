import { useState } from "react";

export default function TradeBlotter({ trades }) {
  const [selectedPair, setSelectedPair] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const normalisedSearchTerm = searchTerm.trim().toLowerCase();

  const currencyPairs = [...new Set(trades.map((trade) => trade.currencyPair))];

  const filteredTrades = trades.filter((trade) => {
    const matchesPair =
      selectedPair === "All" || trade.currencyPair === selectedPair;
    const matchesSearch = trade.currencyPair
      .toLowerCase()
      .includes(normalisedSearchTerm);

    return matchesPair && matchesSearch;
  });

  const totalQuantity = filteredTrades.reduce((total, trade) => {
    return total + Number(trade.quantity);
  }, 0);
  return (
    <section className="panel trade-blotter">
      <header className="panel-header panel-header-row">
        <div>
          <p className="panel-kicker">Order history</p>
          <h2 className="panel-title">Trade blotter</h2>
        </div>
        <span className="panel-count">
          {" "}
          Total trades:
          {filteredTrades.length}{" "}
          {filteredTrades.length > 1 ? " trades" : " trade"}
        </span>
        <span className="panel-count">
          {" "}
          Total quantity: {totalQuantity}{" "}
          {totalQuantity > 1 ? "contracts" : "contract"}
        </span>
      </header>

      <div className="market-filters">
        <div className="filter-field">
          <label className="field-label" htmlFor="search">
            Currency pair search
          </label>
          <input
            id="search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search pairs"
            className="form-control"
          />
        </div>
        <div className="filter-field">
          <label className="field-label" htmlFor="currency-pairs">
            Filter by pair
          </label>
          <select
            id="currency-pairs"
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            className="form-control"
          >
            <option value="All">All</option>
            {currencyPairs.map((pair) => (
              <option key={pair} value={pair}>
                {pair}
              </option>
            ))}
          </select>
        </div>
      </div>

      {trades.length === 0 ? (
        <div className="blotter-empty">
          <p className="empty-title">No trades yet</p>
          <p className="empty-description">
            Submitted trades will appear here.
          </p>
        </div>
      ) : filteredTrades.length === 0 ? (
        <div className="blotter-empty">
          <p className="empty-title">No matching trades</p>
          <p className="empty-description">
            Try changing the search or currency pair filter.
          </p>
        </div>
      ) : (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Currency pair</th>
                <th>Option type</th>
                <th className="numeric-cell">Strike price</th>
                <th>Expiration date</th>
                <th className="numeric-cell">Quantity</th>
                <th className="numeric-cell">Bid</th>
                <th className="numeric-cell">Ask</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade) => (
                <tr key={trade.id}>
                  <td className="pair-cell">{trade.currencyPair}</td>
                  <td>{trade.optionType}</td>
                  <td className="numeric-cell">{trade.strikePrice}</td>
                  <td className="date-cell">{trade.expirationDate}</td>
                  <td className="numeric-cell">{trade.quantity}</td>
                  <td className="numeric-cell">{trade.bid}</td>
                  <td className="numeric-cell">{trade.ask}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
