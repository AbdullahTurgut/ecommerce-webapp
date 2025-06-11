import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../store/features/orderSlice";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Order = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(getUserOrders(userId));

    // toast.success("Orders placed successfully.");
  }, [dispatch, userId]);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row">
        <div className="col-4">
          <h3 className="mb-4 cart-title">My Order History</h3>
        </div>
      </div>
      {orders.length === 0 ? (
        <p>No orders found at the moment.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  <table className="table table-sm table-bordered table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Item ID</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.productId}</td>
                          <td>{item.productName}</td>
                          <td>{item.productBrand}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>${item.quantity * item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mb-2">
        <Link to={"/products"}>Start Shopping</Link>
      </div>
    </div>
  );
};

export default Order;
