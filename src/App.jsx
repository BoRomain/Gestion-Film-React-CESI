import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "./context/WishListProvider";
import MoviesList from "./components/MoviesList";
import MovieDetail from "./components/MovieDetail";
import Wishlist from "./components/Wishlist";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const { wishlist } = useContext(WishlistContext);
  return (
    <div className="App">
      <div className="header">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Liste de films
        </button>
        <button
          onClick={() => {
            navigate("/wishlist");
          }}
        >
          Wishlist ({wishlist.length})
        </button>
      </div>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;
