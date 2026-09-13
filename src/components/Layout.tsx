import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import Chatbot from "./Chatbot";
import BackToTop from "./BackToTop";
import { ScrollRestoration } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-neutral-300 dark:selection:bg-neutral-800">
      <CustomCursor />
      <ScrollRestoration />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
      <BackToTop />
    </div>
  );
}
