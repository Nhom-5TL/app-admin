import React, { useEffect, useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface sanP {
  maSP: number;
  tenSP: string;
  tenNhanHieu: string;
  maNhanHieu: number;
  tenLoai: string;
  maLoai: number;
  gia: number;
  htvc: number;
  trangThai: number;
  moTa: string;
}

const EditProduct: React.FC = () => {
  const [sanLP, setSP] = useState<sanP[]>([]);
  const [sanTH, setTH] = useState<sanP[]>([]);
  const [sanP, setSPH] = useState<sanP | null>(null);
  const { maSP } = useParams<{ maSP: string }>();
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchLoais = async () => {
      const response = await axios.get<sanP[]>(
        "https://localhost:7095/api/Loais"
      );
      setSP(response.data);
    };

    const fetchNhanHieus = async () => {
      const response = await axios.get<sanP[]>(
        "https://localhost:7095/api/NhanHieux"
      );
      setTH(response.data);
    };

    fetchLoais();
    fetchNhanHieus();
  }, []);

  useEffect(() => {
    const fetchSanPham = async () => {
      const response = await axios.get<sanP>(
        `https://localhost:7095/api/SanPhams/${maSP}`
      );
      setSPH(response.data);
    };

    fetchSanPham();
  }, [maSP]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await axios.put(
        `https://localhost:7095/api/SanPhams/${maSP}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Product updated successfully:", response.data);
        navigate("/product");
      } else {
        console.error("Failed to update product:", response);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-10">
          <div className="container mt-5">
            <div className="card">
              <div className="card-header">Chỉnh sửa sản phẩm</div>
              <div className="card-body">
                {sanP && (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="productImages">
                            Hình ảnh sản phẩm
                          </label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="productImages"
                            name="hinhanhtailen"
                            multiple
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tenSP">Tên sản phẩm</label>
                          <input
                            type="text"
                            className="form-control"
                            id="tenSP"
                            defaultValue={sanP.tenSP}
                            name="tenSP"
                            placeholder="Nhập tên sản phẩm"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="gia">Giá</label>
                          <input
                            type="text"
                            className="form-control"
                            id="gia"
                            defaultValue={sanP.gia}
                            name="gia"
                            placeholder="Nhập giá"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="maLoai">Loại sản phẩm</label>
                          <select
                            className="form-control"
                            id="maLoai"
                            name="maLoai"
                            defaultValue={sanP.maLoai}
                          >
                            {sanLP.map((option) => (
                              <option key={option.maLoai} value={option.maLoai}>
                                {option.tenLoai}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="maNhanHieu">Thương hiệu</label>
                          <select
                            className="form-control"
                            id="maNhanHieu"
                            name="maNhanHieu"
                            defaultValue={sanP.maNhanHieu}
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
                          <label htmlFor="moTa">Mô tả</label>
                          <textarea
                            className="form-control"
                            id="moTa"
                            name="moTa"
                            defaultValue={sanP.moTa}
                            placeholder="Nhập mô tả sản phẩm"
                          ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Sửa sản phẩm
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
