import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import AllBooks from "./pages/AllBooks";
import AddBook from "./pages/AddBook";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<AllBooks />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
