import UseAuth from "../../../Hooks/UseAuth";


const UserHome = () => {
    const { user } = UseAuth();
    return (
        <div className=" flex  justify-center items-center text-4xl">
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