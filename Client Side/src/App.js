import './App.scss';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import PrivateRoute from './Pages/PrivateRoute';
import Login from "../src/Pages/Auth/Login"
function App() {
  return (
    <>
      <PrivateRoute />
      <Login />
    </>
  );
}

export default App;
