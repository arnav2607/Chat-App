// import { useChatStore } from "../store/useChatStore";

// import Sidebar from "../components/Sidebar";
// import NoChatSelected from "../components/NoChatSelected";
// import ChatContainer from "../components/ChatContainer";

// const HomePage = () => {
//   const { selectedUser } = useChatStore();

//   return (
//     <div className="h-screen bg-base-200">
//       <div className="flex items-center justify-center pt-20 px-4">
//         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
//           <div className="flex h-full rounded-lg overflow-hidden">
//             <Sidebar />

//             {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default HomePage;

import { useSelector } from "react-redux";
import { Container, Row, Col, Card } from "reactstrap";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useSelector((state) => state.chat);

  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={10} lg={9}>
          <Card className="shadow-lg rounded-lg overflow-hidden h-75">
            <Row className="h-100 g-0">
              <Col xs={3} md={3} lg={3} className="border-end">
                <Sidebar />
              </Col>
              <Col xs={9} md={9} lg={9} className="d-flex flex-column">
                {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
