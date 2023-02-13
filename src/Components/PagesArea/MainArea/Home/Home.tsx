import { useState } from "react";
import AdminScreen from "../../../ClientArea/AdminArea/AdminScreen/AdminScreen";
import CompanyDetails from "../../../ClientArea/CompanyArea/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../../ClientArea/CustomerArea/CustomerDetails/CustomerDetails";
import "./Home.css";

function Home(): JSX.Element {
    // tbd
    const [admin, setAdmin] = useState<boolean>(true);
    const [companyId, setCompanyId] = useState<number>(1);
    const [customerId, setCustomerId] = useState<number>(1);
    return (
        <div className="Home">
            {/* tbd */}
            <AdminScreen/>
			<CompanyDetails companyId={5}/>
			<CustomerDetails customerId={3}/>
        </div>
    );
}

export default Home;
