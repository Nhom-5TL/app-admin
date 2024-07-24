import React , {useEffect, useState, FormEvent }from "react";


import axios from 'axios'
interface sanP {
  tenSP: string;
  Anh: string;
  tenNhanHieu: string;
  maNhanHieu: number;
  tenLoai: string;
  maLoai: number;
}
const CreateProduct: React.FC = () => {
  const [sanLP, setSP] = useState<sanP[]>([]);
  const [sanTH, setTH] = useState<sanP[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
        const response = await axios.get(
          "https://localhost:7095/api/Loais"
        );
        console.log("DATA:", response.data);

          setSP(response.data);
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
        const response = await axios.get(
          "https://localhost:7095/api/NhanHieux"
        );
        console.log("DATA:", response.data);

        setTH(response.data);
    };

    fetchUsers();
  }, []);

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
  tenSP ,
  moTa,
 gia,
 htvc,
 trangThai,
 maLoai ,
 maNhanHieu,
 hinhAnh
} 
const response = await axios.post(
  "https://localhost:7095/api/SanPhams",
  SanPham
);
if (response.status === 200) {
  return response.data;
}


    };


  return (
    <>
    <div className="container mt-3" >
        <div className="row">
      <div className="col-md-10" >
        <div className="container mt-5">
          <div className="card">
            <div className="card-header"></div>

            <div className="card-body">
              <div className="row">
                <div className="col-md-10">
                  <div className="row">
                    <form onSubmit={AddSP}> 

                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="productImage">Hình ảnh sản phẩm</label>
                        <br></br>
                        <input
                          type="file"
                          className="form-control-file"
                          id="productImage"
                          name="productImage"
                          multiple
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Tên sản phẩm</label>
                        <input
                          type="text"
                          className="form-control"
                          id="productName"
                          name="productName"
                          placeholder="Nhập tên sản phẩm"
                        />
                      </div>
                      <div className="form-group">
                        <label>Số lượng</label>
                        <input
                          type="number"
                          className="form-control"
                          id="quantity"
                          name="quantity"
                          placeholder="Nhập số lượng"
                        />
                      </div>
                      <div className="form-group">
                        <label>Giá</label>
                        <input
                          type="text"
                          className="form-control"
                          id="price"
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
                      {/* <div className="form-group">
                        <label>Màu</label>
                        <select className="form-control" id="color">
                          <option value="">Chọn màu</option>
                          <option value="red">Đỏ</option>
                          <option value="blue">Xanh</option>
                          {/* Thêm các tùy chọn khác */}
                        {/* </select> */}
                      {/* </div>  */}
                      <div className="form-group">
                        <label>HTVC</label>
                        <input
                          type="text"
                          className="form-control"
                          id="htvc"
                          name="htvc"
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
                          placeholder="Nhập giá"
                        />
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
                      <button
                        type="submit"
                        className="btn btn-primary btn-left"
                        style={{ marginLeft: "10px" }}
                      >
                        Thêm sản phẩm
                      </button>
                      <button
                        type="submit"
                        className="btn btn-warning"
                        style={{ marginLeft: "10px" }}
                      >
                        Trở lại
                      </button>
                      
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default CreateProduct;
