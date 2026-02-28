import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider } from "react-router-dom";
import router from "./app/AppRouter.jsx";
import Providers from "./app/Providers.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
// =================================================================================

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </Provider>
  </StrictMode>,
);
