import { useState } from "react";
import { User } from "../../../../Models/Auth";
import store from "../../../../Redux/Store";
import AdminScreen from "../../../ClientArea/AdminArea/AdminScreen/AdminScreen";
import CompanyDetails from "../../../ClientArea/CompanyArea/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../../ClientArea/CustomerArea/CustomerDetails/CustomerDetails";
import "./Home.css";

function Home(): JSX.Element {
    const [companyId, setCompanyId] = useState<number>(store.getState().userReducer.user.id);
    const [customerId, setCustomerId] = useState<number>(store.getState().userReducer.user.id);

    // Extract user object from store
    const user: User = store.getState().userReducer.user;

    // Determine which component to render based on user type
    let componentToRender: JSX.Element;
    switch (user?.clientType) {
        case "ADMINISTRATOR":
            componentToRender = <AdminScreen />;
            break;
        case "COMPANY":
            componentToRender = <CompanyDetails companyId={companyId} />;
            break;
        case "CUSTOMER":
            componentToRender = <CustomerDetails customerId={customerId} />;
            break;
        default:
            componentToRender = <div>You must be logged in to see this page.</div>;
    }

    return (
        <div className="Home">
            {componentToRender}
        </div>
    );
}

export default Home;
