import React , {useEffect, useState, FormEvent }from "react";

import {useParams } from 'react-router-dom';
import axios from 'axios'
interface sanP {
  maSP: number;
  tenSP: string;
  Anh: string;
  tenNhanHieu: string;
  maNhanHieu: number;
  tenLoai: string;
  maLoai: number;
  gia: number;
  htvc: number,
  trangThai: number,
  moTa: string
}
const EditProduct: React.FC = () => {

  const [sanLP, setSP] = useState<sanP[]>([]);
  const [sanTH, setTH] = useState<sanP[]>([]);
  const [sanP, setSPH] = useState<sanP | null >(null);
  const {maSP} = useParams<{ maSP: string }>();
  // const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
        const response = await axios.get<sanP[]>(
          "https://localhost:7095/api/Loais"
        );
        console.log("DATA:", response.data);

          setSP(response.data);
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
        const response = await axios.get<sanP[]>(
          "https://localhost:7095/api/NhanHieux"
        );
        console.log("DATA:", response.data);

        setTH(response.data);
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
        const response = await axios.get<sanP>(
          `https://localhost:7095/api/SanPhams/${maSP}`
        );
        console.log("DATA:", response.data);

        setSPH(response.data);
    };

    fetchUsers();
  }, [maSP]);
  const AddSP = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;

    const hinhAnh = (form.elements.namedItem("productImage") as HTMLInputElement).value;
    const tenSP = (form.elements.namedItem("productName") as HTMLInputElement).value;
    // const soLuong = (form.elements.namedItem("quantity") as HTMLInputElement).value;
    const gia = (form.elements.namedItem("price") as HTMLInputElement)
      .value;
    const maLoai = (form.elements.namedItem("maLoai") as HTMLInputElement).value;
    const htvc = (form.elements.namedItem("htvc") as HTMLInputElement).value;
    const maNhanHieu = (form.elements.namedItem("maTH") as HTMLInputElement)
      .value;
      const trangThai = (form.elements.namedItem("Thai") as HTMLInputElement).value;
      const moTa = (form.elements.namedItem("moTa") as HTMLInputElement)
      .value;
console.log(
  tenSP,
  moTa,
 gia,
 htvc,
 trangThai,
 maLoai ,
 maNhanHieu,
 hinhAnh,
)
const SanPham = {
  maSP,
  tenSP ,
  moTa,
 gia,
 htvc,
 trangThai,
 maLoai ,
 maNhanHieu,
 hinhAnh
} 
const response = await axios.put(
  "https://localhost:7095/api/SanPhams",
  SanPham
);
if (response.status === 200) {
  return response.data;
}


    };
  return (
    

      <div className="container mt-3">
      <div className="row">
        <div className="col-md-10">
          <div className="container mt-5">
            <div className="card">
              <div className="card-header"></div>

              <div className="card-body">
                <div className="container mt-5">
                {sanP && (
                  <form onSubmit={AddSP}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="productImage">
                            Hình ảnh sản phẩm
                          </label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="productImage"
                            defaultValue={sanP.Anh}
                            name="productImage"
                            multiple
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="productName">Tên sản phẩm</label>
                          <input
                            type="text"
                            className="form-control"
                            id="productName"
                            defaultValue={sanP.tenSP}
                            name="productName"
                            placeholder="Nhập tên sản phẩm"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="quantity">Số lượng</label>
                          <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            //   value={quantity}
                            //   onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Nhập số lượng"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="price">Giá</label>
                          <input
                            type="text"
                            className="form-control"
                            id="price"
                            defaultValue={sanP.gia}
                            name="price"
                            placeholder="Nhập giá"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="category">Loại sản phẩm</label>
                          <select className="form-control" id="category" name="maLoai">
                          {/* <option value="">Chọn loại sản phẩm</option>
                          <option value="category1">Loại 1</option>
                          <option value="category2">Loại 2</option> */}
                          {sanLP.map((option) => (
            <option key={option.maLoai} value={option.maLoai}>
              {option.tenLoai}
            </option>
          ))}
                        </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="brand">Thương hiệu</label>
                          <select className="form-control" id="brand" name="maTH">
                        {sanTH.map((option) => (
            <option key={option.maNhanHieu} value={option.maNhanHieu}>
              {option.tenNhanHieu}
            </option>
          ))}
                          {/* <option value="">Chọn thương hiệu</option>
                          <option value="brand1">Thương hiệu 1</option>
                          <option value="brand2">Thương hiệu 2</option> */}
                        </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="color">Màu</label>
                          <select className="form-control" id="color">
                            <option value="">Chọn màu</option>
                            <option value="red">Đỏ</option>
                            <option value="blue">Xanh</option>
                            {/* Thêm các tùy chọn khác */}
                          </select>
                        </div>
                        <div className="form-group">
                        <label>HTVC</label>
                        <input
                          type="text"
                          className="form-control"
                          id="htvc"
                          name="htvc"
                          defaultValue={sanP.htvc}
                          placeholder="Nhập giá"
                        />
                      </div>
                      <div className="form-group">
                        <label>Trạng Thái</label>
                        <input
                          type="text"
                          className="form-control"
                          id="Thai"
                          name="Thai"
                          defaultValue={sanP.trangThai}
                          placeholder="Nhập giá"
                        />
                      </div>
                        <div className="form-group">
                          <label htmlFor="description">Mô tả</label>
                          <textarea
                            className="form-control"
                            id="description"
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
    </div>
  );
};

export default EditProduct;
