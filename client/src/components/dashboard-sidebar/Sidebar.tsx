import React, {useState} from 'react';
import {
  TeamOutlined,
} from '@ant-design/icons';
import {FaRegUser} from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { BsCalendar2Check } from "react-icons/bs";
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
  getItem(<NavLink to="/dashboard/profile">Profile</NavLink>, '2', <FaRegUser className="!text-[20px]"/>),
  getItem(<NavLink to="/dashboard/barbers">Barbers</NavLink>, '3', <TeamOutlined className="!text-[20px]"/>),
  getItem('Users', 'sub1', <TeamOutlined className="!text-[20px]"/>, [
    getItem(<NavLink to="/dashboard/users?user-status=all">All users</NavLink>, '4'),
    getItem(<NavLink to="/dashboard/users?user-status=active">Active</NavLink>, '5'),
    getItem(<NavLink to="/dashboard/users?user-status=archived">Archived</NavLink>, '6'),
  ]),
  getItem(<NavLink to="/dashboard/service">Service</NavLink>, '7', <GrServices className="!text-[20px]"/>),
  getItem(<NavLink to="/dashboard/booking">Booking</NavLink>, '8', <BsCalendar2Check className="!text-[20px]"/>),
  // getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '7'), getItem('Team 2', '8')]),
  // getItem('Files', '9', <FileOutlined/>),
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