import React from "react";

const Product = ({ product, addToCart, userProfileImage }) => {
    return (
        <div className="item">
            <div className="divImg">
                <img src={`data:image/jpeg;base64,${product.Pimg}`} alt="" className="ProImg" />
            </div>
            <h2>{product.Pproduct}</h2>
            <div className="price">${product.Prprice}</div>
            <p className="Bdes">{product.Pdes}</p>
            <div className="usB">
                {/* Display user profile image */}
                <img src={`data:image/jpeg;base64,${userProfileImage}`} alt="User Profile" className="dpBid" />
                <p className="usBT">{product.username}</p>
            </div>
        </div>
    );
}
export default Product;