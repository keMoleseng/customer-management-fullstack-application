import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CustomerService from "../services/CustomerService";

const CreateCustomer = () => {
    let { id } = useParams();
    const [customer, setCustomer] = useState({
        id: id,
        firstName: "",
        lastName: "",
        userName: "",
        emailAddress: "",
        dateOfBirth: "",
        age: ""
    });
    let navigate = useNavigate();
    console.log(customer)
    useEffect(() => {
        
        //fetch from databse
        if(id === "/_add") {
            return;
        }else{
            CustomerService.getCustomerById(id).then(res => {
                let memoryCustomer = res.data;
                setCustomer({
                    firstName: memoryCustomer.firstName,
                    lastName: memoryCustomer.lastName,
                    emailAddress: memoryCustomer.emailAddress,
                    dateOfBirth: memoryCustomer.dateOfBirth
                })
            })
        }
    
    },[])

    const handleChange = (e) => {
       const {name, value} = e.target;

        setCustomer({
            ...customer,
            [name]: value
        })
    }

    const saveCustomer = e => {
        e.preventDefault();
        console.log("save or update")

        let newCustomer = {
            firstName: customer.firstName,
            lastName: customer.lastName,
            emailAddress: customer.emailAddress,
            dateOfBirth: customer.dateOfBirth,
        }

        console.log(newCustomer)

        if(id=="_add") {
            CustomerService.createCustomer(newCustomer).then(res => {
                navigate("/")
            })
        }
        else {
            console.log(id)
            CustomerService.updateCustomer(newCustomer,id).then(res => {
                console.log(id)
                navigate("/")
            })
        }
    }

    const cancel = e => {
        navigate("/")
        console.log("cancel")
    }

    let getTitle = () => {
        if(id === '_add'){
            return <h3 className="text-center">Add Customer</h3>
        }else{
            return <h3 className="text-center">Update Customer</h3>
        }
    }


    return (
        <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> FirstName: </label>
                                            <input placeholder="John" name="firstName" className="form-control" 
                                                value={customer.firstName} onChange={handleChange}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> LastName: </label>
                                            <input placeholder="Doe" name="lastName" className="form-control" 
                                                value={customer.lastName} onChange={handleChange}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="johndoe@email.com" name="emailAddress" className="form-control" 
                                                value={customer.emailAddress} onChange={handleChange}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Date of Birth: </label>
                                            <input placeholder="1990-31-12" name="dateOfBirth" className="form-control" 
                                                value={customer.dateOfBirth} onChange={handleChange}/>
                                            <i class="fa fa-calendar"></i>
                                        </div>

                                        <button className="btn btn-success" onClick={(e) => saveCustomer(e)}>Save</button>
                                        <button className="btn btn-danger" onClick={() => cancel()} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
    )
}

export default CreateCustomer;