import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import webApi from "../../../Services/WebApi";
import notify from "../../../Services/NotificationService";
import store from "../../../Redux/Store";
import { useNavigate } from "react-router-dom";
import { LoginModel } from "../../../Models/Auth";
import { loggedIn } from "../../../Redux/UserAppState";
import { ClientType } from "../../../Models/ClientType";

function Login(): JSX.Element {

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email:
            yup.string()
                .email("Invalid email pattern")
                .required("Email is required"),
        password:
            yup.string()
                .min(4, "password length minimum is 4 letters")
                .required("Password is required"),
        clientType:
            yup.mixed()
                .oneOf(Object.values(ClientType))
                .required("Client type is required"),
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

    const postLogin = async (obj: LoginModel) => {
        const credentials = { email: obj.email, password: obj.password, clientType: obj.clientType };
        await webApi.login(credentials).then(res => {
            notify.success('login successfully');
            const token = res.data.token;
            const id = res.data.id
            console.log(token);
            // Update global State
            store.dispatch(loggedIn({ clientType: obj.clientType, token, id }));
            navigate("/");
        }).catch(err => notify.error(err));
    }


    return (
        <div className="Login">
            <h2>Login</h2>
            <form className="myForm" onSubmit={handleSubmit(postLogin)}>
                {(!errors.email) ? <label htmlFor="email">Email</label> : <span>{errors.email.message}</span>}
                <input {...register("email")} type="email" placeholder="email" />
                {(!errors.password) ? <label htmlFor="password">Password</label> : <span>{errors.password.message}</span>}
                <input {...register("password")} type="password" placeholder="password" />
                <select {...register("clientType")} defaultValue={""}>
                    <option value="" disabled>Select client type</option>
                    {Object.values(ClientType).map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
                {errors.clientType && <span>{errors.clientType.message}</span>}
                <button disabled={!isValid}>Login</button>
            </form>
        </div>
    );
}

export default Login;
