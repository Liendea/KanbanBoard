import { HashRouter } from "react-router-dom";
import "./styles/Global.scss";
import AppRoutes from "./Pages/AppRoutes";
import ResponsiveNavigator from "./components/ResponsiveNavigator";
import "./styles/FontSize.scss";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <ResponsiveNavigator />
        {/* Routes */}
        <AppRoutes />
      </div>
    </HashRouter>
  );
}

export default App;
