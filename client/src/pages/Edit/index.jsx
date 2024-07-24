import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from "../../components/Input";


const Edit = () => {
  const { id } = useParams(); 
  const navigate = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    status: false
  });

  useEffect(() => {

    fetch(`http://localhost:3000/api/v2/product/${id}`)
      .then(response => response.json())
      .then(data => setFormData({
        name: data.name,
        price: data.price,
        stock: data.stock,
        status: data.status
      }))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/v2/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(() => {
        alert('Product Berhasil di Update'); 
        navigate.push('/');
      })
      .catch(error => (error));
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={formData.price}
            onChange={handleChange}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={formData.stock}
            onChange={handleChange}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            checked={formData.status}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
