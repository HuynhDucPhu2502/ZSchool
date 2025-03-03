import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import router from "./route";
import queryClient from "./queryClient.ts";
import { Provider } from "react-redux";
import store from "./store/index.ts";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
