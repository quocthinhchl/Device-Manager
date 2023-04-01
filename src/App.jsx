import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Layout } from 'antd';
import PageContent from './components/PageContent/PageContent';
// import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Layout>
        {/* <Navbar /> */}
        <PageContent />
      </Layout>
    </div>
  );
}
export default App;
