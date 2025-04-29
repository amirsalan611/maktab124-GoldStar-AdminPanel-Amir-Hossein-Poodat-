import { ToastContainer } from "react-toastify";
import "./App.css";
import { AsideProvider } from "./components/Context/Context";
import AppRoutes from "./Routes/Routes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  return (
    <div dir="rtl">
      <ThemeProvider theme={theme}>
        <AsideProvider>
          <AppRoutes />
        </AsideProvider>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
