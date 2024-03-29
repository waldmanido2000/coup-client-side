import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormState } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { CustomerModel, CustomerPayloadModel } from "../../../../Models/CustomerModel";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import "./EditCustomer.css";
import { updatedCustomerAction } from "../../../../Redux/CustomerAppState";
import { loggedOut } from "../../../../Redux/UserAppState";

function EditCustomer(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0)

    const toUpdate = store.getState().customersReducer.customers.filter(c => c.id === id)[0];
    const [obj, setObj] = useState<CustomerModel>(toUpdate);

    const navigate = useNavigate();
    const token = store.getState().userReducer.user.token;
    if (!token) {
        navigate("/login");
    }

    const schema = yup.object().shape({
        email:
            yup.string()
                .required("email is required"),
        password:
            yup.string()
                .required("password is missing"),
    });


    const putCustomer = async (customer: CustomerPayloadModel) => {
        await webApi.editCustomer(id, customer, store.getState().userReducer.user.token)
            .then(res => {
                store.dispatch(updatedCustomerAction(res.data));
                notify.success('Woho customer updated successfully');
                navigate('/');
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    store.dispatch(loggedOut());
                    navigate("/login");
                } else {
                    notify.error(err);
                }
            });
        console.log(customer);
    }
    

    let defaultValuesObj = { ...obj };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CustomerModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({ control });




    return (
        <div className="EditTodo">
            <h1>Edit Customer</h1>
            <form className="myForm" onSubmit={handleSubmit(putCustomer)}>
                <label htmlFor="firstName">First Name</label>
                <input disabled={true} id="firstName" name="firstName" type="string" placeholder="first name..." value={toUpdate.firstName} />

                <label htmlFor="lastName">Last Name</label>
                <input disabled={true} id="lastName" name="lastName" type="string" placeholder="Last name..." value={toUpdate.lastName} />

                <label htmlFor="id">ID</label>
                <input disabled={true} id="id" name="id" type="number" placeholder="Id..." value={id} />

                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="text" placeholder="Email..." />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password..." />

                <button type="submit" disabled={!isValid || !isDirty}>Update Customer</button>


            </form>
        </div>
    );
}

export default EditCustomer;
