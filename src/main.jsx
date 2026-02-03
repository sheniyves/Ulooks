import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import SearchCtx from "./Context/SearchCtx.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SearchCtx>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </SearchCtx>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
