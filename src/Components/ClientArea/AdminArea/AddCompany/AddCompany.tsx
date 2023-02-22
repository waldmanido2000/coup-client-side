import { useNavigate } from "react-router-dom";
import "./AddCompany.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyPayloadModel } from "../../../../Models/CompanyModel";
import { useForm } from "react-hook-form";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import { addedCompanyAction } from "../../../../Redux/CompanyAppState";
import { useEffect, useState } from "react";
import { User } from "../../../../Models/Auth";
import { loggedOut } from "../../../../Redux/UserAppState";

function AddCompany(): JSX.Element {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>(store.getState().userReducer.user);
    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        if (!token) {
            navigate("/login");
        }
    }, []);
    // Define the schema for validating the form input using yup
    const schema = yup.object().shape({
        name:
            yup.string()
                .required("name is required"),
        email:
            yup.string().required("email is missing"),
        password:
            yup.string()
                .required("password is required"),
    });

    // Use the useForm hook from react-hook-form to register and handle form state
    const { register, handleSubmit, formState:
        { errors, isDirty, isValid } } =
        useForm<CompanyPayloadModel>(
            { mode: "all", resolver: yupResolver(schema) }
        );

    // Async function to add a company and dispatch an action
    const postCompany = async (company: CompanyPayloadModel) => {
        await webApi
            .addCompany(company, user.token)
            .then(res => {
                notify.success("Woho company added successfully");
                store.dispatch(addedCompanyAction(res.data));
                navigate("/companies");
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    store.dispatch(loggedOut());
                    navigate("/login");
                } else {
                    notify.error(err);
                }
            });
        console.log(company);
    };

    return (
        <div className="AddCompany">
            <h1>Add Company</h1>
            {/* Render the form with handleSubmit passing postCompany as the submit function */}
            <form className="myForm" onSubmit={handleSubmit(postCompany)}>
                {/* Display error message if there's an error with the name input */}
                {(errors.name) ? <span>{errors.name?.message}</span> : <label htmlFor="name">Name</label>}
                <input {...register("name")} id="name" name="name" type="text" placeholder="Name..." />
                {/* Display error message if there's an error with the email input */}
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="text" placeholder="Email..." />
                {/* Display error message if there's an error with the password input */}
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password..." />
                {/* Add Company button, disabled if the form is invalid */}
                <button disabled={!isValid}>Add Company</button>

            </form>
        </div>
    );
}

export default AddCompany;
