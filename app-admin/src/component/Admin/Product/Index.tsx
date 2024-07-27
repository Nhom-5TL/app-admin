import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "bootstrap";

interface sanP {
  maSP: number;
  tenSP: string;
  hinhAnh: string;
  tenNhanHieu: string;
  maNhanHieu: number;
  tenLoai: string;
  moTa: string;
  maLoai: number;
  gia: number;
  htvc: number;
  trangThai: number;
}

export const LinkImg = "https://localhost:7095/api/SanPhams/get-pro-img/"

const Index = () => {
  const [sanP, setSPH] = useState<sanP[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7095/api/SanPhams");
        console.log("DỮ LIỆU:", response.data);
        setSPH(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  const CtSP = async (maSP: number) => {
    try {
      const response = await axios.get<sanP>(
        `https://localhost:7095/api/SanPhams/${maSP}`
      );
      console.log("Dữ liệu phản hồi:", response.data);
      navigate(`/${maSP}`);
    } catch (error) {
      console.error("Lỗi trong CtWeb:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`https://localhost:7095/api/SanPhams/${id}`);

      setSPH(sanP.filter((item) => item.maSP !== id));

      const modalElement = document.getElementById("deleteRowModal");
      if (modalElement) {
        const modal = Modal.getInstance(modalElement);
        modal?.hide();
      }
      navigate("/product");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="page-header"></div>
        <div className="row">
          <div>
            <div className="card">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">Sản phẩm</h4>
                  <a
                    className="btn btn-primary btn-round ms-auto"
                    href="/product/create"
                  >
                    <i className="fa fa-plus"></i> Thêm sản phẩm
                  </a>
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
                        <th>#</th>
                        <th>Hình</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th className="width: 10%">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sanP.map((item) => (
                        <tr key={item.maSP}>
                          <td>{item.maSP}</td>
                          <td>
                            <img
                              src={`${LinkImg}${item.hinhAnh}`}
                              style={{ width: "100px", height: "100px" }}
                            />
                          </td>
                          <td>{item.tenSP}</td>
                          <td>{item.gia}đ</td>
                          <td>{item.moTa}</td>
                          <td>
                            <div className="form-button-action">
                              <button
                                className="btn btn-link btn-primary btn-lg"
                                onClick={() => CtSP(item.maSP)}
                              >
                                <i className="fa fa-edit"></i> Sửa
                              </button>
                              <button
                                type="button"
                                className="btn btn-link btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteRowModal"
                                onClick={() => setSelectedId(item.maSP)}
                              >
                                <i className="fa fa-times"></i> Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Modal Xóa */}
                <div
                  className="modal fade"
                  id="deleteRowModal"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header border-0">
                        <h5 className="modal-title">
                          <span className="fw-mediumbold"> Xóa</span>
                          <span className="fw-light"> sản phẩm</span>
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
                      </div>
                      <div className="modal-footer border-0">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            if (selectedId !== null) {
                              deleteProduct(selectedId);
                            }
                          }}
                        >
                          Xóa
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                        >
                          Đóng
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
    </div>
  );
};

export default Index;
