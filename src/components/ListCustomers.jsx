import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CustomerService from "../services/CustomerService";

const ListCustomers = () => {
    const [customers, setCustomers] = useState([]);
    let navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {

        //fetch from database
        CustomerService.getCustomers().then(res => {
            console.log(res.data)
            setCustomers(res.data)
        })

    }, [])

    const addCustomer = () => {
        navigate("/add-customer/_add")

        console.log("add customer")
    }

    const editCustomer = (id) => {
        console.log("edit customer")
        navigate(`/add-customer/${id}`)
    }

    const deleteCustomer =(customerId) => {
        console.log("delete customer")
        alert("Are you sure youu want to delete this entry?")
        CustomerService.deleteCustomer(customerId).then(res => {
           setCustomers(customers.filter(customer => customerId!=customer.id))
        })
    }

    const viewCustomer = (id) => {
        console.log("view customer")
        navigate(`/viewCustomer/${id}`)
    }

    return (
        <div>
            <h2 className="text-center">Customer List</h2>
            <div className = "row">
                <button className="btn btn-primary col-2" onClick={() => addCustomer()}> Add Customer</button>
            </div>
            <br></br>
                 <div className = "table-responsive-sm">
                        <table className = "table table-striped table-bordered ">

                            <thead>
                                <tr>
                                    <th> Firstname</th>
                                    <th> Lastname</th>
                                    <th> Username</th>
                                    <th> Email </th>
                                    <th> DoB </th>
                                    <th> Age </th>

                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customers.map(
                                        customer => 
                                        <tr key = {customer.customerId}>
                                             <td> {customer.firstName} </td>   
                                             <td> {customer.lastName}</td>
                                             <td> {customer.userName}</td>
                                             <td> {customer.emailAddress}</td>
                                             <td> {customer.dateOfBirth}</td>
                                             <td> {customer.age}</td>
                                             <td>
                                                 <button onClick={ () => editCustomer(customer.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => deleteCustomer(customer.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => viewCustomer(customer.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
    )
}

export default ListCustomers;