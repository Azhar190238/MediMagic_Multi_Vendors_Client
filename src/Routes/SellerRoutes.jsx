import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import useSeller from "../Hooks/useSeller";


const SellerRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  const [isSeller, isSellerLoading] = useSeller();
  const location = useLocation();
  if (loading || isSellerLoading) {
    return <progress className="progress w-56"></progress>
  }

  if (user && isSeller) {
    return children
  }
  return <Navigate to='/' state={{ form: location }} replace></Navigate>
};

export default SellerRoutes;