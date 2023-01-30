abstract class Config{

}

class Development extends Config{
    public urls = {
        // "auth":"http://localhost:8080/api/auth",

        // admin service urls
        "companies":"http://localhost:8080/api/companies",
        "customers":"http://localhost:8080/api/customers",

        // company service urls
        "company":"http://localhost:8080/api/company",

        // customer service urls
        "customer":"http://localhost:8080/api/customer",

    }
}

class Production extends Config{
    public urls = {
        // "auth":"http://localhost:8080/api/auth",

        // admin service urls
        "companies":"http://localhost:8080/api/companies",
        "customers":"http://localhost:8080/api/customers",

        // company service urls
        "company":"http://localhost:8080/api/company",

        // customer service urls
        "customer":"http://localhost:8080/api/customer",
    }
}

const global = process.env.NODE_ENV === "development" ? new Development() : new Production();
export default global;