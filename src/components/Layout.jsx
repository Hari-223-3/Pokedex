import { Outlet, Link } from "react-router-dom";
import LiveBackground from "./LiveBackground.jsx";

function Layout() {
  return (
    <>
      <LiveBackground />
      <div className="app">
        <div className="glass-panel">
          <header className="app-header">
            <Link to="/" className="app-title-link">
              <h1>PokéDex Mini</h1>
            </Link>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
