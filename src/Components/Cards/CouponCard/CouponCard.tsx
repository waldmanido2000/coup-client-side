import { useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import notFoundImage from "../../../Assets/not-found.jpg";
import "./CouponCard.css";
import { FaEdit, FaShekelSign, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface CouponProps {
	coupon: CouponModel;
	companyId: number;
}

function CouponCard(props: CouponProps): JSX.Element {
	const [imageUrl, setImageUrl] = useState(props.coupon.image);
	const [imageError, setImageError] = useState(false);
	const navigate = useNavigate();

	const handleImageError = () => {
		setImageError(true);
	};
	const categoryClass = (category: string) => {
		switch (category.toLowerCase()) {
			case "cars":
				return "car";
			case "restaurant":
				return "restaurant";
			case "food":
				return "food";
			case "electricity":
				return "electricity";
			case "vacation":
				return "vacation";
			case "clothes":
				return "clothes";
			default:
				return "";
		}
	};
	const deleteCoupon = (id: number) => {
		navigate('../company/' + props.companyId + '/company-coupon/delete/' + id);
	}

	const editCoupon = (id: number) => {
		navigate('../company/' + props.companyId + '/company-coupon/edit/' + id);
	}
	return (

		<div className={`CouponCard ${categoryClass(props.coupon.category)}`}>
			<div className="row couponCardButtons">
				<h4>{props.coupon.title}</h4>
				<div className="row">
					<button className="cardButton" onClick={() => deleteCoupon(props.coupon.id)}><FaTrash /></button>
					<button className="cardButton" onClick={() => editCoupon(props.coupon.id)}><FaEdit /></button>
				</div>
			</div>
			<div className="row">
				<div>
					<p>Description: {props.coupon.description}</p>
					<p>Category: {props.coupon.category}</p>
					<p>Available since: {props.coupon.startDate}</p>
					<p>Ends in: {props.coupon.endDate}</p>
					<p><span>Cost: {props.coupon.price}<FaShekelSign /></span></p>
					<p>Left to purchase: {props.coupon.amount}</p>
				</div>
				<div>
					{
						imageError ?
							<img src={notFoundImage} alt={props.coupon.title} />
							:
							<img src={imageUrl} alt={props.coupon.title} onError={handleImageError} />
					}
				</div>
			</div>
		</div>
	);
}

export default CouponCard;
