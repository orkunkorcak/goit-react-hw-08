import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Layout from "../layout/Layout";
import RestrictedRoute from "../RestrictedRoute";
import PrivateRoute from "../PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";

const HomePage = lazy(() => import("../../pages/home/HomePage"));
const RegistrationPage = lazy(() =>
  import("../../pages/registrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/login/LoginPage"));
const ContactsPage = lazy(() => import("../../pages/contacts/ContactsPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  return isRefreshing ? (
    <strong>Refreshing user...</strong>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
