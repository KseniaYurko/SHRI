import ReactDOM from "react-dom/client";
import { Header } from "./Header";
import { Main } from "./Main";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
	<>
		<Header />
		<Main />
	</>
);
