import * as React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import OverviewPage from './components/OverviewPage/Overview'

const { Header, Content, Footer } = Layout;
function App() {
  return (
    <Layout className="layout">
      <Header>
          <span style={{color: 'white'}}>Giám sát 2VN</span>
      </Header>
      <Content className="site-layout">
        <OverviewPage />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by ddoongngoo ©2020 v1.0.0</Footer>
    </Layout>
  );
}

export default App;
