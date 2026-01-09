import { useContext } from "react";
import { WishlistContext } from "../context/WishListProvider";

function WishlistBtn({ movieId }) {
  const { wishlist, AddToWishlist, RemoveFromWishlist } =
    useContext(WishlistContext);
  return (
    <button
      onClick={() => {
        wishlist.includes(movieId)
          ? RemoveFromWishlist(movieId)
          : AddToWishlist(movieId);
      }}
    >
      {wishlist.includes(movieId)
        ? "Retirer du wishlist"
        : "Ajouter au wishlist"}
    </button>
  );
}

export default WishlistBtn;
