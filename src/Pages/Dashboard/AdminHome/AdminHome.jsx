import UseAuth from "../../../Hooks/UseAuth";


const AdminHome = () => {
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

export default AdminHome;