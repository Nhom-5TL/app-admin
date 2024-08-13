import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Create from "./Create";
import UpdateThuongHieu from "./UpdateThuongHieu";

interface NhanHieu {
  maNhanHieu: number;
  tenNhanHieu: string;
}

const Index = () => {
  const [ThuongHieus, setThuongHieu] = useState<NhanHieu[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedNhanHieu, setSelectedNhanHieu] = useState<NhanHieu | null>(null);

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
        toast.success("Xóa nhãn hiệu thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa loại sản phẩm:", error);
        toast.error("Lỗi khi xóa nhãn hiệu!");
      }
    }
  };

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const toggleUpdateModal = (nhanHieu: NhanHieu | null = null) => {
    setSelectedNhanHieu(nhanHieu);
    setShowUpdateModal(!showUpdateModal);
  };

  const reloadData = () => {
    fetchThuongHieu();
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
                  <button
                    className="btn btn-primary btn-round ms-auto"
                    onClick={toggleCreateModal}
                  >
                    <i className="fa fa-plus"></i> Thêm Thương hiệu
                  </button>
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
                            <button
                              onClick={() => toggleUpdateModal(thuongHieu)}
                              className="btn btn-link btn-primary btn-lg"
                            >
                              <i className="fa fa-edit"></i>
                            </button>
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

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm Thương hiệu</h5>
                <button
                  type="button"
                  className="close"
                  onClick={toggleCreateModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Create closeModal={() => { toggleCreateModal(); reloadData(); }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedNhanHieu && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cập nhật Thương hiệu</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => toggleUpdateModal(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <UpdateThuongHieu
                  maNhanHieu={selectedNhanHieu.maNhanHieu}
                  tenNhanHieu={selectedNhanHieu.tenNhanHieu}
                  closeModal={() => { toggleUpdateModal(null); reloadData(); }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
