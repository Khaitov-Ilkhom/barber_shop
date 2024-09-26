import {Breadcrumb, Layout} from "antd";
import Sidebar from "../../components/dashboard-sidebar/Sidebar.tsx";
import {Outlet, useNavigate} from "react-router-dom";

const {Header, Content} = Layout;


const Dashboard = () => {
  const navigate = useNavigate()

  return (
      <Layout className="min-h-screen">
        <Sidebar/>
        <Layout>
          <Header className="bg-white">
            <div>
              <button onClick={() => navigate("/")}>Home</button>
            </div>
          </Header>
          <Breadcrumb className="m-4 !mb-0">
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="bg-white rounded-xl shadow-xl overflow-hidden m-4 min-h-[550px] p-4">
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
  )
}
export default Dashboard
