import { Outlet } from 'react-router-dom';
import ChatBot from '../components/custom/ChatBot';

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <ChatBot />
    </>
  );
};

export default MainLayout;
