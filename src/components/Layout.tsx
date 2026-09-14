import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import Chatbot from "./Chatbot";
import BackToTop from "./BackToTop";
import SEO from "./SEO";
import ResumeModal from "./ResumeModal";
import DemoModal from "./DemoModal";
import { ScrollRestoration } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-neutral-300 dark:selection:bg-neutral-800">
      <SEO title="Portfolio" name="Aiman Uddin" />
      <CustomCursor />
      <ScrollRestoration />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
      <BackToTop />
      <ResumeModal />
      <DemoModal />
    </div>
  );
}
