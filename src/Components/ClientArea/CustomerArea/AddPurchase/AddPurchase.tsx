import { useState } from "react";
import { CouponModel } from "../../../../Models/CouponModel";
import "./AddPurchase.css";

function CouponPurchase(): JSX.Element {
    const [availableCoupons, setAvailableCoupons] = useState<CouponModel[]>();
    return (
        <div className="AddPurchase">
			
        </div>
    );
}

export default CouponPurchase;
