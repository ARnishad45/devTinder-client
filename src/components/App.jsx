import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Body from "../components/Body";
import Login from "../components/Login";
import Feed from "../components/Feed";
import appStore from "../utils/appStore";
import Profile from "./Profile";
import Connections from "./Connections.jsx";
import Requests from "./Requests.jsx";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<h1>Signup</h1>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
