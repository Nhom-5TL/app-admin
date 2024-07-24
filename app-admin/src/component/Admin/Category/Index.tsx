import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Category {
  maLoai: number;
  tenLoai: string;
}

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>("https://localhost:7095/api/loais");
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách loại sản phẩm:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    // Hiển thị thông báo xác nhận
    const confirmDelete = window.confirm("Bạn chắc chắn muốn xóa loại sản phẩm này không?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`https://localhost:7095/api/loais/${id}`);
        // Cập nhật danh sách sau khi xóa
        setCategories(categories.filter(category => category.maLoai !== id));
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
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">Loại sản phẩm</h4>
                  <Link className="btn btn-primary btn-round ms-auto" to="/category/create">
                    <i className="fa fa-plus"></i> Thêm loại sản phẩm
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table id="add-row" className="display table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tên loại</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category => (
                        <tr key={category.maLoai}>
                          <td>{category.maLoai}</td>
                          <td>{category.tenLoai}</td>
                          <td>
                            <Link to={`/category/update/${category.maLoai}`} className="btn btn-link btn-primary btn-lg">
                              <i className="fa fa-edit"></i>
                            </Link>
                            <button
                              type="button"
                              className="btn btn-link btn-danger"
                              onClick={() => handleDelete(category.maLoai)}
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
