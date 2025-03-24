// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
// import { Link } from "react-router-dom";

// import AuthImagePattern from "../components/AuthImagePattern";
// import toast from "react-hot-toast";

// const SignUpPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const { signup, isSigningUp } = useAuthStore();

//   const validateForm = () => {
//     if (!formData.fullName.trim()) return toast.error("Full name is required");
//     if (!formData.email.trim()) return toast.error("Email is required");
//     if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
//     if (!formData.password) return toast.error("Password is required");
//     if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const success = validateForm();

//     if (success === true) signup(formData);
//   };

//   return (
//     <div className="min-h-screen grid lg:grid-cols-2">
//       {/* left side */}
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* LOGO */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2 group">
//               <div
//                 className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
//               group-hover:bg-primary/20 transition-colors"
//               >
//                 <MessageSquare className="size-6 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Create Account</h1>
//               <p className="text-base-content/60">Get started with your free account</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Full Name</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="text"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="John Doe"
//                   value={formData.fullName}
//                   onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="size-5 text-base-content/40" />
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
//                   <Lock className="size-5 text-base-content/40" />
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
//                     <EyeOff className="size-5 text-base-content/40" />
//                   ) : (
//                     <Eye className="size-5 text-base-content/40" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
//               {isSigningUp ? (
//                 <>
//                   <Loader2 className="size-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Already have an account?{" "}
//               <Link to="/login" className="link link-primary">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* right side */}

//       <AuthImagePattern
//         title="Join our community"
//         subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
//       />
//     </div>
//   );
// };
// export default SignUpPage;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/slices/authSlice";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText } from "reactstrap";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) dispatch(signup(formData));
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
                <h1 className="h4 fw-bold mt-2">Create Account</h1>
                <p className="text-muted">Get started with your free account</p>
              </div>
            </div>

            {/* Form */}
            <Form onSubmit={handleSubmit}>
              {/* Full Name Input */}
              <FormGroup>
                <Label for="fullName" className="fw-medium">Full Name</Label>
                <InputGroup>
                  <InputGroupText>
                    <User size={18} className="text-muted" />
                  </InputGroupText>
                  <Input
                    type="text"
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </InputGroup>
              </FormGroup>

              {/* Email Input */}
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

              {/* Password Input */}
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

              {/* Submit Button */}
              <Button type="submit" color="primary" className="w-100" disabled={isSigningUp}>
                {isSigningUp ? (
                  <>
                    <Loader2 size={20} className="me-2 spinner-border-sm" />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </Form>

            {/* Already Have an Account? */}
            <div className="text-center mt-3">
              <p className="text-muted">
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Col>

        {/* Right Side - Image/Pattern */}
        <Col lg={6} className="d-none d-lg-flex align-items-center justify-content-center bg-light">
          <AuthImagePattern
            title="Join our community"
            subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
