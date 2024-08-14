import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCategoryModal from "./Create"; // Import modal thêm loại sản phẩm
import UpdateCategoryModal from "./UpdateCategory"; // Import modal cập nhật loại sản phẩm
import "./catagory.css";
import { toast } from "react-toastify";

interface Category {
  maLoai: number;
  tenLoai: string;
}

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false); // State cho modal thêm loại sản phẩm
  const [showUpdateModal, setShowUpdateModal] = useState<number | null>(null); // State cho modal cập nhật loại sản phẩm

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
    const confirmDelete = window.confirm("Bạn chắc chắn muốn xóa loại sản phẩm này không?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`https://localhost:7095/api/loais/${id}`);
        setCategories(categories.filter(category => category.maLoai !== id))
        toast.success("Xóa loại thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa loại sản phẩm:", error);
      }
    }
  };

  const handleCategoryAdded = () => {
    fetchCategories(); // Refresh danh sách loại sản phẩm sau khi thêm
  };

  const handleCategoryUpdated = () => {
    fetchCategories(); // Refresh danh sách loại sản phẩm sau khi cập nhật
    setShowUpdateModal(null); // Đóng modal cập nhật
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
                  <button className="btn btn-primary btn-round ml-auto nutthem" onClick={() => setShowAddModal(true)}>
                    Thêm
                  </button>
                </div>
              </div>
              <div className="card-body">
                {/* Categories Table */}
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tên Loại</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.maLoai}>
                          <td>{category.maLoai}</td>
                          <td>{category.tenLoai}</td>
                          <td>
                            <button className="btn btn-link btn-primary btn-lg" onClick={() => setShowUpdateModal(category.maLoai)}>
                              <i className="fa fa-edit"></i>
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(category.maLoai)}>
                              <i className="fas fa-trash"></i>
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
      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onCategoryAdded={handleCategoryAdded}
        />
      )}
      {showUpdateModal !== null && (
        <UpdateCategoryModal
          maLoai={showUpdateModal}
          onClose={() => setShowUpdateModal(null)}
          onCategoryUpdated={handleCategoryUpdated}
        />
      )}
    </div>
  );
};

export default Index;
