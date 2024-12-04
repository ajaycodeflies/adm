import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";


export default function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div id="page-content">
        <Header />
            {children}
        <Footer />
      </div>
    </div>
  );
}
