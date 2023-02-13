import { useState, useEffect } from "react";
import { FaRegPlusSquare, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/CouponModel";
import { gotAllPurchasesAction } from "../../../../Redux/PurchaseAppState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import PurchaseCard from "../../../Cards/PurchaseCard/PurchaseCard";
import Page404 from "../../../PagesArea/MainArea/Page404/Page404";
import "./PurchaseList.css";

const options = [
    { value: "FOOD", label: "FOOD" },
    { value: "VACATION", label: "VACATION" },
    { value: "CARS", label: "CARS" },
    { value: "CLOTHES", label: "CLOTHES" },
    { value: "RESTAURANT", label: "RESTAURANT" },
    { value: "ELECTRICITY", label: "ELECTRICITY" }
];
interface PurchaseListProps {
    customerId: number;
}

function PurchaseList(props:PurchaseListProps): JSX.Element {
    const navigate = useNavigate();
    const customerId = props.customerId;
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [category, setCategory] = useState<string>();
    useEffect(() => {
        // const token = store.getState().userReducer.user.token;
        // if (!token) {
        //     navigate("/login");
        // }

        webApi.getAllCustomerCoupons(customerId)
            .then(res => {
                // Update local state
                setCoupons(res.data);

                // Update app state
                store.dispatch(gotAllPurchasesAction(res.data));

                // notify.success('Woho I got my element from server side!!!');
            })
            .catch(err => notify.error(err));

        return store.subscribe(() => {
            setCoupons(store.getState().purchasesReducer.purchases);
        });
    }, []);
    return (
        <>
            <div className="PurchaseListButtons row">
                <button className="cardButton" onClick={() => navigate('customer/' + customerId + '/customer-purchase/add/')}><FaRegPlusSquare />&nbsp;add a new Coupon</button>
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
            </div>
            <div className="PurchaseList row">
                {coupons?.length > 0
                    ? <>{coupons
                        .filter(c => maxPrice === 0 || c.price <= maxPrice)
                        .filter(c => !category || c.category === category)
                        .map((c, idx) => <PurchaseCard key={"c" + idx} purchase={c} customerId={customerId} />)
                    }</>
                    : <Page404 />}
            </div>

        </>
    );
}

export default PurchaseList;
