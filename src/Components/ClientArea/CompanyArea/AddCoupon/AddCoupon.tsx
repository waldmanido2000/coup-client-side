import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CouponPayloadModel } from "../../../../Models/CouponModel";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../../Redux/Store";
import { useEffect } from "react";

const options = [
    { value: "FOOD", label: "FOOD" },
    { value: "VACATION", label: "VACATION" },
    { value: "CARS", label: "CARS" },
    { value: "CLOTHES", label: "CLOTHES" },
    { value: "RESTAURANT", label: "RESTAURANT" },
    { value: "ELECTRICITY", label: "ELECTRICITY" }
];

const AddCoupon = (): JSX.Element => {
    const params = useParams();
    const companyId = +(params.companyId || 0);
    const navigate = useNavigate();
    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        if (!token) {
            navigate("/login");
        }
    }, []);
    // Define the schema for validating the form input using yup
    const schema = yup.object().shape({
        category: yup.string().required("Category is required"),
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        startDate: yup
            .date()
            .required('startDate is required')
            .min(new Date(), "startDate must be later than today's date"),
        endDate: yup
            .date()
            .required('endDate is required')
            .min(yup.ref('startDate'), 'endDate must be later than startDate'),
        amount: yup.number().required("Amount is required"),
        price: yup.number().required("Price is required"),
        image: yup.string().required("Image is required"),
    });

    // Use the useForm hook from react-hook-form to register and handle form state
    const { register, handleSubmit, formState:
        { errors, isDirty, isValid } } =
        useForm<CouponPayloadModel>(
            { mode: "all", resolver: yupResolver(schema) }
        );

    // Async function to add a coupon
    const postCoupon = async (coupon: CouponPayloadModel) => {
        // Call the addCoupon API and handle the response
        console.log(coupon);
        await webApi.addCompanyCoupon(coupon, companyId, store.getState().userReducer.user.token)
            .then(() => {
                // Show a success notification
                notify.success('Coupon added successfully');
                navigate("/");
            })
            .catch(err => {
                // Show an error notification
                notify.error(err);
            });
    };

    return (
        <div className="AddCoupon">
            <h1>Add Coupon</h1>
            <form className="myForm" onSubmit={handleSubmit(postCoupon)}>
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

                <button disabled={!isValid}>Add Coupon</button>

            </form>
        </div>
    );
}
export default AddCoupon;