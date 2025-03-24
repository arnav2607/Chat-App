// import { X } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
// import { useChatStore } from "../store/useChatStore";

// const ChatHeader = () => {
//   const { selectedUser, setSelectedUser } = useChatStore();
//   const { onlineUsers } = useAuthStore();

//   return (
//     <div className="p-2.5 border-b border-base-300">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {/* Avatar */}
//           <div className="avatar">
//             <div className="size-10 rounded-full relative">
//               <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
//             </div>
//           </div>

//           {/* User info */}
//           <div>
//             <h3 className="font-medium">{selectedUser.fullName}</h3>
//             <p className="text-sm text-base-content/70">
//               {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
//             </p>
//           </div>
//         </div>

//         {/* Close button */}
//         <button onClick={() => setSelectedUser(null)}>
//           <X />
//         </button>
//       </div>
//     </div>
//   );
// };
// export default ChatHeader;

import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/slices/chatSlice";
import { Container, Row, Col, Button } from "reactstrap";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);

  if (!selectedUser) return null;

  return (
    <Container fluid className="border-bottom py-2">
      <Row className="align-items-center justify-content-between">
        <Col xs="auto" className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div className="position-relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="rounded-circle border"
              style={{ width: "40px", height: "40px" }}
            />
          </div>

          {/* User info */}
          <div>
            <h5 className="mb-0">{selectedUser.fullName}</h5>
            <p className="text-muted small mb-0">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </Col>

        {/* Close button */}
        <Col xs="auto">
          <Button color="light" onClick={() => dispatch(setSelectedUser(null))} className="p-2">
            <X size={20} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatHeader;
