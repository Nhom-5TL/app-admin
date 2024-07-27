import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateCategory = () => {
  const { MaLoai } = useParams<{ MaLoai: string }>();
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`https://localhost:7095/api/loais/${MaLoai}`);
        console.log("Dữ liệu trả về từ API:", response.data); // Kiểm tra dữ liệu
        setProductName(response.data.tenLoai);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy loại sản phẩm:", error);
        setLoading(false);
      }
    };

    fetchCategory();
  }, [MaLoai]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.put(`https://localhost:7095/api/loais/${MaLoai}`, {
        maLoai: MaLoai,
        tenLoai: productName,
      });
      navigate("/category");
    } catch (error) {
      console.error("Lỗi khi sửa loại sản phẩm:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-10">
          <div className="container mt-5">
            <div className="card">
              <div className="card-header">Sửa loại sản phẩm</div>

              <div className="card-body">
                <div className="container mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="productName">Tên loại sản phẩm</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Nhập tên sản phẩm"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                      Sửa sản phẩm
                    </button>
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
