import { useState } from "react";
import { FaTrash, FaEdit, FaCaretDown, FaCaretRight, FaCaretSquareUp, FaCaretSquareDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import CouponCard from "../CouponCard/CouponCard";
import "./CompanyCard.css";

interface CompanyProps {
    company: CompanyModel;
}

function CompanyCard(props: CompanyProps): JSX.Element {
    const [float, setFloat] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const deleteCompany = (id: number) => {
        navigate('/company/delete/' + id);
    }

    const editCompany = (id: number) => {
        navigate('/company/edit/' + id);
    }

    return (
        <div className={`CompanyCard${float ? " float current" : ""}`}>
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
                <div className="showHide">
                    <>{isOpen ? "hide coupons" : "show coupons"}</>
                    <>{isOpen ? <FaCaretSquareUp /> : <FaCaretSquareDown />}</>
                </div>
                {isOpen && (
                    <p className="companyCoupons">
                        {props.company.coupons.map((c, idx) => (
                            <CouponCard key={"c" + idx} coupon={c} companyId={0} />
                        ))}
                    </p>
                )}
            </p>

        </div>
    );
}

export default CompanyCard;
