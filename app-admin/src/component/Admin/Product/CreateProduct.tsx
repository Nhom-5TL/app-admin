import React, { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SanP {
  tenSP: string;
  tenNhanHieu: string;
  maNhanHieu: number;
  tenLoai: string;
  maLoai: number;
}

interface ColorOption {
  value: string;
  label: string;
}

interface SizeOption {
  value: string;
  label: string;
}

const CreateProduct: React.FC = () => {
  const [sanLP, setSP] = useState<SanP[]>([]);
  const [sanTH, setTH] = useState<SanP[]>([]);
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());

  const colors: ColorOption[] = [
    { value: "Đen", label: "Đen" },
    { value: "Trắng", label: "Trắng" },
    { value: "Xám", label: "Xám" },
    { value: "Vàng", label: "Vàng" },
  ];

  const sizes: SizeOption[] = [
    { value: "30mm", label: "30mm" },
    { value: "32mm", label: "32mm" },
    { value: "34mm", label: "34mm" },
    { value: "36mm", label: "36mm" },
    { value: "38mm", label: "38mm" },
    { value: "40mm", label: "40mm" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoais = async () => {
      const response = await axios.get("https://localhost:7095/api/Loais");
      setSP(response.data);
    };
    fetchLoais();
  }, []);

  useEffect(() => {
    const fetchNhanHieus = async () => {
      const response = await axios.get("https://localhost:7095/api/NhanHieux");
      setTH(response.data);
    };
    fetchNhanHieus();
  }, []);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedColors((prev) => {
      const newSet = new Set(prev);
      if (event.target.checked) {
        newSet.add(value);
      } else {
        newSet.delete(value);
      }
      return newSet;
    });
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedSizes((prev) => {
      const newSet = new Set(prev);
      if (event.target.checked) {
        newSet.add(value);
      } else {
        newSet.delete(value);
      }
      return newSet;
    });
  };

  const AddSP = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Thêm các màu sắc và kích thước đã chọn vào FormData dưới dạng JSON
    formData.append(
      "mauSacsJson",
      JSON.stringify(
        Array.from(selectedColors).map((color) => ({ TenMauSac: color }))
      )
    );
    formData.append(
      "kichThuocsJson",
      JSON.stringify(
        Array.from(selectedSizes).map((size) => ({ TenKichThuoc: size }))
      )
    );

    try {
      const response = await axios.post(
        "https://localhost:7095/api/SanPhams",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Thêm sản phẩm thành công!");
        navigate("/product");
      } else {
        // Xử lý các lỗi không phải là 500
        if (response.status !== 500) {
          toast.error("Thêm sản phẩm thất bại!");
          console.error(
            "Thêm sản phẩm thất bại, mã trạng thái:",
            response.status
          );
        }
      }
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại");
      console.error("Lỗi thêm sản phẩm thất bại:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-10">
          <div className="container mt-5">
            <div className="card">
              <div className="card-header">Thêm Sản Phẩm</div>
              <div className="card-body">
                <form onSubmit={AddSP}>
                  <div className="form-group">
                    <label htmlFor="productImage">Hình ảnh sản phẩm</label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="productImage"
                      name="hinhAnhTaiLens"
                      multiple
                    />
                  </div>
                  <div className="form-group">
                    <label>Tên sản phẩm</label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      name="tenSP"
                      placeholder="Nhập tên sản phẩm"
                    />
                  </div>
                  <div className="form-group">
                    <label>Giá</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="gia"
                      placeholder="Nhập giá"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Loại sản phẩm</label>
                    <select
                      className="form-control"
                      id="category"
                      name="maLoai"
                    >
                      {sanLP.map((option) => (
                        <option key={option.maLoai} value={option.maLoai}>
                          {option.tenLoai}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="brand">Thương hiệu</label>
                    <select
                      className="form-control"
                      id="brand"
                      name="maNhanHieu"
                    >
                      {sanTH.map((option) => (
                        <option
                          key={option.maNhanHieu}
                          value={option.maNhanHieu}
                        >
                          {option.tenNhanHieu}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Màu sắc</label>
                    {colors.map((color) => (
                      <div className="form-check" key={color.value}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`color-${color.value}`}
                          value={color.value}
                          onChange={handleColorChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`color-${color.value}`}
                        >
                          {color.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="form-group">
                    <label>Kích thước</label>
                    {sizes.map((size) => (
                      <div className="form-check" key={size.value}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`size-${size.value}`}
                          value={size.value}
                          onChange={handleSizeChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`size-${size.value}`}
                        >
                          {size.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="form-group">
                    <label>Mô tả</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="moTa"
                      placeholder="Nhập mô tả sản phẩm"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Thêm sản phẩm
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
