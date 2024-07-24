import React from "react";

const UpdateCategory = () => {
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
                    <div className="row ">
                      <div className="container">
                        <div className="col-md-6 ">
                          <div className="form-group">
                            <label htmlFor="productName">
                              Tên loại sản phẩm
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="productName"
                              placeholder="Nhập tên sản phẩm"
                            />
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Sửa sản phẩm
                          </button>
                        </div>
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

export default UpdateCategory;
