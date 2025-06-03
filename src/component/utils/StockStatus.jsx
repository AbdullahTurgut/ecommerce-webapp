const StockStatus = ({ inventory }) => {
  return (
    <>
      {" "}
      {inventory && inventory > 1 ? (
        <span className="text-success">{inventory} in Stock</span>
      ) : (
        <span className="text-danger">Out of Stock</span>
      )}
    </>
  );
};

export default StockStatus;
