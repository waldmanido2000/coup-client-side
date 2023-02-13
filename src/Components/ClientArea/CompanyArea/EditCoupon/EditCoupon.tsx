import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { CouponModel, CouponPayloadModel } from "../../../../Models/CouponModel";
import { updatedCouponAction } from "../../../../Redux/CouponAppState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import "./EditCoupon.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const options = [
    { value: "FOOD", label: "FOOD" },
    { value: "VACATION", label: "VACATION" },
    { value: "CARS", label: "CARS" },
    { value: "CLOTHES", label: "CLOTHES" },
    { value: "RESTAURANT", label: "RESTAURANT" },
    { value: "ELECTRICITY", label: "ELECTRICITY" }
];

function EditCoupon(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);
    const companyId = +(params.companyId || 0);

    const toUpdate = store.getState().couponsReducer.coupons.filter(c => c.id === id)[0];
    const [obj, setObj] = useState<CouponModel>(toUpdate);

    const navigate = useNavigate();

    // Define the schema for validating the form input using yup
    const schema = yup.object().shape({
        category: yup.string().required("Category is required"),
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        startDate: yup
            .date()
            .required('startDate is required'),
        endDate: yup
            .date()
            .required('endDate is required')
            .min(yup.ref('startDate'), 'endDate must be later than startDate'),
        amount: yup.number().required("Amount is required"),
        price: yup.number().required("Price is required"),
        image: yup.string().required("Image is required"),
    });


    const putCoupon = async (coupon: CouponPayloadModel) => {
        await webApi.editCompanyCoupon(companyId, id, coupon)
            .then(res => {
                store.dispatch(updatedCouponAction(res.data));
                notify.success('Woho coupon updated successfully');
                navigate('/');
            })
            .catch(err => {
                notify.error(err);
            })
        console.log(coupon);
    }

    let defaultValuesObj = { ...obj };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CouponModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({ control });

    return (
        <div className="EditCoupon">
            <h1>Edit Coupon</h1>
            <form onSubmit={handleSubmit(putCoupon)}>
                <label htmlFor="id">Id</label>
                <input disabled={true} id="id" name="id" type="number" placeholder="Id..." value={id} />
                <label htmlFor="category">Category</label>
                <select {...register("category")} id="category" name="category">
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <label htmlFor="title">Title</label>
                <input {...register("title")} id="title" name="title" type="text" placeholder="Title..." />
                {(errors.title) ? <span>{errors.title?.message}</span> : null}

                <label htmlFor="description">Description</label>
                <input {...register("description")} id="description" name="description" type="text" placeholder="Description..." />
                {(errors.description) ? <span>{errors.description?.message}</span> : null}

                <label htmlFor="startDate">Start Date</label>
                <input {...register("startDate")} id="startDate" name="startDate" type="date" placeholder="Start Date..." />
                {(errors.startDate) ? <span>{errors.startDate?.message}</span> : null}

                <label htmlFor="endDate">End Date</label>
                <input {...register("endDate")} id="endDate" name="endDate" type="date" placeholder="End Date..." />
                {(errors.endDate) ? <span>{errors.endDate?.message}</span> : null}

                <label htmlFor="amount">Amount</label>
                <input {...register("amount")} id="amount" name="amount" type="number" placeholder="Amount..." />
                {(errors.amount) ? <span>{errors.amount?.message}</span> : null}

                <label htmlFor="price">Price</label>
                <input {...register("price")} id="price" name="price" type="number" placeholder="Price..." />
                {(errors.price) ? <span>{errors.price?.message}</span> : null}

                <label htmlFor="image">Image URL</label>
                <input {...register("image")} id="image" name="image" type="text" placeholder="Image URL..." />

                {(errors.image) ? <span>{errors.image?.message}</span> : null}

                <button type="submit" disabled={!isValid || !isDirty}>Update Coupon</button>


            </form>
        </div>
    );
}

export default EditCoupon;
