import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [productName, setProductName] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:7095/api/loais', {
        TenLoai: productName,
      });
      console.log('Loại sản phẩm mới được thêm:', response.data);
      // Hiển thị thông báo
      alert('Loại sản phẩm đã được thêm thành công!');
      // Điều hướng về trang index
      navigate('/category');
    } catch (error) {
      console.error('Lỗi khi thêm loại sản phẩm:', error);
      alert('Đã xảy ra lỗi khi thêm loại sản phẩm!');
    }
  };

  return (
    <div className="container mt-5" style={{ marginLeft: '15%' }}>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header"></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-6">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label>Tên loại sản phẩm</label>
                          <input
                            type="text"
                            className="form-control"
                            id="productName"
                            placeholder="Nhập tên loại sản phẩm"
                            value={productName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-left"
                          style={{ marginLeft: '10px' }}
                        >
                          Thêm loại sản phẩm
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning"
                          style={{ marginLeft: '10px' }}
                          onClick={() => navigate('/category')}
                        >
                          Trở lại
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
