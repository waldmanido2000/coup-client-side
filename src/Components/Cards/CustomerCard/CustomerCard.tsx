import { useState } from "react";
import { FaTrash, FaEdit, FaCaretSquareUp, FaCaretSquareDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";
import PurchaseCard from "../PurchaseCard/PurchaseCard";
import "./CustomerCard.css";

interface CustomerProps {
    customer: CustomerModel;
}

function CustomerCard(props: CustomerProps): JSX.Element {
    const [float, setFloat] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const deleteCustomer = (id: number) => {
        navigate('/customer/delete/' + id);
    }

    const editCustomer = (id: number) => {
        navigate('/customer/edit/' + id);
    }

    return (
        <div className={`CustomerCard${float ? " float current" : ""}`}>
            <h3>
                {props.customer.firstName} {props.customer.lastName}
            </h3>
            <p>{props.customer.email}</p>
            <div className="row">
                <button className="cardButton" onClick={() => deleteCustomer(props.customer.id)}><FaTrash /></button>
                <button className="cardButton" onClick={() => editCustomer(props.customer.id)}><FaEdit /></button>
            </div>
            <p onClick={() => {
                setIsOpen(!isOpen);
                setFloat(currentFloat => !currentFloat);
            }}>
                <div className="showHide">
                    <>{isOpen ? "hide coupons" : "show coupons"}</>
                    <>{isOpen ? <FaCaretSquareUp /> : <FaCaretSquareDown />}</>
                </div>
                {isOpen && (
                    <p className="companyCoupons">
                        {props.customer.coupons.map((p, idx) => (
                            <PurchaseCard key={"p" + idx} purchase={p} />
                        ))}
                    </p>
                )}
            </p>

        </div>
    );
}

export default CustomerCard;
