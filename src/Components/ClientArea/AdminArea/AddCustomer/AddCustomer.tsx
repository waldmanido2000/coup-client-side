import { useNavigate } from "react-router-dom";
import "./AddCustomer.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerPayloadModel } from "../../../../Models/CustomerModel";
import { useForm } from "react-hook-form";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import { addedCustomerAction } from "../../../../Redux/CustomerAppState";
import { useEffect } from "react";
import { loggedOut } from "../../../../Redux/UserAppState";

function AddCustomer(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        if (!token) {
            navigate("/login");
        }
    }, []);
    // Define the schema for validating the form input using yup
    const schema = yup.object().shape({
        firstName: yup.string().required("first name is required"),
        lastName: yup.string().required("last name is required"),
        email: yup.string().required("email is required"),
        password: yup.string().required("password is required"),
    });

    // Use the useForm hook from react-hook-form to register and handle form state
    const { register, handleSubmit, formState:
        { errors, isDirty, isValid } } =
        useForm<CustomerPayloadModel>(
            { mode: "all", resolver: yupResolver(schema) }
        );

    // Async function to add a customer and dispatch an action
    const postCustomer = async (customer: CustomerPayloadModel) => {
        // Call the addCustomer API and handle the response
        await webApi.addCustomer(customer, store.getState().userReducer.user.token)
            .then(res => {
                // Show a success notification and dispatch an action
                notify.success('Woho customer added successfully');
                store.dispatch(addedCustomerAction(res.data));
                navigate('/customers');
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    store.dispatch(loggedOut());
                    navigate("/login");
                } else {
                    // Show an error notification
                    notify.error(err);
                }
            });
        console.log(customer);
    }

    return (
        <div className="AddCustomer">
            <h1>Add Customer</h1>
            <form className="myForm" onSubmit={handleSubmit(postCustomer)}>
                {errors.firstName && <span>{errors.firstName.message}</span>}
                <label htmlFor="firstName">First Name</label>
                <input {...register("firstName")} id="firstName" name="firstName" type="text" placeholder="First Name..." />

                {errors.lastName && <span>{errors.lastName.message}</span>}
                <label htmlFor="lastName">Last Name</label>
                <input {...register("lastName")} id="lastName" name="lastName" type="text" placeholder="Last Name..." />

                {errors.email && <span>{errors.email.message}</span>}
                <label htmlFor="email">Email</label>
                <input {...register("email")} id="email" name="email" type="email" placeholder="Email..." />

                {errors.password && <span>{errors.password.message}</span>}
                <label htmlFor="password">Password</label>
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password..." />

                <button disabled={!isValid}>Add Customer</button>
            </form>
        </div>
    );
}

export default AddCustomer;
