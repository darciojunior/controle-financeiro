import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Landing, ErrorPage, ProtectedLayout } from "./pages";
import { Stats, Finances, Profile, SharedLayout } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <SharedLayout />
            </ProtectedLayout>
          }
        >
          <Route index element={<Stats />} />
          <Route path="finances" element={<Finances />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
