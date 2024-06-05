

const DiscountCart = ({ cart }) => {
    console.log('Cart',cart)
    return (
        <div>
                   <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img className="rounded-xl" src={cart.image} />
                </figure>
                <h2 className="absolute right-0 bg-slate-800 text-white mr-16 mt-16 p-2 rounded-md">$ {cart.price}</h2>
                <div className="card-body items-center text-center">
                    <p className="card-title text-2xl ">{cart.category}</p>
                    <div className="card-actions">
                        <button  className="btn btn-outline border-0 border-orange-400 border-b-4"> Details</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default DiscountCart;