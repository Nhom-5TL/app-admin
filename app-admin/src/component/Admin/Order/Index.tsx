import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { toast } from "react-toastify";

interface ChiTietDonHang {
  maCTDH: number;
  maDH: number;
  maSP: number;
  sanPham: {
    maSP: number;
    tenSP: string;
    moTa: string;
    gia: number;
    htvc: number;
    trangThai: number;
    maLoai: number;
    maNhanHieu: number;
    hinhAnhs: Array<{
      maHinhAnh: number;
      tenHinhAnh: string;
      maSanPham: number;
    }>;
  };
  soLuong: number;
  donGia: number;
  tenSP: string;
  maMauSac: number;
  maKichThuoc: number;
}

interface Order {
  maDH: number;
  tenKh: string;
  ghiChu: string;
  maKh: number;
  ngayTao: string;
  trangThai: number;
  trangThaiThanhToan: string;
  trangThaiTT: number;
  lyDoHuy: string;
  diaChi: string;
  sdt: string;
  chiTietDonHangs: ChiTietDonHang[];
}

interface Orders {
  dangXuLy: Order[];
  dangGiao: Order[];
  hoanThanh: Order[];
  donHuy: Order[];
}

const Index = () => {
  const [orders, setOrders] = useState<Orders>({
    dangXuLy: [],
    dangGiao: [],
    hoanThanh: [],
    donHuy: [],
  });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Orders>(
          "https://localhost:7095/api/DonHangAdmin"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu đơn hàng:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleApproveOrder = async (order: Order) => {
    try {
      await axios.put(
        `https://localhost:7095/api/DonHangAdmin/DuyetDon/${order.maDH}`
      );
      setOrders((prevOrders) => {
        const updatedOrders = { ...prevOrders };
        const orderIndex = updatedOrders.dangXuLy.findIndex(
          (o) => o.maDH === order.maDH
        );
        if (orderIndex > -1) {
          const [approvedOrder] = updatedOrders.dangXuLy.splice(orderIndex, 1);
          approvedOrder.trangThai = 1;
          updatedOrders.dangGiao.push(approvedOrder);
        }
        return updatedOrders;
      });

      toast.success("Duyệt đơn hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi duyệt đơn hàng:", error);
    }
  };

  const handleAppHoanThanh = async (order: Order) => {
    try {
      // Gọi API để cập nhật trạng thái đơn hàng
      await axios.put(
        `https://localhost:7095/api/DonHangAdmin/HoanThanh/${order.maDH}`
      );

      setOrders((prevOrders) => {
        const updatedOrders = { ...prevOrders };
        const orderIndex = updatedOrders.dangGiao.findIndex(
          (o) => o.maDH === order.maDH
        );

        if (orderIndex > -1) {
          const [completedOrder] = updatedOrders.dangGiao.splice(orderIndex, 1);
          completedOrder.trangThai = 2;
          updatedOrders.hoanThanh.push(completedOrder);
        }

        return updatedOrders;
      });

      toast.success("Duyệt đơn hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi hoàn thành đơn hàng:", error);
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);

    if (order) {
      // document.getElementById("tenNguoiNhan")!.innerText = order.tenKh;
      document.getElementById("diaChi")!.innerText = order.diaChi;
      document.getElementById("soDienThoai")!.innerText = order.sdt;
      document.getElementById("tenNguoiDat")!.innerText = order.tenKh;
      document.getElementById("ngayDat")!.innerText = new Date(
        order.ngayTao
      ).toLocaleDateString();
      document.getElementById("trangThaiDonHang")!.innerText =
        order.trangThai === 0
          ? "Đang xử lý"
          : order.trangThai === 1
          ? "Đang giao"
          : order.trangThai === 2
          ? "Hoàn thành"
          : "Đã hủy";
      document.getElementById("trangThaiThanhToan")!.innerText =
        order.trangThaiTT === 1 ? "Đã thanh toán" : "Chưa thanh toán";

      document.getElementById("hinhThucThanhToan")!.innerText =
        order.trangThaiThanhToan;

      const chiTietSanPham = document.getElementById("chiTietSanPham")!;
      chiTietSanPham.innerHTML = "";
      order.chiTietDonHangs.forEach((chiTiet, index) => {
        const hinhAnhSanPham =
          chiTiet.sanPham.hinhAnhs.length > 0
            ? `https://localhost:7095/api/SanPhams/get-pro-img/${chiTiet.sanPham.hinhAnhs[0].tenHinhAnh}`
            : "";

        chiTietSanPham.innerHTML += `
          <tr>
            <td>${index + 1}</td>
              <td><img src="${hinhAnhSanPham}" alt="${
          chiTiet.tenSP
        }" style="width: 100px; height: auto;" /></td>
            <td>${chiTiet.tenSP}</td>
            <td>${chiTiet.soLuong}</td>
            <td>${chiTiet.donGia}</td>
            <td>${chiTiet.donGia * chiTiet.soLuong}</td>
          </tr>
        `;
      });
    }
  };

  const handleHuyDon = async () => {
    if (selectedOrder) {
      try {
        // Gửi yêu cầu hủy đơn hàng đến API
        await axios.put(
          `https://localhost:7095/api/DonHangAdmin/HuyDon/${selectedOrder.maDH}`,
          { lyDoHuy: cancelReason }
        );

        // Cập nhật trạng thái đơn hàng trong frontend
        setOrders((prevOrders) => {
          const updatedOrders = { ...prevOrders };
          const orderIndex = updatedOrders.dangXuLy.findIndex(
            (o) => o.maDH === selectedOrder.maDH
          );

          if (orderIndex > -1) {
            const [canceledOrder] = updatedOrders.dangXuLy.splice(
              orderIndex,
              1
            );
            canceledOrder.trangThai = 3;
            updatedOrders.hoanThanh.push(canceledOrder);
          }

          return updatedOrders;
        });

        // Đóng modal sau khi hủy thành công
        const modalElement = document.getElementById(
          "HuyDonModal"
        ) as HTMLElement;
        const bootstrapModal = new Modal(modalElement); // Use Modal class from Bootstrap
        bootstrapModal.hide();

        toast.success("Hủy đơn hàng thành công!");
      } catch (error) {
        console.error("Lỗi khi hủy đơn hàng:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        {/* Modal chi tiết đơn hàng */}
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
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody id="chiTietSanPham"></tbody>
                  </table>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h4>Thông tin người đặt</h4>
                    <p>
                      <strong>Tên người đặt:</strong>{" "}
                      <span id="tenNguoiDat"></span>
                    </p>
                    <p>
                      <strong>Số điện thoại:</strong>{" "}
                      <span id="soDienThoai"></span>
                    </p>
                    <p>
                      <strong>Địa chỉ:</strong> <span id="diaChi"></span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h4>Thông tin đơn hàng</h4>
                    <p>
                      <strong>Trạng thái đơn hàng:</strong>{" "}
                      <span id="trangThaiDonHang"></span>
                    </p>
                    <p>
                      <strong>Trạng thái thanh toán:</strong>{" "}
                      <span id="trangThaiThanhToan"></span>
                    </p>

                    <p>
                      <strong>Hình thức thanh toán:</strong>{" "}
                      <span id="hinhThucThanhToan"></span>
                    </p>
                    <p>
                      <strong>Ngày đặt:</strong> <span id="ngayDat"></span>
                    </p>
                  </div>
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
              </div>
            </div>
          </div>
        </div>

        {/* Modal hủy đơn hàng */}
        <div
          className="modal fade"
          id="HuyDonModal"
          tabIndex={-1}
          aria-labelledby="HuyDonModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="HuyDonModalLabel">
                  Hủy đơn hàng
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="lyDoHuy" className="form-label">
                    Lý do hủy
                  </label>
                  <textarea
                    className="form-control"
                    id="lyDoHuy"
                    rows={3}
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
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
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleHuyDon}
                >
                  Hủy đơn hàng
                </button>
              </div>
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
                    className="nav-link active"
                    id="line-home-tab"
                    data-bs-toggle="pill"
                    href="#line-home"
                    role="tab"
                    aria-controls="line-home"
                    aria-selected="true"
                  >
                    Đang xử lý
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="line-profile-tab"
                    data-bs-toggle="pill"
                    href="#line-profile"
                    role="tab"
                    aria-controls="line-profile"
                    aria-selected="false"
                  >
                    Đang giao
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="line-contact-tab"
                    data-bs-toggle="pill"
                    href="#line-contact"
                    role="tab"
                    aria-controls="line-contact"
                    aria-selected="false"
                  >
                    Hoàn thành
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="donHuy-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#donHuy"
                    type="button"
                    role="tab"
                    aria-controls="donHuy"
                    aria-selected="false"
                  >
                    Đơn hủy
                  </button>
                </li>
              </ul>
              <div className="tab-content mt-3 mb-3" id="line-tabContent">
                {/* Đang xử lý */}
                <div
                  className="tab-pane fade show active"
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
                        {orders.dangXuLy.map((order) => (
                          <tr key={order.maDH}>
                            <td>{order.maDH}</td>
                            <td>{order.tenKh}</td>
                            <td>
                              {new Date(order.ngayTao).toLocaleDateString()}
                            </td>
                            <td>
                              {order.trangThai === 0
                                ? "Đang xử lý"
                                : order.trangThai === 1
                                ? "Đang giao"
                                : "Hoàn thành"}
                            </td>
                            <td>
                              {order.trangThai !== -1 && (
                                <>
                                  <button
                                    className="btn btn-link btn-primary"
                                    onClick={() => handleApproveOrder(order)}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    className="btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ChiTietModal"
                                    onClick={() => handleViewDetails(order)}
                                  >
                                    <i className="fas fa-bars"></i>
                                  </button>
                                  {order.trangThai === 0 &&
                                    order.trangThaiThanhToan === "COD" && (
                                      <button
                                        className="btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#HuyDonModal"
                                        onClick={() => setSelectedOrder(order)}
                                      >
                                        <i
                                          style={{ color: "red" }}
                                          className="fas fa-times"
                                        ></i>
                                      </button>
                                    )}
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Đang giao */}
                <div
                  className="tab-pane fade"
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
                        {orders.dangGiao.map((order) => (
                          <tr key={order.maDH}>
                            <td>{order.maDH}</td>
                            <td>{order.tenKh}</td>
                            <td>
                              {new Date(order.ngayTao).toLocaleDateString()}
                            </td>
                            <td>
                              {order.trangThai === 0
                                ? "Đang xử lý"
                                : order.trangThai === 1
                                ? "Đang giao"
                                : "Hoàn thành"}
                            </td>
                            <td>
                              <button
                                className="btn btn-link btn-primary"
                                onClick={() => handleAppHoanThanh(order)}
                              >
                                <i className="fas fa-check"></i>
                              </button>
                              <button
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#ChiTietModal"
                                onClick={() => handleViewDetails(order)}
                              >
                                <i className="fas fa-bars"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Hoàn thành */}
                <div
                  className="tab-pane fade"
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
                        {orders.hoanThanh.map((order) => (
                          <tr key={order.maDH}>
                            <td>{order.maDH}</td>
                            <td>{order.tenKh}</td>
                            <td>
                              {new Date(order.ngayTao).toLocaleDateString()}
                            </td>
                            <td>
                              {order.trangThai === 0
                                ? "Đang xử lý"
                                : order.trangThai === 1
                                ? "Đang giao"
                                : "Hoàn thành"}
                            </td>
                            <td>
                              <button
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#ChiTietModal"
                                onClick={() => handleViewDetails(order)}
                              >
                                <i className="fas fa-bars"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Đơn hủy */}
                <div
                  className="tab-pane fade"
                  id="donHuy"
                  role="tabpanel"
                  aria-labelledby="donHuy-tab"
                >
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tên khách hàng</th>
                        <th>Ngày đặt</th>

                        <th>Trạng thái</th>
                        <th>Lý do hủy</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.donHuy.map((order, index) => (
                        <tr key={order.maDH}>
                          <td>{index + 1}</td>
                          <td>{order.tenKh}</td>
                          <td>
                            {new Date(order.ngayTao).toLocaleDateString()}
                          </td>
                          <td>Đã hủy</td>
                          <td>{order.lyDoHuy}</td>
                          <td>
                            <button
                              className="btn btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#ChiTietModal"
                              onClick={() => handleViewDetails(order)}
                            >
                              <i className="fas fa-bars"></i>
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
