import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [thuongHieu, setThuongHieu] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThuongHieu(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7095/api/NhanHieux",
        {
          TenNhanHieu: thuongHieu,
        }
      );

      console.log("Thêm thành công", response.data);
      alert("Thêm thương hiệu thành công");
      navigate("/ThuongHieu");
    } catch (error) {
      console.error("Lỗi thêm thương hiệu", error);
    }
  };
  return (
    <div className="container mt-5" style={{ marginLeft: "15%" }}>
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
                            value={thuongHieu}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-left"
                          style={{ marginLeft: "10px" }}
                        >
                          Thêm thương hiệu
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning"
                          style={{ marginLeft: "10px" }}
                          onClick={() => navigate("/ThuongHieu")}
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
