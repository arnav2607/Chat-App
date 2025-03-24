// import { useChatStore } from "../store/useChatStore";
// import { useEffect, useRef } from "react";

// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "./skeletons/MessageSkeleton";
// import { useAuthStore } from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils";

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();
//   const { authUser } = useAuthStore();
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     getMessages(selectedUser._id);

//     subscribeToMessages();

//     return () => unsubscribeFromMessages();
//   }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

//   useEffect(() => {
//     if (messageEndRef.current && messages) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//           >
//             <div className=" chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   src={
//                     message.senderId === authUser._id
//                       ? authUser.profilePic || "/avatar.png"
//                       : selectedUser.profilePic || "/avatar.png"
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div className="chat-bubble flex flex-col">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.text && <p>{message.text}</p>}
//             </div>
//           </div>
//         ))}
//       </div>

//       <MessageInput />
//     </div>
//   );
// };
// export default ChatContainer;

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, CardBody, CardHeader, InputGroup, Input } from "reactstrap";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

import {
  getMessages,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "../redux/slices/chatSlice";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { messages, isMessagesLoading, selectedUser } = useSelector((state) => state.chat);
  const { authUser } = useSelector((state) => state.auth);

  const messageEndRef = useRef(null);

  // Fetch messages and subscribe to real-time updates
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessages(selectedUser._id));
      dispatch(subscribeToMessages());
    }

    return () => {
      dispatch(unsubscribeFromMessages());
    };
  }, [dispatch, selectedUser?._id]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messageEndRef.current && messages.length) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Show skeleton loader while messages load
  if (isMessagesLoading) {
    return (
      <Container fluid className="d-flex flex-column h-100">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </Container>
    );
  }

  return (
    <Container fluid className="d-flex flex-column h-100">
      <ChatHeader />

      {/* Messages List */}
      <Card className="flex-grow-1 overflow-auto">
        <CardBody className="p-3">
          {messages.map((message) => (
            <Row
              key={message._id}
              className={`mb-3 ${message.senderId === authUser._id ? "justify-content-end" : "justify-content-start"}`}
              ref={messageEndRef}
            >
              <Col xs="auto">
                <div className="d-flex align-items-center">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="rounded-circle border"
                    style={{ width: "40px", height: "40px" }}
                  />
                </div>
              </Col>
              <Col xs="auto">
                <Card className="p-2">
                  <CardHeader className="small text-muted">
                    {formatMessageTime(message.createdAt)}
                  </CardHeader>
                  <CardBody className="p-2">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="img-fluid rounded mb-2"
                        style={{ maxWidth: "200px" }}
                      />
                    )}
                    {message.text && <p className="mb-0">{message.text}</p>}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ))}
        </CardBody>
      </Card>

      <MessageInput />
    </Container>
  );
};

export default ChatContainer;
