// src/components/Sidebar.tsx
import React from 'react';
import './Sidebar.css'; // Tạo file CSS riêng cho các style của Sidebar nếu cần

const Sidebar = () => {
  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            <li className="nav-item active">
              <a data-bs-toggle="collapse" href="#dashboard" className="collapsed" aria-expanded="false">
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
                <span className="caret"></span>
              </a>
              <div className="collapse" id="dashboard">
                <ul className="nav nav-collapse">
                  <li>
                    <a href="/admin/dashboard1">
                      <span className="sub-item">Dashboard 1</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-section">
              <span className="sidebar-mini-icon">
                <i className="fa fa-ellipsis-h"></i>
              </span>
              <h4 className="text-section">Components</h4>
            </li>
            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#base">
                <i className="fas fa-layer-group"></i>
                <p>Base</p>
                <span className="caret"></span>
              </a>
              <div className="collapse" id="base">
                <ul className="nav nav-collapse">
                  <li>
                    <a href="/admin/components/avatars">
                      <span className="sub-item">Avatars</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/components/buttons">
                      <span className="sub-item">Buttons</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/components/gridsystem">
                      <span className="sub-item">Grid System</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/components/panels">
                      <span className="sub-item">Panels</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/components/notifications">
                      <span className="sub-item">Notifications</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/components/sweetalert">
                      <span className="sub-item">Sweet Alert</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/components/font-awesome-icons">
                      <span className="sub-item">Font Awesome Icons</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/components/simple-line-icons">
                      <span className="sub-item">Simple Line Icons</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/components/typography">
                      <span className="sub-item">Typography</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            {/* Thêm các phần khác của sidebar tại đây */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
