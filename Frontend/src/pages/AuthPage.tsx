import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom.js";
import Login from "./Login.tsx";
import SignupCard from "./SignupCard.tsx";

import Register from "./Register.jsx";

const AuthPage = () => {
	const authScreenState = useRecoilValue(authScreenAtom);

	return <>{authScreenState === "login" ? <Login /> : <Register />}</>;
};

export default AuthPage;