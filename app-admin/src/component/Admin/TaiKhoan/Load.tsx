import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface TaiKhoan {
  maKH: number,
    tenKh: string,
    email: string,
    sdt: string,
    cccd: string,
    tenTaiKhoan: string,
    matKhau: string,
    trangThai: string
}

export const LinkImg = "https://localhost:7095/api/SanPhams/get-pro-img/";
const Load = () =>{
    const [sanPhams, setSanPhams] = useState<TaiKhoan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7095/api/KhachHangs");
        console.log("DỮ LIỆU:", response.data);
        setSanPhams(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  // const CtSP = async (maKH: number) => {
  //   try {
  //     const response = await axios.get<TaiKhoan>(
  //       `https://localhost:7095/api/SanPhams/${maKH}`
  //     );
  //     console.log("Dữ liệu phản hồi:", response.data);
  //     navigate(`/${maKH}`);
  //   } catch (error) {
  //     console.error("Lỗi trong CtWeb:", error);
  //   }
  // };

  const deleteProduct = async (maKH: number) => {
    try {
      const confirmDelete = window.confirm("Bạn muốn xóa khách hàng này không?");
      if (confirmDelete) {
        await axios.delete(`https://localhost:7095/api/KhachHangs/${maKH}`);
        setSanPhams(sanPhams.filter((item) => item.maKH !== maKH));
        navigate("/load");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };
  const KhTK = async (maKH: number) => {
    try {
      const confirmDelete = window.confirm("Bạn muốn khóa khách hàng này không?");
      if (confirmDelete) {
        await axios.put(`https://localhost:7095/api/KhachHangs/KhoaTK?id=${maKH}`);
        setSanPhams(sanPhams.filter((item) => item.maKH !== maKH));
        // navigate("/load");
        window.location.href = "/load";
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };
  const MoTK = async (maKH: number) => {
    try {
      const confirmDelete = window.confirm("Bạn muốn mở khóa khách hàng này không?");
      if (confirmDelete) {
        await axios.put(`https://localhost:7095/api/KhachHangs/MoTK?id=${maKH}`);
        setSanPhams(sanPhams.filter((item) => item.maKH !== maKH));
        // navigate("/load");
        window.location.href = "/load";
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };
return  (
    <>
    <div className="container">
      <div className="page-inner">
        <div className="page-header"></div>
        <div className="row">
          <div>
            <div className="card">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">Tài khoản</h4>
                  
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
                        <th>Tên Khách Hàng</th>
                        <th>Số Điện Thoại</th>
                        <th>CCCD</th>
                        <th>Tên Đăng Nhập</th>
                        <th>Mật Khẩu</th>
                        <th>Trạng Thái</th>
                        <th className="width: 10%">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sanPhams.map((item) => (
                        <tr key={item.maKH}>
                          <td>{item.maKH}</td>
                          {/* <td>
                            <img
                              src={`${LinkImg}${item.tenHinhAnhDauTien}`}
                              style={{ width: "100px", height: "100px" }}
                              alt="Hình ảnh sản phẩm"
                            />
                          </td> */}
                          <td>{item.tenKh}</td>
                          <td>{item.sdt}</td>
                          <td>{item.cccd}</td>
                          <td>{item.tenTaiKhoan}</td>
                          <td>{item.matKhau}</td>
                          <td>{item.trangThai}</td>
                          <td>
                            <div className="form-button-action">
                              {item.trangThai == "online" ? (
                                <button
                                className="btn btn-link btn-primary btn-lg"
                                onClick={() => KhTK(item.maKH)}
                              >
                                <i className="fa fa-edit"></i> Khóa Tài Khoản
                              </button>
                              ): (
<button
                                className="btn btn-link btn-primary btn-lg"
                                onClick={() => MoTK(item.maKH)}
                              >
                                <i className="fa fa-edit"></i> Mở Tài Khoản
                              </button>
                              )}
                              
                              
                              <button
                                type="submit"
                                className="btn btn-link btn-danger"
                                onClick={() => {
                                    deleteProduct(item.maKH);
                                  
                                }}
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
                {/* <div
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
                        <p>Bạn có chắc chắn muốn xóa khách hàng này?</p>
                      </div>
                      <div className="modal-footer border-0">
                        <button
                          type="submit"
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
)
}

export default Load;