import axios from 'axios';


const CUSTOMER_API_BASE_URL = "https://localhost:7075/api/Customer";

class CustomerService {
    
    createCustomer(customer) {
        return axios.post(CUSTOMER_API_BASE_URL, customer)
    }

    getCustomers(){
        return axios.get(CUSTOMER_API_BASE_URL)
    }

    getCustomerById(customerId){
        return axios.get(CUSTOMER_API_BASE_URL+"/"+customerId)
    }

    updateCustomer(customer, customerId){
        return axios.put(CUSTOMER_API_BASE_URL+"/"+customerId, customer)
    }

    deleteCustomer(customerId){
        return axios.delete(CUSTOMER_API_BASE_URL+"/"+customerId)
    }
}

export default new CustomerService();