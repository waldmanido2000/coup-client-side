import { useState } from "react";
import { FaTrash, FaEdit, FaCaretDown, FaCaretRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import CouponCard from "../CouponCard/CouponCard";
import "./CompanyCard.css";

interface CompanyProps {
    company: CompanyModel;
}

function CompanyCard(props: CompanyProps): JSX.Element {
    const [float, setFloat] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const deleteCompany = (id: number) => {
        navigate('/company/delete/' + id);
    }

    const editCompany = (id: number) => {
        navigate('/company/edit/' + id);
    }

    return (
        <div className={`CompanyCard${float ? " float" : ""}`}>
            <h3>
                {props.company.name}
            </h3>
            <p>{props.company.email}</p>
            <div className="row">
                <button className="cardButton" onClick={() => deleteCompany(props.company.id)}><FaTrash /></button>
                <button className="cardButton" onClick={() => editCompany(props.company.id)}><FaEdit /></button>
            </div>
            <p onClick={() => {
                setIsOpen(!isOpen);
                setFloat(currentFloat => !currentFloat);
            }}>
                {isOpen ? <FaCaretDown /> : <FaCaretRight />}
                {isOpen ? "hide coupons" : "show coupons"}
                {isOpen && (
                    <p className="companyCoupons">
                        {props.company.coupons.map((c, idx) => (
                            <CouponCard key={"c" + idx} coupon={c} />
                        ))}
                    </p>
                )}
            </p>

        </div>
    );
}

export default CompanyCard;
