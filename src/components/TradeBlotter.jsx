export default function TradeBlotter({ trades }) {
  return (
    <section className="panel trade-blotter">
      <header className="panel-header panel-header-row">
        <div>
          <p className="panel-kicker">Order history</p>
          <h2 className="panel-title">Trade blotter</h2>
        </div>
        <span className="panel-count">
          {trades.length} {trades.length > 1 ? "trades" : "trade"}
        </span>
      </header>

      {trades.length === 0 ? (
        <div className="blotter-empty">
          <p className="empty-title">No trades yet</p>
          <p className="empty-description">
            Submitted trades will appear here.
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
              {trades.map((trade) => (
                <tr
                  key={trade.id}
                >
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
