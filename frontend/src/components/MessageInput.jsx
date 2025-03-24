// import { useRef, useState } from "react";
// import { useChatStore } from "../store/useChatStore";
// import { Image, Send, X } from "lucide-react";
// import toast from "react-hot-toast";

// const MessageInput = () => {
//   const [text, setText] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);
//   const fileInputRef = useRef(null);
//   const { sendMessage } = useChatStore();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please select an image file");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const removeImage = () => {
//     setImagePreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!text.trim() && !imagePreview) return;

//     try {
//       await sendMessage({
//         text: text.trim(),
//         image: imagePreview,
//       });

//       // Clear form
//       setText("");
//       setImagePreview(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   return (
//     <div className="p-4 w-full">
//       {imagePreview && (
//         <div className="mb-3 flex items-center gap-2">
//           <div className="relative">
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
//             />
//             <button
//               onClick={removeImage}
//               className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
//               flex items-center justify-center"
//               type="button"
//             >
//               <X className="size-3" />
//             </button>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//         <div className="flex-1 flex gap-2">
//           <input
//             type="text"
//             className="w-full input input-bordered rounded-lg input-sm sm:input-md"
//             placeholder="Type a message..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             ref={fileInputRef}
//             onChange={handleImageChange}
//           />

//           <button
//             type="button"
//             className={`hidden sm:flex btn btn-circle
//                      ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
//             onClick={() => fileInputRef.current?.click()}
//           >
//             <Image size={20} />
//           </button>
//         </div>
//         <button
//           type="submit"
//           className="btn btn-sm btn-circle"
//           disabled={!text.trim() && !imagePreview}
//         >
//           <Send size={22} />
//         </button>
//       </form>
//     </div>
//   );
// };
// export default MessageInput;

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../redux/slices/chatSlice";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { Input, Button, Form, FormGroup, Container } from "reactstrap";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove Image Preview
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Send Message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      dispatch(
        sendMessage({
          text: text.trim(),
          image: imagePreview,
        })
      );

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Container fluid className="p-3 border-top">
      {/* Image Preview Section */}
      {imagePreview && (
        <div className="mb-3 d-flex align-items-center gap-2">
          <div className="position-relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded border"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <Button
              color="light"
              onClick={removeImage}
              className="position-absolute top-0 end-0 p-1 rounded-circle"
              style={{ width: "20px", height: "20px" }}
            >
              <X size={14} />
            </Button>
          </div>
        </div>
      )}

      {/* Message Form */}
      <Form onSubmit={handleSendMessage} className="d-flex align-items-center gap-2">
        <FormGroup className="flex-grow-1 d-flex gap-2 m-0">
          {/* Text Input */}
          <Input
            type="text"
            className="form-control rounded"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="d-none"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          {/* Image Upload Button */}
          <Button
            type="button"
            color="light"
            onClick={() => fileInputRef.current?.click()}
            className={`d-none d-sm-flex ${imagePreview ? "text-success" : "text-muted"}`}
          >
            <Image size={20} />
          </Button>
        </FormGroup>

        {/* Send Button */}
        <Button type="submit" color="primary" disabled={!text.trim() && !imagePreview}>
          <Send size={20} />
        </Button>
      </Form>
    </Container>
  );
};

export default MessageInput;
