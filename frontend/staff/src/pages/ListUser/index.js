import { useEffect } from "react";
import ListUserLayout from "../../components/ListUserLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "../../Redux/apiRequest";

function ListUserPage() {

    const customer = useSelector((state) => state?.customer.getAllCustomer.customer)
    
    const dispatch = useDispatch()
    useEffect(() => {
        getAllCustomers(dispatch)
    }, [dispatch])

    return ( <ListUserLayout customer={customer}/> );
}

export default ListUserPage;