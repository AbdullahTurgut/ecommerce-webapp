const StockStatus = ({ inventory }) => {
  return (
    <p>
      {inventory && inventory > 1 ? (
        <span className="text-success">{inventory} in Stock</span>
      ) : (
        <span className="text-danger">Out of Stock</span>
      )}
    </p>
  );
};

export default StockStatus;
