import axios, { AxiosResponse } from 'axios';
import global from './ConstantService';
import store from '../Redux/Store';
import { CompanyModel, CompanyPayloadModel } from '../Models/CompanyModel';
import { CustomerModel, CustomerPayloadModel } from '../Models/CustomerModel';
import { CouponModel, CouponPayloadModel } from '../Models/CouponModel';
class WebApi {

    private adminCompaniesApi = global.urls.companies;
    private adminCustomersApi = global.urls.customers;
    private companyApi = global.urls.company;
    private customerApi = global.urls.customer;

    // TODO
    // public login(credentials: Credentials): Promise<AxiosResponse<User>> {
    //     return axios.post<User>(this.authApi + "/" + "login", credentials);
    // }


// ------------------------ admin companies actions ------------------------
    public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>> {
        return axios.get<CompanyModel[]>(this.adminCompaniesApi);

        // return tokenAxios.get<TaskModel[]>(this.userApi);
    }

    public getSingleCompanyById(id: number): Promise<AxiosResponse<CompanyModel>> {
        return axios.get<CompanyModel>(this.adminCompaniesApi + "/" + id);

        // return tokenAxios.get<TaskModel>(this.userApi + "/" + id);
    }

    public deleteCompany(id: number): Promise<AxiosResponse<any>> {
        return axios.delete<any>(this.adminCompaniesApi + "/" + id);

        // return tokenAxios.delete<any>(this.userApi + "/" + id);
    }

    public addCompany(company: CompanyPayloadModel): Promise<AxiosResponse<CompanyModel>> {
        return axios.post<CompanyModel>(this.adminCompaniesApi, company);

        // return tokenAxios.post<TaskModel>(this.userApi, task);
    }

    public editCompany(id: number, company: CompanyPayloadModel): Promise<AxiosResponse<CompanyModel>> {
        return axios.put<CompanyModel>(this.adminCompaniesApi + "/" + id, company);

        // return tokenAxios.put<TaskModel>(this.userApi + "/" + id, task);
    }

    // ------------------------ admin customers actions ------------------------
    public getAllCustomers(): Promise<AxiosResponse<CustomerModel[]>> {
        return axios.get<CustomerModel[]>(this.adminCustomersApi);
    }

    public getSingleCustomerById(id: number): Promise<AxiosResponse<CustomerModel>> {
        return axios.get<CustomerModel>(this.adminCustomersApi + "/" + id);
    }

    public deleteCustomer(id: number): Promise<AxiosResponse<any>> {
        return axios.delete<any>(this.adminCustomersApi + "/" + id);
    }

    public addCustomer(customer: CustomerPayloadModel): Promise<AxiosResponse<CustomerModel>> {
        return axios.post<CustomerModel>(this.adminCustomersApi, customer);

    }

    public editCustomer(id: number, customer: CustomerPayloadModel): Promise<AxiosResponse<CustomerModel>> {
        return axios.put<CustomerModel>(this.adminCustomersApi + "/" + id, customer);
    }
    // ------------------------ Customer actions ------------------------
    public getAllCustomerCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        return axios.get<CouponModel[]>(this.customerApi);
    }

    public getSingleCustomerCouponById(id: number): Promise<AxiosResponse<CouponModel>> {
        return axios.get<CouponModel>(this.customerApi + "/" + id);
    }

    public deleteCustomerCoupon(id: number): Promise<AxiosResponse<any>> {
        return axios.delete<any>(this.customerApi + "/" + id);
    }

    public addCustomerCoupon(customer: CustomerPayloadModel): Promise<AxiosResponse<CouponModel>> {
        return axios.post<CouponModel>(this.customerApi, customer);

    }

    public editCustomerCoupon(id: number, customer: CustomerPayloadModel): Promise<AxiosResponse<CouponModel>> {
        return axios.put<CouponModel>(this.customerApi + "/" + id, customer);
    }

        // ------------------------ Company actions ------------------------
        public getAllCompanyCoupons(id: number): Promise<AxiosResponse<CouponModel[]>> {
            return axios.get<CouponModel[]>(this.companyApi + "/" + id + "/coupons");
        }
    
        public getSingleCompanyCouponById(id: number): Promise<AxiosResponse<CouponModel>> {
            return axios.get<CouponModel>(this.companyApi + "/" + id);
        }
    
        public deleteCompanyCoupon(id: number): Promise<AxiosResponse<any>> {
            return axios.delete<any>(this.companyApi + "/" + id);
        }
    
        public addCompanyCoupon(coupon: CouponPayloadModel, companyId: number): Promise<AxiosResponse<CouponModel>> {
            return axios.post<CouponModel>(this.companyApi + "/" + companyId + "/coupons", coupon);
    
        }
    
        public editCompanyCoupon(id: number, coupon: CouponPayloadModel): Promise<AxiosResponse<CouponModel>> {
            return axios.put<CouponModel>(this.companyApi + "/" + id, coupon);
        }
}

const webApi = new WebApi();
export default webApi;