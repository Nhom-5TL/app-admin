// src/component/Admin/header.tsx
import React from "react";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="sidebar" data-background-color="dark">
        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">
            <ul className="nav nav-secondary">
              <li className="nav-item active">
                <a href="/product">
                  <i className="fas fa-home"></i>
                  <p>Sản phẩm</p>
                </a>
              </li>
              <li className="nav-section">
                <span className="sidebar-mini-icon">
                  <i className="fa fa-ellipsis-h"></i>
                </span>
              </li>
              <li className="nav-item">
                <a data-bs-toggle="collapse" href="#base">
                  <i className="fas fa-layer-group"></i>
                  <p>Danh mục</p>
                  <span className="caret"></span>
                </a>
                <div className="collapse" id="base">
                  <ul className="nav nav-collapse">
                    <li>
                      <a href="/admin/components/avatars">
                        <span className="sub-item">Thương hiệu</span>
                      </a>
                    </li>
                    <li>
                      <a href="/category">
                        <span className="sub-item">Loại sản phẩm</span>
                      </a>
                    </li>
                    <li>
                      <a href="/admin/components/gridsystem">
                        <span className="sub-item">Màu</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
