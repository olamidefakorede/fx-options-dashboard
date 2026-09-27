export default function MarketFilters({
  selectedPair,
  setSelectedPair,
  searchTerm,
  setSearchTerm,
  currencyPairs,
}) {
  return (
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
  );
}
