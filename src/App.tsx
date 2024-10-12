import { useEffect, useState } from "react";
import { Header } from "./layout/header/Header";
import { Sidebar } from "./layout/sidebar/Sidebar";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch, useAppSelector } from "./store/store";
import { ErrorSnackbar } from "./components/error-snackbar/ErrorSnackbar";
import { Outlet } from "react-router-dom";
import { meTC } from "./store/reducers/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const status = useAppSelector((state) => state.app.status);
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const dispatch = useAppDispatch();
  //тоггл сайдбара
  const toggleSidebar = (newOpen: boolean) => () => {
    setSidebarOpen(newOpen);
  };

  useEffect(() => {
    dispatch(meTC());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "40%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div
        style={{
          position: "absolute",
          width: "100%",
        }}
      >
        {status === "loading" && <LinearProgress />}
      </div>
      {/* <TodolistsList /> */}
      <Outlet />
      <ErrorSnackbar />
    </div>
  );
}

export default App;
