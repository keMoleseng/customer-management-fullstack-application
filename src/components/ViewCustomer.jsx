import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CustomerService from "../services/CustomerService";


const ViewCustomer = () => {
    const [customerDetails, setCustomerDetails] = useState({});
    let { id } = useParams();
    let navigate = useNavigate()

    useEffect(() => {

        CustomerService.getCustomerById(id).then(res => {
            console.log(res.data)
            let customer = res.data;
            console.log(customer)
            setCustomerDetails({
                firstName: customer.firstName,
                lastName: customer.lastName,
                userName: customer.userName,
                emailAddress: customer.emailAddress,
                dateOfBirth: customer.dateOfBirth,
                age: customer.age
            })
        })


    }, [])

    const cancel = e => {
        navigate("/")
        console.log("cancel")
    }

    return (
        <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Customer Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Cusomer First Name: </label>
                            <div> { customerDetails.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Customer Last Name: </label>
                            <div> { customerDetails.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Customer Username : </label>
                            <div> { customerDetails.userName }</div>
                        </div>
                        <div className = "row">
                            <label> Customer Email : </label>
                            <div> { customerDetails.emailAddress }</div>
                        </div>
                        <div className = "row">
                            <label> Customer Date of Birth : </label>
                            <div> { customerDetails.dateOfBirth }</div>
                        </div>
                        <div className = "row">
                            <label> Customer Age : </label>
                            <div> { customerDetails.age }</div>
                        </div>
                        <button className="btn btn-danger" onClick={() => cancel()}>Cancel</button>
                    </div>

                </div>
            </div>
    )
}

export default ViewCustomer;