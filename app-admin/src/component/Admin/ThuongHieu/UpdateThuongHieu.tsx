import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateThuongHieu = () => {
  const { MaThuongHieu } = useParams<{ MaThuongHieu: string }>();
  const [ThuongHieu, setThuongHieu] = useState("");
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThuongHieu = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/NhanHieux/${MaThuongHieu}`
        );
        console.log("Trả về api: ", response.data);
        setThuongHieu(response.data.tenNhanHieu);
        setLoading(false);
      } catch (error) {
        console.log("Lỗi không sửa được: ", error);
        setLoading(false);
      }
    };

    fetchThuongHieu();
  }, [MaThuongHieu]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.put(`https://localhost:7095/api/NhanHieux/${MaThuongHieu}`, {
        maNhanHieu: MaThuongHieu,
        tenNhanHieu: ThuongHieu,
      });
      navigate("/ThuongHieu");
    } catch (error) {
      console.error("Lỗi khi sửa thương hiệu:", error);
    }
  };

  if (Loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-10">
          <div className="container mt-5">
            <div className="card">
              <div className="card-header">Sửa thương hiệu</div>
              <div className="card-body">
                <div className="container mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="productName">Tên thương hiệu</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={ThuongHieu}
                        onChange={(e) => setThuongHieu(e.target.value)}
                        placeholder="Nhập tên thương hiệu"
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

export default UpdateThuongHieu;
