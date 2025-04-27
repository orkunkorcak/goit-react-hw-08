import { Outlet } from "react-router-dom";
import AppBar from "../appBar/AppBar";

const Layout = () => {
  return (
    <>
      <AppBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
