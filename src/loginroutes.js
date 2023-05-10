import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/login";
// import ResetPasswordForm from './ResetPasswordForm';

// ----------------------------------------------------------------------

export default function LoginRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {/* <Route path="/help" element={<Help />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
