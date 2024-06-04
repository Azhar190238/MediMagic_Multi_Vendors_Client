import Swal from "sweetalert2";
import UseAuth from "../../../../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxios from "../../../../Hooks/UseAxios";
import UseCart from "../../../../Hooks/UseCart";


const RecommendCard = ({ recommend }) => {
    const { name, image, price, recipe, _id, category } = recommend;
    const { user } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = UseAxios();
    const [, refetch] = UseCart()
    const handelCard = () => {

        if (user && user.email) {

            /// send cart item to database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                price,
                image
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your Cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart to updated the cart items
                        refetch()
                    }
                })


        }
        else {
            Swal.fire({
                title: "You are not Login",
                text: "Please Log in!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes Log In"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10 ">
                <img className="rounded-xl" src={image} />
            </figure>
            <h2 className="absolute right-0 bg-slate-800 text-white mr-16 mt-16 p-2 rounded-md">$ {price}</h2>
            <div className="card-body items-center text-center">
                {/* <h2 className="absolute right-0 bg-slate-800 text-white">{recommend.price}</h2> */}
                <h2 className="card-title text-2xl uppercase">{category}</h2>

                <p>{recommend.recipe}</p>
                <div className="card-actions">
                    <button onClick={handelCard}
                        className="btn btn-outline border-0 border-orange-400 border-b-4">ADD TO CART</button>
                </div>
            </div>
        </div>
    );
};

export default RecommendCard;