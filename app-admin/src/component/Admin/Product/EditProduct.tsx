import React from "react";

const EditProduct = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-10">
          <div className="container mt-5">
            <div className="card">
              <div className="card-header"></div>

              <div className="card-body">
                <div className="container mt-5">
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="productImage">
                            Hình ảnh sản phẩm
                          </label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="productImage"
                            multiple
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="productName">Tên sản phẩm</label>
                          <input
                            type="text"
                            className="form-control"
                            id="productName"
                            placeholder="Nhập tên sản phẩm"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="quantity">Số lượng</label>
                          <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            //   value={quantity}
                            //   onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Nhập số lượng"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="price">Giá</label>
                          <input
                            type="text"
                            className="form-control"
                            id="price"
                            placeholder="Nhập giá"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="category">Loại sản phẩm</label>
                          <select className="form-control" id="category">
                            <option value="">Chọn loại sản phẩm</option>
                            <option value="category1">Loại 1</option>
                            <option value="category2">Loại 2</option>
                            {/* Thêm các tùy chọn khác */}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="brand">Thương hiệu</label>
                          <select className="form-control" id="brand">
                            <option value="">Chọn thương hiệu</option>
                            <option value="brand1">Thương hiệu 1</option>
                            <option value="brand2">Thương hiệu 2</option>
                            {/* Thêm các tùy chọn khác */}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="color">Màu</label>
                          <select className="form-control" id="color">
                            <option value="">Chọn màu</option>
                            <option value="red">Đỏ</option>
                            <option value="blue">Xanh</option>
                            {/* Thêm các tùy chọn khác */}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Mô tả</label>
                          <textarea
                            className="form-control"
                            id="description"
                            placeholder="Nhập mô tả sản phẩm"
                          ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Sửa sản phẩm
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
