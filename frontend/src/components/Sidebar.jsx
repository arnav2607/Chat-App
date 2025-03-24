// import { useEffect, useState } from "react";
// import { useChatStore } from "../store/useChatStore";
// import { useAuthStore } from "../store/useAuthStore";
// import SidebarSkeleton from "./skeletons/SidebarSkeleton";
// import { Users } from "lucide-react";

// const Sidebar = () => {
//   const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

//   const { onlineUsers } = useAuthStore();
//   const [showOnlineOnly, setShowOnlineOnly] = useState(false);

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   const filteredUsers = showOnlineOnly
//     ? users.filter((user) => onlineUsers.includes(user._id))
//     : users;

//   if (isUsersLoading) return <SidebarSkeleton />;

//   return (
//     <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
//       <div className="border-b border-base-300 w-full p-5">
//         <div className="flex items-center gap-2">
//           <Users className="size-6" />
//           <span className="font-medium hidden lg:block">Contacts</span>
//         </div>
//         {/* TODO: Online filter toggle */}
//         <div className="mt-3 hidden lg:flex items-center gap-2">
//           <label className="cursor-pointer flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={showOnlineOnly}
//               onChange={(e) => setShowOnlineOnly(e.target.checked)}
//               className="checkbox checkbox-sm"
//             />
//             <span className="text-sm">Show online only</span>
//           </label>
//           <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
//         </div>
//       </div>

//       <div className="overflow-y-auto w-full py-3">
//         {filteredUsers.map((user) => (
//           <button
//             key={user._id}
//             onClick={() => setSelectedUser(user)}
//             className={`
//               w-full p-3 flex items-center gap-3
//               hover:bg-base-300 transition-colors
//               ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
//             `}
//           >
//             <div className="relative mx-auto lg:mx-0">
//               <img
//                 src={user.profilePic || "/avatar.png"}
//                 alt={user.name}
//                 className="size-12 object-cover rounded-full"
//               />
//               {onlineUsers.includes(user._id) && (
//                 <span
//                   className="absolute bottom-0 right-0 size-3 bg-green-500 
//                   rounded-full ring-2 ring-zinc-900"
//                 />
//               )}
//             </div>

//             {/* User info - only visible on larger screens */}
//             <div className="hidden lg:block text-left min-w-0">
//               <div className="font-medium truncate">{user.fullName}</div>
//               <div className="text-sm text-zinc-400">
//                 {onlineUsers.includes(user._id) ? "Online" : "Offline"}
//               </div>
//             </div>
//           </button>
//         ))}

//         {filteredUsers.length === 0 && (
//           <div className="text-center text-zinc-500 py-4">No online users</div>
//         )}
//       </div>
//     </aside>
//   );
// };
// export default Sidebar;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setSelectedUser } from "../redux/slices/chatSlice";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { Button, Input, ListGroup, ListGroupItem, Container, Row, Col } from "reactstrap";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { users, selectedUser, isUsersLoading } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <Container
      fluid
      className="h-100 border-end d-flex flex-column p-0"
      style={{ width: "250px", maxWidth: "100%" }}
    >
      {/* Sidebar Header */}
      <div className="border-bottom p-3">
        <Row className="align-items-center">
          <Col xs="auto">
            <Users size={22} />
          </Col>
          <Col className="d-none d-lg-block">
            <h6 className="mb-0 fw-semibold">Contacts</h6>
          </Col>
        </Row>

        {/* Online filter toggle */}
        <div className="mt-3 d-none d-lg-flex align-items-center gap-2">
          <label className="d-flex align-items-center gap-2 cursor-pointer">
            <Input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
            />
            <span className="small">Show online only</span>
          </label>
          <span className="text-muted small">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-auto flex-grow-1 py-3">
        <ListGroup flush>
          {filteredUsers.map((user) => (
            <ListGroupItem
              key={user._id}
              action
              onClick={() => dispatch(setSelectedUser(user))}
              className={`d-flex align-items-center gap-3 ${
                selectedUser?._id === user._id ? "bg-light border rounded" : ""
              }`}
            >
              {/* User Avatar */}
              <div className="position-relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="rounded-circle"
                  style={{ width: "48px", height: "48px", objectFit: "cover" }}
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="position-absolute bottom-0 end-0 bg-success rounded-circle"
                    style={{
                      width: "10px",
                      height: "10px",
                      border: "2px solid white",
                    }}
                  />
                )}
              </div>

              {/* User Info - Visible on larger screens */}
              <div className="d-none d-lg-block text-truncate">
                <div className="fw-medium">{user.fullName}</div>
                <div className="small text-muted">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </ListGroupItem>
          ))}

          {/* No Users Message */}
          {filteredUsers.length === 0 && (
            <div className="text-center text-muted py-4">No online users</div>
          )}
        </ListGroup>
      </div>
    </Container>
  );
};

export default Sidebar;
