import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface CreateProps {
  closeModal: () => void;
}

const Create = ({ closeModal }: CreateProps) => {
  const [thuongHieu, setThuongHieu] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThuongHieu(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://localhost:7095/api/NhanHieux",
        { TenNhanHieu: thuongHieu }
      );
      alert("Thêm thương hiệu thành công");
      closeModal(); // Close the modal after success
    } catch (error) {
      console.error("Lỗi thêm thương hiệu", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên loại sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Nhập tên loại sản phẩm"
            value={thuongHieu}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
        >
          Thêm thương hiệu
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

export default Create;
