import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.scss';

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v4/product/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => (error));
  }, [id]);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      {product ? (
        <table className="table">
          <tbody>
            <tr>
              <td>ID</td>
              <td>: {product._id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>: {product.name}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>: Rp. {product.price}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>: {product.stock}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
