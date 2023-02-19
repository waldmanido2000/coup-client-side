import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel, CouponPayloadModel } from "../../../../Models/CouponModel";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import PurchaseCard from "../../../Cards/PurchaseCard/PurchaseCard";
import Page404 from "../../../PagesArea/MainArea/Page404/Page404";
import "./AddPurchase.css";

const options = [
    { value: "FOOD", label: "FOOD" },
    { value: "VACATION", label: "VACATION" },
    { value: "CARS", label: "CARS" },
    { value: "CLOTHES", label: "CLOTHES" },
    { value: "RESTAURANT", label: "RESTAURANT" },
    { value: "ELECTRICITY", label: "ELECTRICITY" }
];

function CouponPurchase(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const customerId = +(params.customerId || 0);
    const [availableCoupons, setAvailableCoupons] = useState<CouponModel[]>([]);
    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        if (!token) {
            navigate("/login");
        }

        webApi.getAllAvailableCoupons(store.getState().userReducer.user.token)
            .then(res => {
                // Update local state
                setAvailableCoupons(res.data);

                // notify.success('Woho I got my element from server side!!!');
            })
            .catch(err => notify.error(err));
    }, []);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [category, setCategory] = useState<string>();
    const [ownedCoupons, setOwnedCoupons] = useState<CouponModel[]>(store.getState().purchasesReducer.purchases);
    const delta = availableCoupons.filter(coupon => {
        return !ownedCoupons.some(ownedCoupon => ownedCoupon.id === coupon.id);
    });
    function purchase(coupon: CouponModel): void {
      
        webApi.purchaseCoupon(customerId, coupon, store.getState().userReducer.user.token)
          .then(res => {
            notify.success("Coupon purchased successfully");
          })
          .catch(err => {
            notify.error(err);
          });
      }
      

    return (
        <>
        <div className="PurchaseListButtons row">
            <div className="row">
                <label htmlFor="maxPrice">Filter by max price <FaFilter /></label>
                <input type="number" id="maxPrice" name="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
            </div>
            <div className="row">
                <label htmlFor="category">Filter by category <FaFilter /></label>
                <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All</option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div><div className="AddPurchase">
                <h2>available coupons for customer {customerId}</h2>
                <div className="row">
                    {delta?.length > 0
                        ? <>{delta
                            .filter(c => maxPrice === 0 || c.price <= maxPrice)
                            .filter(c => !category || c.category === category)
                            .map((c, idx) => <div className="PurchaseItem">
                            <PurchaseCard key={"c" + idx} purchase={c} customerId={customerId} />
                            <button className="add" onClick={() => purchase(c)}>purchase this coupon</button>
                            </div>)}</>
                        : <Page404 />}
                </div>
            </div>
            </>

    );
}

export default CouponPurchase;
