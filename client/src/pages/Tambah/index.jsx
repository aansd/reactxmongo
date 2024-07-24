import React, { useState } from 'react';
import Input from '../../components/Input';
import './index.scss';

const Tambah = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    image: null,
    status: true,
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('status', formData.status);

    if (formData.image) {
      data.append('image', formData.image);
      }
      fetch('http://localhost:3000/api/v4/product', {
        method: 'POST',
        body: data,
      }).then(response => response.json())
      .then(() => {
        alert('Produk berhasil ditambahkan!');
        setFormData({
          name: '',
          price: '',
          stock: '',
          image: null,
          status: true,
        });
      })
      .catch(error => (error));     
}

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            onChange={handleChange}
            value={formData.name}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            onChange={handleChange}
            value={formData.price}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            onChange={handleChange}
            value={formData.stock}
          />
          <Input
            name="image"
            type="file"
            placeholder="Image Produk..."
            label="Image"
            onChange={handleChange}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            onChange={handleChange}
            checked={formData.status}
          />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
