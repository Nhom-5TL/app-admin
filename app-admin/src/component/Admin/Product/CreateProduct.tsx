import React, { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SanP {
  tenSP: string;
  tenNhanHieu: string;
  maNhanHieu: number;
  tenLoai: string;
  maLoai: number;
}

const CreateProduct: React.FC = () => {
  const [sanLP, setSP] = useState<SanP[]>([]);
  const [sanTH, setTH] = useState<SanP[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoais = async () => {
      const response = await axios.get("https://localhost:7095/api/Loais");
      console.log("DATA:", response.data);
      setSP(response.data);
    };
    fetchLoais();
  }, []);

  useEffect(() => {
    const fetchNhanHieus = async () => {
      const response = await axios.get("https://localhost:7095/api/NhanHieux");
      console.log("DATA:", response.data);
      setTH(response.data);
    };
    fetchNhanHieus();
  }, []);

  const AddSP = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

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

      if (response.status === 201) {
        console.log("Product added successfully", response.data);
        navigate("/product");
      } else {
        console.error("Failed to add product", response);
      }
    } catch (error) {
      console.error("Error adding product", error);
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
