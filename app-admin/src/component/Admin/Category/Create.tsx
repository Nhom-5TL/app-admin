import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./catagory.css";

interface AddCategoryModalProps {
  onClose: () => void;
  onCategoryAdded: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose, onCategoryAdded }) => {
  const [tenLoai, setTenLoai] = useState("");

  const handleAddCategory = async () => {
    try {
      await axios.post("https://localhost:7095/api/loais", { tenLoai });
      toast.success("Thêm loại sản phẩm thành công!"); // Hiển thị thông báo thành công
      onCategoryAdded();
      onClose();
    } catch (error) {
      console.error("Lỗi khi thêm loại sản phẩm:", error);
      toast.error("Thêm loại sản phẩm thất bại!"); // Hiển thị thông báo lỗi
    }
  };

  return (
    <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Thêm Loại Sản Phẩm</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Tên Loại Sản Phẩm</label>
              <input
                type="text"
                className="form-control"
                value={tenLoai}
                onChange={(e) => setTenLoai(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Đóng
            </button>
            <button type="button" className="btn btn-primary" onClick={handleAddCategory}>
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
