import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: (number | null)[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}
// src/types/thongKeTypes.ts
export interface ThongKeResponse {
    tongTienGioHang: number;
    count2: number;
    totalAmount1: number;
    count1: number;
    tongTienGioHangs: number;
    count: number;
    totalAmount: number;
    demkh: number;
}

// export interface ChartData {
//     labels: string[];
//     numbers: (number | null)[];
// }

const Dashboard: React.FC = () => {
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: 'Tổng tiền VND',
      data: [],
      backgroundColor: 'turquoise',
      borderColor: 'aqua',
      borderWidth: 1
    }]
  });
  const [viewType, setViewType] = useState<'day' | 'month' | 'year'>('day');
  const [loading, setLoading] = useState<boolean>(false);
  const [thongKeData, setThongKeData] = useState<ThongKeResponse | null>(null);
//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const data = await axios.get(`https://localhost:7095/api/ThongKe`);
//             setThongKeData(data.data);

//             const chart = await getChartData(viewType);
//             setChartData({
//                 labels: chart[0],
//                 numbers: chart[1]
//             });
//         } catch (error) {
//             console.error("Error fetching data", error);
//         }
//     };

//     fetchData();
// }, [viewType]);
  useEffect(() => {
    fetchData(viewType);
  }, [viewType]);

  const fetchData = async (type: 'day' | 'month' | 'year') => {
    setLoading(true);
    try {
        const data = await axios.get(`https://localhost:7095/api/ThongKe`);
        setThongKeData(data.data);
      const response = await axios.post(`https://localhost:7095/api/ThongKe?viewType=${ type }`);
      const [labels, numbers]: [string[], (number | null)[]] = response.data;
      setData({
        labels,
        datasets: [{
          label: 'Tổng tiền VND',
          data: numbers,
          backgroundColor: 'turquoise',
          borderColor: 'aqua',
          borderWidth: 1
        }]
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            `
            .nav-tabs .nav-link {
              border: none;
              background-color: transparent;
              color: black;
              font-weight: bold;
              position: relative;
            }
            .nav-tabs .nav-link.active {
              border: none;
            }
            .nav-tabs .nav-link.active::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              border-bottom: 3px solid aqua;
            }
            `
        }}
      />
      <div className="container">
      <div className="page-inner">
        <div className="page-header">
      

      <div className="row text-center">
      <h1>Thống kê</h1>
            {thongKeData && (
                <div className="row text-center">
                <div className="col-md-3">
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: 20,
                      width: 180,
                      height: 100,
                      marginTop: 20,
                      marginLeft: 10,
                      fontWeight: "bold",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    <br />
                    Tổng tiền sản phẩm
                    <br />
                    đã bán:
                    <p style={{ color: "red" }}>{thongKeData.tongTienGioHang}</p>
                    <br />
                  </div>
                </div>
                <div className="col-md-3">
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: 20,
                      width: 150,
                      height: 100,
                      marginTop: 20,
                      marginLeft: 10,
                      fontWeight: "bold",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    <br />
                    Tổng đơn hàng
                    <br />
                    đang xử lý: {thongKeData.count2}
                    <br />
                    <p style={{ color: "red" }}>{thongKeData.totalAmount1} đ</p>
                    <br />
                  </div>
                </div>
                <div className="col-md-3">
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: 20,
                      width: 180,
                      height: 100,
                      marginTop: 20,
                      marginLeft: 10,
                      fontWeight: "bold",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    <br />
                    Tổng đơn hàng
                    <br />
                    đã hủy: {thongKeData.count1}
                    <br />
                    <p style={{ color: "red" }}>{thongKeData.tongTienGioHangs} đ</p>
                    <br />
                  </div>
                </div>
                <div className="col-md-3">
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: 20,
                      width: 180,
                      height: 100,
                      marginTop: 20,
                      marginLeft: 10,
                      fontWeight: "bold",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    <br />
                    Tổng đơn hàng
                    <br />
                    đang giao: {thongKeData.count}
                    <br />
                    <p style={{ color: "red" }}>{thongKeData.totalAmount} đ</p>
                    <br />
                  </div>
                </div>
                <div className="col-md-3">
                  <div 
                    style={{
                      backgroundColor: "white",
                      borderRadius: 20,
                      width: 180,
                      height: 100,
                      marginTop: 20,
                      marginLeft: 10,
                      fontWeight: "bold",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    <br />
                    Tổng khách hàng
                    <br />
                    đang dùng:
                    <br />
                    <p> {thongKeData.demkh}</p>
                    <br />
                  </div>
                </div>
              </div>
                // <div>
                //     <p>Tổng tiền giỏ hàng: {thongKeData.TongTienGioHang}</p>
                //     <p>Số lượng đơn hàng trạng thái 2: {thongKeData.Count2}</p>
                //     <p>Tổng tiền trạng thái 0: {thongKeData.TotalAmount1}</p>
                //     <p>Số lượng đơn hàng trạng thái 1: {thongKeData.Count1}</p>
                //     <p>Tổng tiền trạng thái 3: {thongKeData.TongTienGioHangs}</p>
                //     <p>Số lượng đơn hàng trạng thái 1: {thongKeData.Count}</p>
                //     <p>Tổng tiền trạng thái 1: {thongKeData.TotalAmount}</p>
                //     <p>Số khách hàng: {thongKeData.DemKhachHang}</p>
                // </div>
            )}
      </div>

      <ul className="nav nav-tabs mt-4">
        <li className="nav-item">
          <a className={`nav-link ${viewType === 'day' ? 'active' : ''}`} onClick={() => setViewType('day')}>Theo ngày</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${viewType === 'month' ? 'active' : ''}`} onClick={() => setViewType('month')}>Theo tháng</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${viewType === 'year' ? 'active' : ''}`} onClick={() => setViewType('year')}>Theo năm</a>
        </li>
      </ul>

      <div className="tab-content mt-4">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div id="chartContainer">
            <Bar
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: {
                    display: true,
                    text: `Biểu đồ thống kê theo ${viewType == 'day' ? (
"ngày"
                    ): viewType == 'month' ? (
                        "tháng"
                    ):(
                        "năm"
                    )}`
                  }
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }}
            />
          </div>
        )}
      </div></div></div>
      </div>
    </>
  );
};

export default Dashboard;
