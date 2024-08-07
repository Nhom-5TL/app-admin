import React, { useState, useEffect } from "react";
import axios from "axios";

interface DonHang {
  MaDH: number;
  TenKh: string;
  NgayTao: string;
  TrangThai: number;
}

const Index = () => {
  const [donHangs, setDonHangs] = useState<DonHang[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    axios
      .get<DonHang[]>("/api/DonHangAdmin/DonHangs")
      .then((response) => {
        setDonHangs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setDonHangs([]); // Ensure donHangs is an array even if the API call fails
      });
  }, []);

  const filterDonHangs = (trangThai: number) => {
    if (!Array.isArray(donHangs)) return [];
    return donHangs.filter((dh) => dh.TrangThai === trangThai);
  };

  return (
    <div className="container">
      <div className="page-inner">
        {/* ChiTietModal */}
        <div
          className="modal fade"
          id="ChiTietModal"
          tabIndex={-1}
          aria-labelledby="ChiTietModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ChiTietModalLabel">
                  Chi tiết đơn hàng
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody id="chiTietSanPham"></tbody>
                  </table>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <h5>Thông tin người dùng</h5>
                    <p>
                      <strong>Tên người nhận:</strong>{" "}
                      <span id="tenNguoiNhan"></span>
                    </p>
                    <p>
                      <strong>Địa chỉ:</strong> <span id="diaChi"></span>
                    </p>
                    <p>
                      <strong>Số điện thoại:</strong>{" "}
                      <span id="soDienThoai"></span>
                    </p>
                    <p>
                      <strong>Tên người đặt:</strong>{" "}
                      <span id="tenNguoiDat"></span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h5>Thông tin đơn hàng</h5>
                    <p>
                      <strong>Ngày đặt:</strong> <span id="ngayDat"></span>
                    </p>
                    <p>
                      <strong>Trạng thái:</strong>{" "}
                      <span id="trangThaiDonHang"></span>
                    </p>
                    <p>
                      <strong>Thanh toán:</strong>{" "}
                      <span id="trangThaiThanhToan"></span>
                    </p>
                    <p>
                      <strong>Hình thức thanh toán:</strong>{" "}
                      <span id="hinhThucThanhToan"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HuyDonModal */}
        <div
          className="modal fade"
          id="HuyDonModal"
          tabIndex={-1}
          aria-labelledby="HuyDonModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form method="post" action="/api/DonHangAdmin/HuyDon">
                <div className="modal-header">
                  <h5 className="modal-title" id="HuyDonModalLabel">
                    Nhập lý do hủy đơn hàng
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input type="hidden" id="donHangId" name="id" />
                  <div className="mb-3">
                    <label htmlFor="lyDoHuy" className="col-form-label">
                      Lý do hủy:
                    </label>
                    <textarea
                      className="form-control"
                      id="lyDoHuy"
                      name="LyDoHuy"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Đóng
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-11 mt-5">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Đơn hàng</h4>
            </div>
            <div className="card-body">
              <ul
                className="nav nav-tabs nav-line nav-color-secondary"
                id="line-tab"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 0 ? "active" : ""}`}
                    id="line-home-tab"
                    data-bs-toggle="pill"
                    href="#line-home"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected={activeTab === 0}
                    onClick={() => setActiveTab(0)}
                  >
                    Đang xử lý
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 1 ? "active" : ""}`}
                    id="line-profile-tab"
                    data-bs-toggle="pill"
                    href="#line-profile"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected={activeTab === 1}
                    onClick={() => setActiveTab(1)}
                  >
                    Đang giao
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 2 ? "active" : ""}`}
                    id="line-contact-tab"
                    data-bs-toggle="pill"
                    href="#line-contact"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected={activeTab === 2}
                    onClick={() => setActiveTab(2)}
                  >
                    Hoàn thành
                  </a>
                </li>
              </ul>
              <div className="tab-content mt-3 mb-3" id="line-tabContent">
                <div
                  className={`tab-pane fade ${
                    activeTab === 0 ? "show active" : ""
                  }`}
                  id="line-home"
                  role="tabpanel"
                  aria-labelledby="line-home-tab"
                >
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên người đặt</th>
                          <th>Ngày đặt</th>
                          <th>Trạng thái</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterDonHangs(0).map((dh, index) => (
                          <tr key={index}>
                            <td>{dh.MaDH}</td>
                            <td>{dh.TenKh}</td>
                            <td>{dh.NgayTao}</td>
                            <td>Đang xử lý</td>
                            <td>
                              <a className="btn ">
                                <i
                                  style={{ color: "green" }}
                                  className="fas fa-check"
                                ></i>
                              </a>
                              <button
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#ChiTietModal"
                                data-id={dh.MaDH}
                              >
                                <i
                                  style={{ color: "blue" }}
                                  className="fas fa-info-circle"
                                ></i>
                              </button>
                              <button
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#HuyDonModal"
                                data-id={dh.MaDH}
                              >
                                <i
                                  style={{ color: "red" }}
                                  className="fas fa-times-circle"
                                ></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === 1 ? "show active" : ""
                  }`}
                  id="line-profile"
                  role="tabpanel"
                  aria-labelledby="line-profile-tab"
                >
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên người đặt</th>
                          <th>Ngày đặt</th>
                          <th>Trạng thái</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterDonHangs(1).map((dh, index) => (
                          <tr key={index}>
                            <td>{dh.MaDH}</td>
                            <td>{dh.TenKh}</td>
                            <td>{dh.NgayTao}</td>
                            <td>Đang giao</td>
                            <td>
                              <a className="btn ">
                                <i
                                  style={{ color: "green" }}
                                  className="fas fa-check"
                                ></i>
                              </a>
                              <button
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#ChiTietModal"
                                data-id={dh.MaDH}
                              >
                                <i
                                  style={{ color: "blue" }}
                                  className="fas fa-info-circle"
                                ></i>
                              </button>
                              <button
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#HuyDonModal"
                                data-id={dh.MaDH}
                              >
                                <i
                                  style={{ color: "red" }}
                                  className="fas fa-times-circle"
                                ></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === 2 ? "show active" : ""
                  }`}
                  id="line-contact"
                  role="tabpanel"
                  aria-labelledby="line-contact-tab"
                >
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên người đặt</th>
                          <th>Ngày đặt</th>
                          <th>Trạng thái</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterDonHangs(2).map((dh, index) => (
                          <tr key={index}>
                            <td>{dh.MaDH}</td>
                            <td>{dh.TenKh}</td>
                            <td>{dh.NgayTao}</td>
                            <td>Hoàn thành</td>
                            <td>
                              <a className="btn ">
                                <i
                                  style={{ color: "green" }}
                                  className="fas fa-check"
                                ></i>
                              </a>
                              <button
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#ChiTietModal"
                                data-id={dh.MaDH}
                              >
                                <i
                                  style={{ color: "blue" }}
                                  className="fas fa-info-circle"
                                ></i>
                              </button>
                              <button
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#HuyDonModal"
                                data-id={dh.MaDH}
                              >
                                <i
                                  style={{ color: "red" }}
                                  className="fas fa-times-circle"
                                ></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <nav>
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
