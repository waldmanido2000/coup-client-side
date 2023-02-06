import { useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import "./CouponCard.css";

interface CouponProps {
  coupon: CouponModel;
}

function CouponCard(props: CouponProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState(props.coupon.image);

  const handleImageError = () => {
    setImageUrl("../../../src/Assets/not-found.jpg");
  };

  return (
    <div className="CouponCard">
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
          <img src={imageUrl} alt={props.coupon.image} onError={handleImageError} />
        </div>
      </div>
    </div>
  );
}

export default CouponCard;
