// import { FaGoogle } from "react-icons/fa";
// import UseAuth from "../../Hooks/UseAuth";
// import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
// import { useNavigate } from "react-router-dom";


// const SocialLogIn = () => {
//     const { googleSignIn } = UseAuth(); 
//     const axiosPublic = UseAxiosPublic();
//     const navigate = useNavigate()
//     const handleGoogleSignIn = () =>{
//         googleSignIn()
//         .then(result =>{
//             console.log(result.user)
//             const userInfo ={
//                 email: result.user?.email,
//                 name: result.user?.displayName
//             }
//             axiosPublic.post('/users', userInfo)
//             .then(res =>{
//                 console.log(res.data)
//                 navigate('/');
//             })
//         })
//     }
//     return (
//         <div className="px-8 mb-4">
//             {/* <div className="divider m-5"></div> */}
//             <div>
//                 <button onClick={handleGoogleSignIn} className="btn btn-outline ml-4 btn-success">
//                  <FaGoogle className="mr-2"></FaGoogle>
//                 Login By  Google
//                 </button>
//             </div>
            
//         </div>
//     );
// };

// export default SocialLogIn;


import { FaGoogle } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogIn = () => {
    const { googleSignIn } = UseAuth();
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            console.log(result.user);

            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                role: "user" // Include the default role as "user"
            };

            // Consider error handling for the axios request
            const response = await axiosPublic.post('/users', userInfo);
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error("Error during Google sign-in:", error);
            // Handle the error appropriately (e.g., display an error message to the user)
        }
    };

    return (
        <div className="px-8 mb-4">
            {/* <div className="divider m-5"></div> */}
            <div>
                <button onClick={handleGoogleSignIn} className="btn btn-outline ml-4 btn-success">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Login By Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogIn;
