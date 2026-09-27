import { useState } from "react";
import { marketData } from "../data/marketData";
import MarketTable from "./MarketTable";
import MarketFilters from "./MarketFilters";

function MarketWatch() {
  const [selectedPair, setSelectedPair] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const currencyPairs = [
    ...new Set(marketData.map((instrument) => instrument.currencyPair)),
  ];

  const normalisedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredMarketData = marketData.filter((instrument) => {
    const matchesPair =
      selectedPair === "All" || instrument.currencyPair === selectedPair;

    const matchesSearch = instrument.currencyPair
      .toLowerCase()
      .includes(normalisedSearchTerm);

    // To search by any field
    // const matchesSearch = Object.values(instrument).some((value) =>
    //   String(value).toLowerCase().includes(searchTerm.trim().toLowerCase()),
    // );

    return matchesPair && matchesSearch;
  });

  return (
    <section className="panel market-watch">
      <header className="panel-header panel-header-row">
        <div>
          <p className="panel-kicker">FX options</p>
          <h2 className="panel-title">Market watch</h2>
        </div>
        <span className="panel-count">
          {filteredMarketData.length}
          {filteredMarketData.length > 1 ? " instruments" : " instrument"}
        </span>
      </header>
      <MarketFilters
        selectedPair={selectedPair}
        setSelectedPair={setSelectedPair}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currencyPairs={currencyPairs}
      />
      <MarketTable MarketData={filteredMarketData} />{" "}
    </section>
  );
}

export default MarketWatch;
