import App from "./presentation/App.tsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import { store } from "./data/redux/store.ts";
import { Provider } from "react-redux";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
