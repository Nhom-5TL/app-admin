import React , {useEffect, useState }from "react";

import { useNavigate } from 'react-router-dom';
import axios from 'axios'
interface sanP {
  maSP: number;
  tenSP: string;
  Anh: string;
  tenNhanHieu: string;
  maNhanHieu: number;
  tenLoai: string;
  maLoai: number;
  gia: number;
  htvc: number,
  trangThai: number,
}
const Index = () => {
  const [sanP, setSPH] = useState<sanP[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
        const response = await axios.get(
          "https://localhost:7095/api/SanPhams"
        );
        console.log("DATA:", response.data);

        setSPH(response.data);
    };

    fetchUsers();
  }, []);

  const CtSP = async (maSP: number) => {
    try {
      const response = await axios.get<sanP[]>(`https://localhost:7095/api/SanPhams/${maSP}`);
      console.log('Response data:', response.data); // Kiểm tra dữ liệu trả về
      setSPH(response.data);
      navigate(`./${maSP}`);
    } catch (error) {
      console.error('Error in CtWeb:', error);
    }
  };
  return (
  
    <div className="container">
      <div className="page-inner">
        <div className="page-header"></div>
        <div className="row">
          <div >
            <div className="card">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">Sản phẩm </h4>
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
                        <th>Hinh</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Ngày tạo</th>

                        <th className="width: 10%">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sanP.map((item, key) =>(

<tr key={key}>
<td>{item.maSP}</td>
<td>{item.tenSP}</td>
<td>900</td>
<td>{item.gia}đ</td>
<td>23/07/2024</td>
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

                {/* <!-- Delete Modal --> */}
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
                        <form asp-action="Delete" method="post">
                          <input type="hidden" id="deleteId" name="id" />
                          <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
                          <div className="modal-footer border-0">
                            <button type="submit" className="btn btn-primary">
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
    </div>
  );
};

export default Index;
