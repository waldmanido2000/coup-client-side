import axios, { AxiosResponse } from "axios";
import global from "./ConstantService";
import { CompanyModel, CompanyPayloadModel } from "../Models/CompanyModel";
import { CustomerModel, CustomerPayloadModel } from "../Models/CustomerModel";
import { CouponModel, CouponPayloadModel } from "../Models/CouponModel";
import { Credentials, User, UserPayload } from "../Models/Auth";
class WebApi {
  [x: string]: any;

  private adminCompaniesApi = global.urls.companies;
  private adminCustomersApi = global.urls.customers;
  private companyApi = global.urls.company;
  private customerApi = global.urls.customer;
  private loginApi = global.urls.login;

  public login(credentials: Credentials): Promise<AxiosResponse<UserPayload>> {
    return axios.post<UserPayload>(this.loginApi, credentials);
  }  

  // ------------------------ admin companies actions ------------------------
  public getAllCompanies(token: string): Promise<AxiosResponse<CompanyModel[]>> {
    const headers = { Authorization: token };
    return axios.get<CompanyModel[]>(this.adminCompaniesApi, { headers });
}

public getSingleCompanyById(id: number, token: string): Promise<AxiosResponse<CompanyModel>> {
    const headers = { Authorization: token };
    return axios.get<CompanyModel>(this.adminCompaniesApi + "/" + id, { headers });
}

public deleteCompany(id: number, token: string): Promise<AxiosResponse<any>> {
    const headers = { Authorization: token };
    return axios.delete<any>(this.adminCompaniesApi + "/" + id, { headers });
}

public addCompany(company: CompanyPayloadModel, token: string): Promise<AxiosResponse<CompanyModel>> {
    const headers = { Authorization: token };
    return axios.post<CompanyModel>(this.adminCompaniesApi, company, { headers });
}

public editCompany(id: number, company: CompanyPayloadModel, token: string): Promise<AxiosResponse<CompanyModel>> {
    const headers = { Authorization: token };
    return axios.put<CompanyModel>(this.adminCompaniesApi + "/" + id, company, { headers });
}

public getAllCustomers(token: string): Promise<AxiosResponse<CustomerModel[]>> {
    const headers = { Authorization: token };
    return axios.get<CustomerModel[]>(this.adminCustomersApi, { headers });
}

public getSingleCustomerById(id: number, token: string): Promise<AxiosResponse<CustomerModel>> {
    const headers = { Authorization: token };
    return axios.get<CustomerModel>(this.adminCustomersApi + "/" + id, { headers });
}

public deleteCustomer(id: number, token: string): Promise<AxiosResponse<any>> {
    const headers = { Authorization: token };
    return axios.delete<any>(this.adminCustomersApi + "/" + id, { headers });
}

public addCustomer(customer: CustomerPayloadModel, token: string): Promise<AxiosResponse<CustomerModel>> {
    const headers = { Authorization: token };
    return axios.post<CustomerModel>(this.adminCustomersApi, customer, { headers });
}

public editCustomer(id: number, customer: CustomerPayloadModel, token: string): Promise<AxiosResponse<CustomerModel>> {
    const headers = { Authorization: token };
    return axios.put<CustomerModel>(this.adminCustomersApi + "/" + id, customer, { headers });
}

// ------------------------ Customer actions ------------------------
public getCustomerDetails(
  id: number, token: string
): Promise<AxiosResponse<CustomerModel>> {
  const headers = { Authorization: token };
  return axios.get<CustomerModel>(
    `${this.customerApi}/${id}/details`, { headers }
  );
}

public getAllCustomerCoupons(
  id: number, token: string
): Promise<AxiosResponse<CouponModel[]>> {
  const headers = { Authorization: token };
  return axios.get<CouponModel[]>(
    `${this.customerApi}/${id}/coupons`, { headers }
  );
}

public getSingleCustomerCouponById(
  id: number, token: string
): Promise<AxiosResponse<CouponModel>> {
  const headers = { Authorization: token };
  return axios.get<CouponModel>(
    `${this.customerApi}/${id}`, { headers }
  );
}

public purchaseCoupon(
  customerId: number,
  coupon: CouponModel,
  token: string
): Promise<AxiosResponse<void>> {
  const headers = { Authorization: token };
  return axios.post<void>(
    `${this.customerApi}/${customerId}/coupons/purchase`,
    coupon,
    { headers }
  );
}

public getAllAvailableCoupons(
  token: string
): Promise<AxiosResponse<CouponModel[]>> {
  const headers = { Authorization: token };
  return axios.get<CouponModel[]>(
    `${this.customerApi}/coupons/available`, { headers }
  );
}

// ------------------------ Company actions ------------------------
public getCompanyDetails(
  id: number, token: string
): Promise<AxiosResponse<CompanyModel>> {
  const headers = { Authorization: token };
  return axios.get<CompanyModel>(
    `${this.companyApi}/${id}/details`, { headers }
  );
}

public getAllCompanyCoupons(
  id: number, token: string
): Promise<AxiosResponse<CouponModel[]>> {
  const headers = { Authorization: token };
  return axios.get<CouponModel[]>(
    `${this.companyApi}/${id}/coupons`, { headers }
  );
}

public getSingleCompanyCouponById(
  id: number, token: string
): Promise<AxiosResponse<CouponModel>> {
  const headers = { Authorization: token };
  return axios.get<CouponModel>(
    `${this.companyApi}/${id}`, { headers }
  );
}

public deleteCompanyCoupon(
  companyId: number,
  id: number,
  token: string
): Promise<AxiosResponse<any>> {
  const headers = { Authorization: token };
  return axios.delete<any>(
    `${this.companyApi}/${companyId}/coupon/${id}`, { headers }
  );
}

public addCompanyCoupon(
  coupon: CouponPayloadModel,
  companyId: number,
  token: string
): Promise<AxiosResponse<CouponModel>> {
  const headers = { Authorization: token };
  return axios.post<CouponModel>(
    `${this.companyApi}/${companyId}/coupons`, coupon, { headers }
  );
}

public editCompanyCoupon(
  companyId: number,
  id: number,
  coupon: CouponPayloadModel,
  token: string
): Promise<AxiosResponse<CouponModel>> {
  const headers = { Authorization: token };
  return axios.put<CouponModel>(
    `${this.companyApi}/${companyId}/coupon/${id}`, coupon, { headers }
  );
}

}

const webApi = new WebApi();
export default webApi;
