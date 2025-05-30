import React from "react";
import { BsDash, BsPlus } from "react-icons/bs";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../../store/features/productSlice";
import { useDispatch, useSelector } from "react-redux";

const QuantityUpdater = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.product.quantity);
  return (
    <section style={{ width: "150px" }}>
      <div className="input-group">
        <button
          onClick={() => dispatch(decreaseQuantity())}
          className="btn btn-outline-secondary"
        >
          <BsDash />
        </button>
        <input
          type="number"
          name="quantity"
          value={quantity}
          readOnly
          className="form-control text-center"
        />
        <button
          onClick={() => dispatch(increaseQuantity())}
          className="btn btn-outline-success"
        >
          <BsPlus />
        </button>
      </div>
    </section>
  );
};

export default QuantityUpdater;
