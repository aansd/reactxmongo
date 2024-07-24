import React, { useState } from 'react';
import Input from '../../components/Input';
import './index.scss';
import SimpleReactValidator from 'simple-react-validator';

const Tambah = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    image: null,
    status: true,
  });

  const [validator] = useState(new SimpleReactValidator({
    messages: {
      required: 'Field ini wajib diisi.',
      numeric: 'Harus berupa angka.',
      alpha: 'Hanya boleh huruf.',
    },
  }));

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validator.allValid()) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('stock', formData.stock);
      data.append('status', formData.status);

      if (formData.image) {
        data.append('image', formData.image);
      }

      try {
        const response = await fetch('http://localhost:3000/api/v2/product', {
          method: 'POST',
          body: data,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        await response.json();
        alert('Produk berhasil ditambahkan!');
        setFormData({
          name: '',
          price: '',
          stock: '',
          image: null,
          status: true,
        });
      } catch (error) {
        console.error('Error:', error);
        alert('Gagal menambahkan produk!');
      }
    } else {
      validator.showMessages();
      setFormData({ ...formData });
    }
  };

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
          {validator.message('name', formData.name, 'required|alpha')}

          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            onChange={handleChange}
            value={formData.price}
          />
          {validator.message('price', formData.price, 'required|numeric')}

          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            onChange={handleChange}
            value={formData.stock}
          />
          {validator.message('stock', formData.stock, 'required|numeric|min:0')}

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
