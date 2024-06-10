import { Helmet } from "react-helmet-async";
import UseAuth from "../../Hooks/UseAuth";


const Profile = () => {
    const { user } = UseAuth();
    console.log(user);

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>MediMagic | Profile</title>
            </Helmet>
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className=" w-1/2">
            <img src={user?.photoURL} className=" w-96 rounded-lg shadow-2xl" />
            </div>
          
          <div className="w-1/2 text-center" >
            <h1 className="text-5xl font-bold">{user.displayName}</h1>
            <p className="py-6">As a CSE student, focus on building a strong foundation in programming and algorithms by practicing coding regularly.
                 Engage in projects, internships,
                 and hackathons to gain practical experience and improve problem-solving skills.
                  Stay updated with the latest technology trends and continuously learn new tools
                   and languages to stay competitive in the field.</p>
           
          </div>
        </div>
      </div>
    );
};

export default Profile;