// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import AuthImagePattern from "../components/AuthImagePattern";
// import { Link } from "react-router-dom";
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const { login, isLoggingIn } = useAuthStore();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     login(formData);
//   };

//   return (
//     <div className="h-screen grid lg:grid-cols-2">
//       {/* Left Side - Form */}
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2 group">
//               <div
//                 className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
//               transition-colors"
//               >
//                 <MessageSquare className="w-6 h-6 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
//               <p className="text-base-content/60">Sign in to your account</p>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="email"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Password</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-base-content/40" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-base-content/40" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
//               {isLoggingIn ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Sign in"
//               )}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Don&apos;t have an account?{" "}
//               <Link to="/signup" className="link link-primary">
//                 Create account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Image/Pattern */}
//       <AuthImagePattern
//         title={"Welcome back!"}
//         subtitle={"Sign in to continue your conversations and catch up with your messages."}
//       />
//     </div>
//   );
// };
// export default LoginPage;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText } from "reactstrap";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100">
        {/* Left Side - Form */}
        <Col lg={6} className="d-flex flex-column align-items-center justify-content-center p-4">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            {/* Logo */}
            <div className="text-center mb-4">
              <div className="d-flex flex-column align-items-center gap-2">
                <div className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10 p-3">
                  <MessageSquare size={28} className="text-primary" />
                </div>
                <h1 className="h4 fw-bold mt-2">Welcome Back</h1>
                <p className="text-muted">Sign in to your account</p>
              </div>
            </div>

            {/* Form */}
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email" className="fw-medium">Email</Label>
                <InputGroup>
                  <InputGroupText>
                    <Mail size={18} className="text-muted" />
                  </InputGroupText>
                  <Input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <Label for="password" className="fw-medium">Password</Label>
                <InputGroup>
                  <InputGroupText>
                    <Lock size={18} className="text-muted" />
                  </InputGroupText>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button color="light" onClick={() => setShowPassword(!showPassword)} className="border">
                    {showPassword ? <EyeOff size={18} className="text-muted" /> : <Eye size={18} className="text-muted" />}
                  </Button>
                </InputGroup>
              </FormGroup>

              <Button type="submit" color="primary" className="w-100" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    <Loader2 size={20} className="me-2 spinner-border-sm" />
                    Loading...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <p className="text-muted">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-primary">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </Col>

        {/* Right Side - Image/Pattern */}
        <Col lg={6} className="d-none d-lg-flex align-items-center justify-content-center bg-light">
          <AuthImagePattern
            title={"Welcome back!"}
            subtitle={"Sign in to continue your conversations and catch up with your messages."}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
