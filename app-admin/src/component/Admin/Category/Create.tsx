import React from "react";

const Create = () => {
  return (
    <div className="container mt-5" style={{marginLeft: '15%'}}>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header"></div>

            <div className="card-body">
              <div className="row">
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Tên loại sản phẩm</label>
                        <input
                          type="text"
                          className="form-control"
                          id="productName"
                          placeholder="Nhập tên loại sản phẩm"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-left"
                        style={{ marginLeft: "10px" }}
                      >
                        Thêm loại sản phẩm
                      </button>
                      <button
                        type="submit"
                        className="btn btn-warning"
                        style={{ marginLeft: "10px" }}
                      >
                        Trở lại
                      </button>
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
