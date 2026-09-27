export default function MarketTable({ MarketData }) {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Currency pair</th>
            <th>Option type</th>
            <th className="numeric-cell">Strike price</th>
            <th>Expiration date</th>
            <th className="numeric-cell">Bid</th>
            <th className="numeric-cell">Ask</th>
          </tr>
        </thead>
        <tbody>
          {MarketData.length > 0 ? (
            MarketData.map((instrument) => (
              <tr key={instrument.id}>
                <td className="pair-cell">{instrument.currencyPair}</td>
                <td>{instrument.optionType}</td>
                <td className="numeric-cell">{instrument.strikePrice}</td>
                <td className="date-cell">{instrument.expirationDate}</td>
                <td className="numeric-cell">{instrument.bid}</td>
                <td className="numeric-cell">{instrument.ask}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="empty-state" colSpan="6">
                No instruments match these filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
