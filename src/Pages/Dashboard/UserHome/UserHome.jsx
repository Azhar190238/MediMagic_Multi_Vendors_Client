import UseAuth from "../../../Hooks/UseAuth";


const UserHome = () => {
    const { user } = UseAuth();
    return (
        <div>
                 <h2>
            <span>Hi , WelCome </span>
            {
              user?.displayName ? user.displayName: 'back'
            }
            </h2>
        </div>
    );
};

export default UserHome;