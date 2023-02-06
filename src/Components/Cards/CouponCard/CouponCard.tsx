import { useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import notFoundImage from "../../..//Assets/not-found.jpg";
import "./CouponCard.css";

interface CouponProps {
	coupon: CouponModel;
}

function CouponCard(props: CouponProps): JSX.Element {
	const [imageUrl, setImageUrl] = useState(props.coupon.image);
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};
	const categoryClass = (category: string) => {
		switch ( category.toLowerCase()) {
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

	return (

		<div className={`CouponCard ${categoryClass(props.coupon.category)}`}>
			<h4>{props.coupon.title}</h4>
			<div className="row">
				<div>
					<p>description: {props.coupon.description}</p>
					<p>category: {props.coupon.category}</p>
					<p>available since: {props.coupon.startDate}</p>
					<p>ends in: {props.coupon.endDate}</p>
					<p>cost: {props.coupon.price}</p>
					<p>left to purchase: {props.coupon.amount}</p>
				</div>
				<div>
					{
						imageError ?
							<img src={notFoundImage} alt={props.coupon.image} />
							:
							<img src={imageUrl} alt={props.coupon.image} onError={handleImageError} />
					}
				</div>
			</div>
		</div>
	);
}

export default CouponCard;
