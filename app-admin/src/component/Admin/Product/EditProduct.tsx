import React, { useEffect, useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  hinhAnhs: { maHinhAnh: number; tenHinhAnh: string }[];
  mauSacs: { maMauSac: number; tenMauSac: string }[];
  kichThucs: { maKichThuoc: number; tenKichThuoc: string }[];
}

const EditProduct: React.FC = () => {
  const [sanLP, setSP] = useState<sanP[]>([]);
  const [sanTH, setTH] = useState<sanP[]>([]);
  const [sanP, setSPH] = useState<sanP | null>(null);
  const [allColors, setAllColors] = useState<
    { maMauSac: number; tenMauSac: string }[]
  >([]);
  const [allSizes, setAllSizes] = useState<
    { maKichThuoc: number; tenKichThuoc: string }[]
  >([]);

  const { maSP } = useParams<{ maSP: string }>();
  const navigate = useNavigate();

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

    const fetchColors = async () => {
      const response = await axios.get<
        { maMauSac: number; tenMauSac: string }[]
      >("https://localhost:7095/api/Colors");
      setAllColors(response.data);
    };

    const fetchSizes = async () => {
      const response = await axios.get<
        { maKichThuoc: number; tenKichThuoc: string }[]
      >("https://localhost:7095/api/Sizes");
      setAllSizes(response.data);
    };

    fetchLoais();
    fetchNhanHieus();
    fetchColors();
    fetchSizes();
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
        toast.success("Sửa sản phẩm thành công!");
        setTimeout(() => {
          navigate("/product");
        }, 2000);
      } else {
        console.error("Failed to update product:", response);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
      setTimeout(() => {
        navigate("/product");
      }, 500);
    }
  };

  const handleColorChange = (colorId: number, checked: boolean) => {
    const updatedColors = sanP?.mauSacs ? [...sanP.mauSacs] : [];
    if (checked) {
      const color = allColors.find((c) => c.maMauSac === colorId);
      if (color && !updatedColors.some((c) => c.maMauSac === colorId)) {
        updatedColors.push(color);
      }
    } else {
      const index = updatedColors.findIndex((c) => c.maMauSac === colorId);
      if (index !== -1) {
        updatedColors.splice(index, 1);
      }
    }
    setSPH((prev) => (prev ? { ...prev, mauSacs: updatedColors } : null));
  };

  const handleSizeChange = (sizeId: number, checked: boolean) => {
    const updatedSizes = sanP?.kichThucs ? [...sanP.kichThucs] : [];
    if (checked) {
      const size = allSizes.find((s) => s.maKichThuoc === sizeId);
      if (size && !updatedSizes.some((s) => s.maKichThuoc === sizeId)) {
        updatedSizes.push(size);
      }
    } else {
      const index = updatedSizes.findIndex((s) => s.maKichThuoc === sizeId);
      if (index !== -1) {
        updatedSizes.splice(index, 1);
      }
    }
    setSPH((prev) => (prev ? { ...prev, kichThucs: updatedSizes } : null));
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
                          {sanP.hinhAnhs.map((image) => (
                            <div key={image.maHinhAnh} className="mt-2">
                              <img
                                src={`https://localhost:7095/api/SanPhams/get-pro-img/${image.tenHinhAnh}`}
                                alt={image.tenHinhAnh}
                                className="img-thumbnail"
                                style={{ width: "100px" }}
                              />
                            </div>
                          ))}
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
                        <div className="form-group">
                          <label>Chọn màu</label>
                          {allColors.map((color) => (
                            <div key={color.maMauSac} className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`color-${color.maMauSac}`}
                                checked={sanP.mauSacs.some(
                                  (selectedColor) =>
                                    selectedColor.maMauSac === color.maMauSac
                                )}
                                onChange={(e) =>
                                  handleColorChange(
                                    color.maMauSac,
                                    e.target.checked
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`color-${color.maMauSac}`}
                              >
                                {color.tenMauSac}
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="form-group">
                          <label>Chọn kích thước</label>
                          {allSizes.map((size) => (
                            <div key={size.maKichThuoc} className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`size-${size.maKichThuoc}`}
                                checked={sanP.kichThucs.some(
                                  (selectedSize) =>
                                    selectedSize.maKichThuoc ===
                                    size.maKichThuoc
                                )}
                                onChange={(e) =>
                                  handleSizeChange(
                                    size.maKichThuoc,
                                    e.target.checked
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`size-${size.maKichThuoc}`}
                              >
                                {size.tenKichThuoc}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Lưu
                    </button>
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
