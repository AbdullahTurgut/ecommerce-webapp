import { BsDash, BsPlus } from "react-icons/bs";

const QuantityUpdater = ({ disabled, quantity, onIncrease, onDecrease }) => {
  return (
    <section style={{ width: "150px" }}>
      <div className="input-group">
        <button
          onClick={onDecrease}
          className="btn btn-outline-secondary"
          disabled={disabled}
        >
          <BsDash />
        </button>
        <input
          type="number"
          name="quantity"
          value={quantity}
          readOnly
          disabled={disabled}
          className="form-control text-center"
        />
        <button
          onClick={onIncrease}
          className="btn btn-outline-success"
          disabled={disabled}
        >
          <BsPlus />
        </button>
      </div>
    </section>
  );
};

export default QuantityUpdater;
