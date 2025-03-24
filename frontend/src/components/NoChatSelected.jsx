import { MessageSquare } from "lucide-react";
import { Container } from "reactstrap";

const NoChatSelected = () => {
  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center p-5 bg-light flex-grow-1">
      <div className="text-center">
        {/* Icon Display */}
        <div className="d-flex justify-content-center gap-4 mb-4">
          <div className="position-relative">
            <div
              className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded p-3"
              style={{ width: "64px", height: "64px", animation: "bounce 1.5s infinite" }}
            >
              <MessageSquare size={32} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="fw-bold">Welcome to Chatty!</h2>
        <p className="text-muted">Select a conversation from the sidebar to start chatting</p>
      </div>
    </Container>
  );
};

export default NoChatSelected;
