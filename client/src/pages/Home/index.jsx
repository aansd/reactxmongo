import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/v4/product')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Apakah anda yakin ingin menghapus product ini?')) {
      fetch(`http://localhost:3000/api/v4/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(() => {
          setProducts(products.filter(product => product._id !== id));
        })
        .catch(error => console.error('Error deleting product:', error));
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input
          type="text"
          placeholder="Masukan kata kunci..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td className="text-right">{`RP. ${product.price}`}</td>
                <td className="text-center">
                  <Link to={`/detail/${product._id}`} className="btn btn-sm btn-info">Detail</Link>
                  <Link to={`/edit/${product._id}`} className="btn btn-sm btn-warning">Edit</Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
