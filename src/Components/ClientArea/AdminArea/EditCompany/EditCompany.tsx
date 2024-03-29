import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormState } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { CompanyModel, CompanyPayloadModel } from "../../../../Models/CompanyModel";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import "./EditCompany.css";
import { updatedCompanyAction } from "../../../../Redux/CompanyAppState";
import { loggedOut } from "../../../../Redux/UserAppState";

function EditCompany(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0)

    const toUpdate = store.getState().companiesReducer.companies.filter(c => c.id === id)[0];
    const [obj, setObj] = useState<CompanyModel>(toUpdate);

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
const userFromStore = store.getState().userReducer.user;
const putCompany = async (company: CompanyPayloadModel) => {
    await webApi.editCompany(id, company, store.getState().userReducer.user.token)
    .then(res => {
    store.dispatch(updatedCompanyAction(res.data));
    navigate('/');
    })
    .catch(err => {
    if (err.response && err.response.status === 401) {
    store.dispatch(loggedOut());
    navigate("/login");
    } else {
    notify.error(err);
    }
    })
    console.log(company);
    }

    let defaultValuesObj = { ...obj };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CompanyModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({ control });




    return (
        <div className="EditTodo">
            <h1>Edit Company</h1>
            <form className="myForm" onSubmit={handleSubmit(putCompany)}>
                <label htmlFor="name">Name</label>
                <input disabled={true} id="name" name="name" type="string" placeholder="Name..." value={toUpdate.name} />
                <label htmlFor="id">Id</label>
                <input disabled={true} id="id" name="id" type="number" placeholder="Id..." value={id} />

                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="text" placeholder="Email..." />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password..." />

                <button type="submit" disabled={!isValid || !isDirty}>Update Company</button>


            </form>
        </div>
    );
}

export default EditCompany;
