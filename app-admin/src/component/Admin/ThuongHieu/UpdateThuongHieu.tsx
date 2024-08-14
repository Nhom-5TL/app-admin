import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface UpdateProps {
  maNhanHieu: number;
  tenNhanHieu: string;
  closeModal: () => void;
}

const UpdateThuongHieu = ({ maNhanHieu, tenNhanHieu, closeModal }: UpdateProps) => {
  const [updatedThuongHieu, setUpdatedThuongHieu] = useState(tenNhanHieu);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatedThuongHieu(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(
        `https://localhost:7095/api/NhanHieux/${maNhanHieu}`,
        {
          MaNhanHieu: maNhanHieu,
          TenNhanHieu: updatedThuongHieu,
        }
      );

      alert("Cập nhật thương hiệu thành công");
      closeModal(); // Close the modal after success
    } catch (error) {
      console.error("Lỗi cập nhật thương hiệu", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên Thương hiệu1</label>
          <input
            type="text"
            className="form-control"
            id="brandName"
            placeholder="Nhập tên thương hiệu"
            value={updatedThuongHieu}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
        >
          Cập nhật thương hiệu
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeModal}
        >
          Hủy
        </button>
      </form>
    </div>
  );
};

export default UpdateThuongHieu;
