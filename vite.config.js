import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    allowedHosts: ["2c2e0f65d670.ngrok-free.app"],
    //     proxy: {
    //   "/api": {
    //     target: "https://ulooks-api.vercel.app",
    //     changeOrigin: true,
    //   },
    // },
  },
});

//The proxy is used to by-pass CORS policy issue which occurs as a result of the domain (backend) and port (frontend ) don't match. To fix this the backend server must accept the port from the frontend to send request to it or use a proxy to make (allow your frontend’s origin (http://localhost:5173) on the backend by setting proper CORS header)
