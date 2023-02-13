import { Routes, Route } from "react-router-dom";
import App from "../../../App";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import AddCompany from "../../ClientArea/AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../ClientArea/AdminArea/AddCustomer/AddCustomer";
import CompanyList from "../../ClientArea/AdminArea/CompanyList/CompanyList";
import CustomerList from "../../ClientArea/AdminArea/CustomerList/CustomerList";
import DeleteCompany from "../../ClientArea/AdminArea/DeleteCompany/DeleteCompany";
import DeleteCustomer from "../../ClientArea/AdminArea/DeleteCustomer/DeleteCustomer";
import EditCompany from "../../ClientArea/AdminArea/EditCompany/EditCompany";
import EditCustomer from "../../ClientArea/AdminArea/EditCustomer/EditCustomer";
import AddCoupon from "../../ClientArea/CompanyArea/AddCoupon/AddCoupon";
import DeleteCoupon from "../../ClientArea/CompanyArea/DeleteCoupon/DeleteCoupon";
import EditCoupon from "../../ClientArea/CompanyArea/EditCoupon/EditCoupon";
import AddPurchase from "../../ClientArea/CustomerArea/AddPurchase/AddPurchase";
import About from "../../PagesArea/MainArea/About/About";
import Home from "../../PagesArea/MainArea/Home/Home";
import Page404 from "../../PagesArea/MainArea/Page404/Page404";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* general Routes */}
                <Route path="/" element={<App />} />
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {/* admin Routes */}
                <Route path="/companies" element={<CompanyList />} />
                <Route path="/company/add" element={<AddCompany />} />
                <Route path="/company/edit/:id" element={<EditCompany />} />
                <Route path="/company/delete/:id" element={<DeleteCompany />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/customer/add" element={<AddCustomer />} />
                <Route path="/customer/edit/:id" element={<EditCustomer />} />
                <Route path="/customer/delete/:id" element={<DeleteCustomer />}
                 />
                {/* company routes */}
                <Route path="company/:companyId/company-coupon/add" element={<AddCoupon />} />
                <Route path="company/:companyId/company-coupon/edit/:id" element={<EditCoupon />} />
                <Route path="company/:companyId/company-coupon/delete/:id" element={<DeleteCoupon />} />

                {/* customer routes */}
                <Route path="customer/:customerId/customer-purchase/add" element={<AddPurchase />} />


                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
