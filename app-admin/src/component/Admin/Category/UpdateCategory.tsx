import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateCategoryModalProps {
  maLoai: number;
  onClose: () => void;
  onCategoryUpdated: () => void;
}

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({ maLoai, onClose, onCategoryUpdated }) => {
  const [productName, setProductName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`https://localhost:7095/api/loais/${maLoai}`);
        setProductName(response.data.tenLoai);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy loại sản phẩm:", error);
        setLoading(false);
      }
    };

    fetchCategory();
  }, [maLoai]);

  const handleUpdateCategory = async () => {
    try {
      await axios.put(`https://localhost:7095/api/loais/${maLoai}`, {
        maLoai,
        tenLoai: productName,
      });
      toast.success("Cập nhật loại sản phẩm thành công!"); // Add success toast notification
      onCategoryUpdated();
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật loại sản phẩm:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cập nhật Loại Sản Phẩm</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Tên Loại Sản Phẩm</label>
              <input
                type="text"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Đóng
            </button>
            <button type="button" className="btn btn-primary" onClick={handleUpdateCategory}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
  