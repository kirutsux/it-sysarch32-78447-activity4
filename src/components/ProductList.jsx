import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { default_route, product_get_route } from "../api/routes";
import Navbar from "./Navbar";

function ProductList() {
  const token = localStorage.getItem("token");
  const [formProduct, setFormProduct] = useState({
    name: "",
    price: "",
    productImage: "",
  });
  const [authRes, setAuthRes] = useState(null);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    if (e.target.name === "productImage") {
      setFormProduct({ ...formProduct, productImage: e.target.files[0] });
    } else {
      setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const postRequest = new FormData();
      postRequest.append("name", formProduct.name);
      postRequest.append("price", formProduct.price);
      postRequest.append("productImage", formProduct.productImage);

      const res = await fetch(product_get_route, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: postRequest,
      });
      const data = await res.json();
      if (res.ok) {
        window.location.reload();
      } else {
        setAuthRes(data.message);
      }
    } catch (err) {
      setAuthRes("Please Try Again");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(product_get_route);
      const data = await response.json();
      setProductList(data.products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading || productList === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="container">
      <div className="add-container">
        <form onSubmit={handleSubmission} className="add-form">
          <h2 className="form-title">Add Products</h2>
          <input
            type="text"
            name="name"
            value={formProduct.name}
            onChange={handleInputs}
            placeholder="Item Name"
            className="form-input"
          />
          <input
            type="text"
            name="price"
            value={formProduct.price}
            onChange={handleInputs}
            placeholder="Image Price"
            className="form-input"
          />
          <input
            type="file"
            name="productImage"
            onChange={handleInputs}
            placeholder="Item Image"
            className="form-input"
          />
          {authRes && <p className="error-message">{authRes}</p>}
          <button type="submit" className="form-button">Add</button>
        </form>
      </div>
      <div className="products-container">
        {productList.map((entry, index) => {
          const getImage = entry.productImage
            ? entry.productImage.substring(
                entry.productImage.lastIndexOf("\\") + 1
              )
            : null;
          return (
            <Link
              to={`/products/${entry._id}`}
              data={[entry.name, entry.price]}
              key={index}
              className="product-link"
            >
              <div className="card" key={index}>
                <img
                  className="product-image"
                  src={default_route + getImage}
                  alt={entry.name}
                />
                <h3 className="product-name">{entry.name}</h3>
                <p className="product-price">₱{entry.price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default ProductList;