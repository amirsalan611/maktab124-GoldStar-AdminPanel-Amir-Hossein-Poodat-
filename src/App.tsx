import { ToastContainer } from "react-toastify";
import "./App.css";
import { AsideProvider } from "./components/Context/Context";
import AppRoutes from "./Routes/Routes";

function App() {
  return (
    <div dir="rtl">
      <AsideProvider>
        <AppRoutes />
      </AsideProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
