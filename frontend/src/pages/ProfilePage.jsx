// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { Camera, Mail, User } from "lucide-react";

// const ProfilePage = () => {
//   const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
//   const [selectedImg, setSelectedImg] = useState(null);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onload = async () => {
//       const base64Image = reader.result;
//       setSelectedImg(base64Image);
//       await updateProfile({ profilePic: base64Image });
//     };
//   };

//   return (
//     <div className="h-screen pt-20">
//       <div className="max-w-2xl mx-auto p-4 py-8">
//         <div className="bg-base-300 rounded-xl p-6 space-y-8">
//           <div className="text-center">
//             <h1 className="text-2xl font-semibold ">Profile</h1>
//             <p className="mt-2">Your profile information</p>
//           </div>

//           {/* avatar upload section */}

//           <div className="flex flex-col items-center gap-4">
//             <div className="relative">
//               <img
//                 src={selectedImg || authUser.profilePic || "/avatar.png"}
//                 alt="Profile"
//                 className="size-32 rounded-full object-cover border-4 "
//               />
//               <label
//                 htmlFor="avatar-upload"
//                 className={`
//                   absolute bottom-0 right-0 
//                   bg-base-content hover:scale-105
//                   p-2 rounded-full cursor-pointer 
//                   transition-all duration-200
//                   ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
//                 `}
//               >
//                 <Camera className="w-5 h-5 text-base-200" />
//                 <input
//                   type="file"
//                   id="avatar-upload"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   disabled={isUpdatingProfile}
//                 />
//               </label>
//             </div>
//             <p className="text-sm text-zinc-400">
//               {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
//             </p>
//           </div>

//           <div className="space-y-6">
//             <div className="space-y-1.5">
//               <div className="text-sm text-zinc-400 flex items-center gap-2">
//                 <User className="w-4 h-4" />
//                 Full Name
//               </div>
//               <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
//             </div>

//             <div className="space-y-1.5">
//               <div className="text-sm text-zinc-400 flex items-center gap-2">
//                 <Mail className="w-4 h-4" />
//                 Email Address
//               </div>
//               <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
//             </div>
//           </div>

//           <div className="mt-6 bg-base-300 rounded-xl p-6">
//             <h2 className="text-lg font-medium  mb-4">Account Information</h2>
//             <div className="space-y-3 text-sm">
//               <div className="flex items-center justify-between py-2 border-b border-zinc-700">
//                 <span>Member Since</span>
//                 <span>{authUser.createdAt?.split("T")[0]}</span>
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <span>Account Status</span>
//                 <span className="text-green-500">Active</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProfilePage;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/slices/authSlice";
import { Camera, Mail, User } from "lucide-react";
import { Container, Card, CardBody, Row, Col, Input, Button } from "reactstrap";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);

  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      dispatch(updateProfile({ profilePic: base64Image }));
    };
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg p-4">
            <CardBody>
              {/* Header */}
              <div className="text-center mb-4">
                <h1 className="h4 fw-bold">Profile</h1>
                <p className="text-muted">Your profile information</p>
              </div>

              {/* Avatar Upload Section */}
              <div className="d-flex flex-column align-items-center gap-3 mb-4">
                <div className="position-relative">
                  <img
                    src={selectedImg || authUser?.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="rounded-circle border shadow"
                    style={{ width: "130px", height: "130px", objectFit: "cover" }}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`position-absolute bottom-0 end-0 p-2 bg-dark rounded-circle shadow 
                      ${isUpdatingProfile ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
                    style={{ transform: "translate(25%, 25%)" }}
                  >
                    <Camera size={18} className="text-white" />
                    <Input
                      type="file"
                      id="avatar-upload"
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>
                <p className="text-muted small">
                  {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                </p>
              </div>

              {/* User Info Section */}
              <Row className="gy-3">
                <Col xs={12}>
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <User size={18} />
                    <span>Full Name</span>
                  </div>
                  <p className="border p-2 rounded bg-light">{authUser?.fullName}</p>
                </Col>

                <Col xs={12}>
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <Mail size={18} />
                    <span>Email Address</span>
                  </div>
                  <p className="border p-2 rounded bg-light">{authUser?.email}</p>
                </Col>
              </Row>

              {/* Account Info Section */}
              <Card className="mt-4 border-0 bg-light">
                <CardBody>
                  <h5 className="fw-semibold mb-3">Account Information</h5>
                  <Row className="gy-2">
                    <Col xs={12} className="d-flex justify-content-between border-bottom pb-2">
                      <span>Member Since</span>
                      <span>{authUser?.createdAt?.split("T")[0]}</span>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-between">
                      <span>Account Status</span>
                      <span className="text-success fw-bold">Active</span>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
