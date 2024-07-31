import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface NhanHieu {
  maNhanHieu: number;
  tenNhanHieu: string;
}

const Index = () => {
  const [ThuongHieus, setThuongHieu] = useState<NhanHieu[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchThuongHieu = async () => {
    try {
      const response = await axios.get<NhanHieu[]>(
        "https://localhost:7095/api/NhanHieux"
      );
      setThuongHieu(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách loại sản phẩm:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThuongHieu();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn chắc chắn muốn xóa loại sản phẩm này không?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`https://localhost:7095/api/NhanHieux/${id}`);
        setThuongHieu(
          ThuongHieus.filter((thuongHieu) => thuongHieu.maNhanHieu !== id)
        );
      } catch (error) {
        console.error("Lỗi khi xóa loại sản phẩm:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-50">
      <div className="page-inner">
        <div className="page-header"></div>
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">Thương hiệu sản phẩm</h4>
                  <Link
                    className="btn btn-primary btn-round ms-auto"
                    to="/ThuongHieu/Create"
                  >
                    <i className="fa fa-plus"></i> Thêm Thương hiệu
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="add-row"
                    className="display table table-striped table-hover"
                  >
                    <thead>
                      <tr>
                        <th>Tên Thương hiệu</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ThuongHieus.map((thuongHieu) => (
                        <tr key={thuongHieu.maNhanHieu}>
                          <td>{thuongHieu.tenNhanHieu}</td>
                          <td>
                            <Link
                              to={`/ThuongHieu/Update/${thuongHieu.maNhanHieu}`}
                              className="btn btn-link btn-primary btn-lg"
                            >
                              <i className="fa fa-edit"></i>
                            </Link>
                            <button
                              type="button"
                              className="btn btn-link btn-danger"
                              onClick={() =>
                                handleDelete(thuongHieu.maNhanHieu)
                              }
                            >
                              <i className="fa fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
