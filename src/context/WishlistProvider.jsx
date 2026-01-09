import { useState, createContext, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  function AddToWishlist(movieId) {
    if (wishlist.includes(movieId)) {
      setWishlist(wishlist.filter((id) => id !== movieId));
    } else {
      setWishlist([...wishlist, movieId]);
    }
  }

  function RemoveFromWishlist(movieId) {
    setWishlist(wishlist.filter((id) => id !== movieId));
  }

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, AddToWishlist, RemoveFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
