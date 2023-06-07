import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./store";

import { Header } from "@components/header";
import { Container } from "@components/container";
import MainPage from "@pages/MainPage";
import SingleArticle from "@pages/SingleArticle";
import NotFoundPage from "@pages/NotFoundPage";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import { fetchAuthMe } from "@features/auth/auth-thunks";
import EditProfilePage from "@pages/EditProfilePage";
import NewArticlePage from "@pages/NewArticlePage";
import "react-toastify/dist/ReactToastify.css";
import EditArticlePage from "@pages/EditArticlePage";
import RequireAuth from "@pages/RequireAuth";
import RequireUser from "@pages/RequireUser";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <ToastContainer position="bottom-right" />

      <Container>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/articles" element={<Navigate to="/" replace />} />
          <Route path="/articles/:slug" element={<SingleArticle />} />
          <Route
            path="/articles/:slug/edit"
            element={
              <RequireAuth>
                <RequireUser>
                  <EditArticlePage />
                </RequireUser>
              </RequireAuth>
            }
          />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <EditProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/new-article"
            element={
              <RequireAuth>
                <NewArticlePage />
              </RequireAuth>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
