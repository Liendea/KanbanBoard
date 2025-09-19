import { BrowserRouter } from "react-router-dom";
import "./styles/Global.scss";
import AppRoutes from "./Pages/AppRoutes";
import ResponsiveNavigator from "./components/ResponsiveNavigator";
import "./styles/Fonts.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ResponsiveNavigator />
        {/* Routes */}
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
