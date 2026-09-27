import { useState } from "react";
import { marketData } from "../data/marketData";

export default function TradeTicket({ onTradeSubmission }) {
  const [trade, setTrade] = useState({
    currencyPair: "",
    optionType: "",
    quantity: "",
  });

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState("");

  const currencyPairs = [
    ...new Set(marketData.map((instrument) => instrument.currencyPair)),
  ];

  const optionTypes = [
    ...new Set(marketData.map((instrument) => instrument.optionType)),
  ];

  const selectedInstrument = marketData.find(
    (instrument) =>
      instrument.currencyPair === trade.currencyPair &&
      instrument.optionType === trade.optionType,
  );

  const handleChange = (e) => {
    setTrade({ ...trade, [e.target.name]: e.target.value });
    setErrors({
      ...errors,
      [e.target.name]: "",
      ...(e.target.name === "currencyPair" || e.target.name === "optionType"
        ? { instrument: "" }
        : {}),
    });
    setSuccessMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!trade.currencyPair) {
      validationErrors.currencyPair = "Please select a currency pair";
    }

    if (!trade.optionType) {
      validationErrors.optionType = "Please select an option type";
    }

    if (!selectedInstrument) {
      validationErrors.instrument = "No matching instrument found";
    }

    if (!trade.quantity || Number(trade.quantity) <= 0) {
      validationErrors.quantity = "Quantity must be greater than 0";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submittedTrade = {
      ...trade,
      strikePrice: selectedInstrument?.strikePrice,
      expirationDate: selectedInstrument?.expirationDate,
      bid: selectedInstrument?.bid,
      ask: selectedInstrument?.ask,
    };

    console.log("Submitted Trade:", submittedTrade);

    onTradeSubmission(submittedTrade);

    setSuccessMessage("Trade submitted successfully!");

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    // Clear errors
    setErrors({});

    // Reset the form
    setTrade({
      currencyPair: "",
      optionType: "",
      quantity: "",
    });
  };

  return (
    <section className="panel trade-ticket">
      <header className="panel-header">
        <p className="panel-kicker">
          Order entry
        </p>
        <h2 className="panel-title">
          Trade ticket
        </h2>
        <p className="panel-description">
          Set the contract and quantity for your trade.
        </p>
      </header>

      <form className="trade-form" onSubmit={handleSubmit}>
        {successMessage && (
          <p className="status-message" role="status">
            {successMessage}
          </p>
        )}

        <div className="form-field">
          <label
            className="field-label"
            htmlFor="currency-pair"
          >
            Currency pair
          </label>
          <select
            id="currency-pair"
            name="currencyPair"
            value={trade.currencyPair}
            onChange={handleChange}
            aria-invalid={Boolean(errors.currencyPair)}
            className="form-control"
          >
            <option value="">Select a currency pair</option>
            {currencyPairs.map((pair) => (
              <option key={pair} value={pair}>
                {pair}
              </option>
            ))}
          </select>

          {errors.currencyPair && (
            <p className="field-error">{errors.currencyPair}</p>
          )}
        </div>

        <div className="form-field">
          <label
            className="field-label"
            htmlFor="option-type"
          >
            Option type
          </label>
          <select
            id="option-type"
            name="optionType"
            value={trade.optionType}
            onChange={handleChange}
            aria-invalid={Boolean(errors.optionType)}
            className="form-control"
          >
            <option value="">Select an option type</option>
            {optionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {errors.optionType && (
            <p className="field-error">{errors.optionType}</p>
          )}
        </div>

        <div className="form-field">
          <label
            className="field-label"
            htmlFor="strike-price"
          >
            Strike price
          </label>
          <input
            type="number"
            id="strike-price"
            value={selectedInstrument?.strikePrice || ""}
            readOnly
            className="form-control read-only-control"
          />
          {errors.instrument && (
            <p className="field-error">{errors.instrument}</p>
          )}
        </div>

        <div className="form-field">
          <label
            className="field-label"
            htmlFor="expiration-date"
          >
            Expiration date
          </label>
          <input
            type="date"
            id="expiration-date"
            value={selectedInstrument?.expirationDate || ""}
            readOnly
            className="form-control read-only-control"
          />
        </div>

        <div className="form-field">
          <label
            className="field-label"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={trade.quantity}
            onChange={handleChange}
            min="1"
            aria-invalid={Boolean(errors.quantity)}
            className="form-control"
          />

          {errors.quantity && (
            <p className="field-error">{errors.quantity}</p>
          )}
        </div>

        <button
          className="submit-button"
          type="submit"
        >
          Submit trade
        </button>
      </form>
    </section>
  );
}
