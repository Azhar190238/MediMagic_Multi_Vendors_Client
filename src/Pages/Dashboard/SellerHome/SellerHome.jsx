
import UseAuth from "../../../Hooks/UseAuth";


const SellerHome = () => {
    const { user } = UseAuth();
    return (
        <div>
                 <h2>
            <span>Hi , WelCome seller Mr.  </span>
            {
              user?.displayName ? user.displayName: 'back'
            }
            </h2>
        </div>
    );
};

export default SellerHome;