// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
// import { LogOut, MessageSquare, Settings, User } from "lucide-react";

// const Navbar = () => {
//   const { logout, authUser } = useAuthStore();

//   return (
//     <header
//       className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
//     backdrop-blur-lg bg-base-100/80"
//     >
//       <div className="container mx-auto px-4 h-16">
//         <div className="flex items-center justify-between h-full">
//           <div className="flex items-center gap-8">
//             <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
//               <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
//                 <MessageSquare className="w-5 h-5 text-primary" />
//               </div>
//               <h1 className="text-lg font-bold">Chatty</h1>
//             </Link>
//           </div>

//           <div className="flex items-center gap-2">
//             <Link
//               to={"/settings"}
//               className={`
//               btn btn-sm gap-2 transition-colors

//               `}
//             >
//               <Settings className="w-4 h-4" />
//               <span className="hidden sm:inline">Settings</span>
//             </Link>

//             {authUser && (
//               <>
//                 <Link to={"/profile"} className={`btn btn-sm gap-2`}>
//                   <User className="size-5" />
//                   <span className="hidden sm:inline">Profile</span>
//                 </Link>

//                 <button className="flex gap-2 items-center" onClick={logout}>
//                   <LogOut className="size-5" />
//                   <span className="hidden sm:inline">Logout</span>
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
// export default Navbar;

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { Navbar, NavbarBrand, Nav, NavItem, Button, Container } from "reactstrap";

const AppNavbar = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);

  return (
    <Navbar color="light" light expand="md" className="border-bottom fixed-top shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        {/* App Logo and Title */}
        <NavbarBrand tag={Link} to="/" className="d-flex align-items-center gap-2 text-dark text-decoration-none">
          <div className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10 p-2">
            <MessageSquare size={20} className="text-primary" />
          </div>
          <h1 className="h5 fw-bold mb-0">Chatty</h1>
        </NavbarBrand>

        {/* Navigation Links */}
        <Nav className="d-flex align-items-center gap-2">
          {/* Settings Link */}
          <NavItem>
            <Button tag={Link} to="/settings" color="light" className="d-flex align-items-center gap-1">
              <Settings size={16} />
              <span className="d-none d-sm-inline">Settings</span>
            </Button>
          </NavItem>

          {/* Authenticated User Actions */}
          {authUser && (
            <>
              {/* Profile Link */}
              <NavItem>
                <Button tag={Link} to="/profile" color="light" className="d-flex align-items-center gap-1">
                  <User size={18} />
                  <span className="d-none d-sm-inline">Profile</span>
                </Button>
              </NavItem>

              {/* Logout Button */}
              <NavItem>
                <Button color="danger" onClick={() => dispatch(logout())} className="d-flex align-items-center gap-1">
                  <LogOut size={18} />
                  <span className="d-none d-sm-inline">Logout</span>
                </Button>
              </NavItem>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
