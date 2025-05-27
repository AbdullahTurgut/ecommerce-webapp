import { Outlet } from "react-router-dom";
import NavBar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
const RootLayout = () => {
  return (
    <main>
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default RootLayout;
