import React, {useState} from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {FaRegUser} from "react-icons/fa";
import type {MenuProps} from 'antd';
import {Layout, Menu} from 'antd';
import {NavLink} from "react-router-dom";

const {Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("        ", '1'),
  getItem(<NavLink to="/dashboard/profile">Profile</NavLink>, '2', <FaRegUser/>),
  getItem('Option 2', '3', <DesktopOutlined/>),
  getItem('Users', 'sub1', <TeamOutlined/>, [
    getItem(<NavLink to="/dashboard/users?user-status=all">All users</NavLink>, '4'),
    getItem(<NavLink to="/dashboard/users?user-status=active">Active</NavLink>, '5'),
    getItem(<NavLink to="/dashboard/users?user-status=archived">Archived</NavLink>, '6'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '7'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined/>),
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical"/>
        <Menu theme="dark" mode="inline" items={items}/>
      </Sider>
  );
};

export default Sidebar;