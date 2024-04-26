import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { default_route, order_route, product_get_route } from "../api/routes";
function Product() {
  const { productId } = useParams();
  const token = localStorage.getItem("token");
  const [orderItem, setOrderItem] = useState({
    productId: "",
    quantity: "",
  });
  const [authRes, setAuthRes] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState({
    name: "",
    price: "",
    productImage: "",
  });

  const handleInputs = (e) => {
    setOrderItem({
      ...orderItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputEdit = (e) => {
    if (e.target.name === "productImage") {
      setEditItem({ ...editItem, productImage: e.target.files[0] });
    } else {
      setEditItem({ ...editItem, [e.target.name]: e.target.value });
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(order_route, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: orderItem.quantity,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/orders";
      } else {
        setAuthRes(data.message);
      }
    } catch (error) {
      setAuthRes("Please Try Again");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(product_get_route + "/" + productId, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/products";
      } else {
        setAuthRes(data.message);
      }
    } catch (error) {
      setAuthRes("Please Try Again");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updateOps = [
        { propName: "name", value: editItem.name },
        { propName: "price", value: editItem.price },
      ];

      const res = await fetch(product_get_route + "/" + productId, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateOps),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.reload();
      } else {
        setAuthRes(data.message);
      }
    } catch (error) {
      setAuthRes("Please Try Again");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const response = await fetch(product_get_route + "/" + productId);
      const data = await response.json();
      const itemImage = data.product.productImage.substring(
        data.product.productImage.lastIndexOf("\\") + 1
      );
      data.product.productImage = itemImage;
      setProduct(data.product);
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  if (loading || product === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="single-container">
      <div className="single-card">
        <img
          src={default_route + product.productImage}
          alt={product.productImage}
          className="product-image"
        />
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">₱{product.price}</p>
      </div>
      <div className="action-container">
        <form onSubmit={handleDelete} className="action-form">
          <h3 className="action-title">Delete Action</h3>
          <button className="action-button">Delete Item</button>
        </form>
        <form onSubmit={handleEdit} className="action-form">
          <h3 className="action-title">Edit Action</h3>
          <input
            type="text"
            name="name"
            value={editItem.name}
            onChange={handleInputEdit}
            placeholder="Item Name"
            className="action-input"
            required
          />
          <input
            type="text"
            name="price"
            value={editItem.price}
            onChange={handleInputEdit}
            placeholder="Image Price"
            className="action-input"
            required
          />
          {authRes && <p className="error-message">{authRes}</p>}
          <button type="submit" className="action-button">Edit Item</button>
        </form>
        <form onSubmit={handleSubmission} className="action-form">
          <h3 className="action-title">Order Action</h3>
          <input
            type="text"
            onChange={handleInputs}
            value={productId}
            name="productId"
            placeholder="Product ID"
            className="action-input"
            disabled
          />
          <input
            type="text"
            onChange={handleInputs}
            name="quantity"
            value={product.quantity}
            placeholder="Quantity"
            className="action-input"
            required
          />
          {authRes && <p className="error-message">{authRes}</p>}
          <button type="submit" className="action-button">Order Item</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Product;