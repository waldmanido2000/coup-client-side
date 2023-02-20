import { useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import notFoundImage from "../../../Assets/not-found.jpg";
import "./CouponCard.css";
import { FaCar, FaEdit, FaHamburger, FaLightbulb, FaPlane, FaShekelSign, FaShoppingBag, FaTrash, FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserPayload } from "../../../Models/Auth";
import store from "../../../Redux/Store";

interface CouponProps {
	coupon: CouponModel;
	companyId: number;
}

function CouponCard(props: CouponProps): JSX.Element {
	const [imageUrl, setImageUrl] = useState(props.coupon.image);
	const [user, setUser] = useState<UserPayload>(store.getState().userReducer.user);
	const [imageError, setImageError] = useState(false);
	const navigate = useNavigate();

	const handleImageError = () => {
		setImageError(true);
	};
	const categoryClass = (category: string) => {
		switch (category.toLowerCase()) {
			case "cars":
				return ("car ");
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
	const getCategoryIcon = (category: string) => {
		switch (category.toLowerCase()) {
			case "cars":
				return <FaCar />;
			case "restaurant":
				return <FaHamburger />;
			case "food":
				return <FaUtensils />;
			case "electricity":
				return <FaLightbulb />;
			case "vacation":
				return <FaPlane />;
			case "clothes":
				return <FaShoppingBag />;
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
				{
					user.id!=0 ?
					<div className="row">
					<button className="cardButton" onClick={() => deleteCoupon(props.coupon.id)}><FaTrash /></button>
					<button className="cardButton" onClick={() => editCoupon(props.coupon.id)}><FaEdit /></button>
				</div>
				:""
				}
				<div className="category">
					<label>{categoryClass(props.coupon.category)}</label>
					{getCategoryIcon(props.coupon.category)}
				</div>
			</div>
			<div className="row couponDetails">
				<div>
					<p>Description: {props.coupon.description}</p>
					<p>Since: {props.coupon.startDate}</p>
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
