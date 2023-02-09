import { useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import notFoundImage from "../../../Assets/not-found.jpg";
import "./CouponCard.css";
import { FaShekelSign } from "react-icons/fa";

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
