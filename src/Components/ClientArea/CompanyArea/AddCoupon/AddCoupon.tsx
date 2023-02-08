import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CouponModel, CouponPayloadModel } from "../../../../Models/CouponModel";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";

const companyId: number = 1;
const AddCoupon = () => {
    // Define the schema for validating the form input using yup
    const schema = yup.object().shape({
        category: yup.string().required("Category is required"),
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        startDate: yup.string().required("Start date is required"),
        endDate: yup.string().required("End date is required"),
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
        await webApi.addCompanyCoupon(coupon)
            .then(() => {
                // Show a success notification
                notify.success('Coupon added successfully');
            })
            .catch(err => {
                // Show an error notification
                notify.error(err);
            });
    };

    return (
        <div className="AddCoupon">
            <h1>Add Coupon</h1>
            <form onSubmit={handleSubmit(postCoupon)}>
                <input type="hidden" id="companyId" name="companyId" value={companyId}/>
                <label htmlFor="category">Category</label>
                <input {...register("category")} id="category" name="category" type="text" placeholder="Category..." />

                <label htmlFor="title">Title</label>
                <input {...register("title")} id="title" name="title" type="text" placeholder="Title..." />

                <label htmlFor="description">Description</label>
                <input {...register("description")} id="description" name="description" type="text" placeholder="Description..." />

                <label htmlFor="startDate">Start Date</label>
                <input {...register("startDate")} id="startDate" name="startDate" type="date" placeholder="Start Date..." />

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