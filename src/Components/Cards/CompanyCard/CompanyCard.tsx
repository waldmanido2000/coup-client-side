import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import CouponCard from "../CouponCard/CouponCard";
import "./CompanyCard.css";

interface CompanyProps {
    company: CompanyModel;
}

function CompanyCard(props: CompanyProps): JSX.Element {

    const navigate = useNavigate();

    const deleteCompany = (id: number) => {
        navigate('/company/delete/' + id);
    }

    const editCompany = (id: number) => {
        navigate('/company/edit/' + id);
    }

    return (
        <div className="CompanyCard row">
            <h3>{props.company.name}</h3>
            <p>{props.company.email}</p>
            <p>{props.company.coupons.map((c, idx) => <CouponCard key={"c" + idx} coupon={c} />)}</p>
            <div className="row">
                <button onClick={() => deleteCompany(props.company.id)}><FaTrash /></button>
                <button onClick={() => editCompany(props.company.id)}><FaEdit /></button>
            </div>
        </div>
    );
}

export default CompanyCard;
