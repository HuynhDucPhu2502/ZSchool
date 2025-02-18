import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import router from "./route";
import queryClient from "./queryClient.ts";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
