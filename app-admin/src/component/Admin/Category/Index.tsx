import React from 'react'

const Index = () => {
  return (
<div className="container mt-50" >
      <div className="page-inner">
        <div className="page-header"></div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">Loại sản phẩm </h4>
                  <a
                    className="btn btn-primary btn-round ms-auto"
                    href='/category/create'
                  >
                    <i className="fa fa-plus"></i> Thêm loại sản phẩm
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
                        <th>Tên loại</th>
                        <th>Ngày tạo</th>

                        <th className="width: 10%">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>12</td>
                        <td>Gucci</td>

                        <td>23/07/2024</td>
                        <td>
                          <div className="form-button-action">
                            <a
                              href='category/update'
                              className="btn btn-link btn-primary btn-lg"
                             
                            >
                              <i className="fa fa-edit"></i>
                            </a>
                            <button
                              type="button"
                              className="btn btn-link btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteRowModal"
                            >
                              <i className="fa fa-times"></i> 
                            </button>
                          </div>
                        </td>
                      </tr>
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
                          <span className="fw-light"> loại sản phẩm</span>
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
  )
}

export default Index
