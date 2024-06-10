import { Helmet } from "react-helmet-async";
import UseAuth from "../../../Hooks/UseAuth";


const UserHome = () => {
    const { user } = UseAuth();
    return (
        <div className=" flex  justify-center items-center text-4xl">
              <Helmet>
                <title>MediMagic | UserHome</title>
            </Helmet>
            <h2>
                <span>Hi , WelCome </span>
                {
                    user?.displayName ? user.displayName : 'back'
                }
            </h2>
        </div>
    );
};

export default UserHome;