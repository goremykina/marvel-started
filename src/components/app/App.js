import AppHeader from "../appHeader/AppHeader";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="app">
            <AppHeader/>
            <Outlet/>
        </div>
    );
}

export default App;
