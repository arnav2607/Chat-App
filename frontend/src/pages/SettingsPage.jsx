// import { THEMES } from "../constants";
// import { useThemeStore } from "../store/useThemeStore";
// import { Send } from "lucide-react";

// const PREVIEW_MESSAGES = [
//   { id: 1, content: "Hey! How's it going?", isSent: false },
//   { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
// ];

// const SettingsPage = () => {
//   const { theme, setTheme } = useThemeStore();

//   return (
//     <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
//       <div className="space-y-6">
//         <div className="flex flex-col gap-1">
//           <h2 className="text-lg font-semibold">Theme</h2>
//           <p className="text-sm text-base-content/70">Toggle theme</p>
//         </div>

//         <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
//           {THEMES.map((t) => (
//             <button
//               key={t}
//               className={`
//                 group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
//                 ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
//               `}
//               onClick={() => setTheme(t)}
//             >
//               <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
//                 <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
//                   <div className="rounded bg-primary"></div>
//                   <div className="rounded bg-secondary"></div>
//                   <div className="rounded bg-accent"></div>
//                   <div className="rounded bg-neutral"></div>
//                 </div>
//               </div>
//               <span className="text-[11px] font-medium truncate w-full text-center">
//                 {t.charAt(0).toUpperCase() + t.slice(1)}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SettingsPage;

import { THEMES } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../redux/slices/themeSlice";
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";

const SettingsPage = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg p-4">
            <CardBody>
              {/* Theme Selection Header */}
              <div className="mb-4">
                <h2 className="h5 fw-semibold">Theme</h2>
                <p className="text-muted small">Toggle theme</p>
              </div>

              {/* Theme Selection Grid */}
              <Row className="gx-2 gy-2">
                {THEMES.map((t) => (
                  <Col xs={3} sm={2} md={1} key={t}>
                    <Button
                      color="light"
                      className={`w-100 d-flex flex-column align-items-center p-2 rounded ${
                        theme === t ? "border-primary border" : "border"
                      }`}
                      onClick={() => dispatch(setTheme(t))}
                    >
                      <div
                        className="position-relative rounded overflow-hidden w-100"
                        style={{ height: "30px" }}
                        data-theme={t}
                      >
                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex gap-1 p-1">
                          <div className="rounded bg-primary flex-grow-1"></div>
                          <div className="rounded bg-secondary flex-grow-1"></div>
                          <div className="rounded bg-accent flex-grow-1"></div>
                          <div className="rounded bg-dark flex-grow-1"></div>
                        </div>
                      </div>
                      <span className="small fw-medium text-center mt-1">{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                    </Button>
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;
