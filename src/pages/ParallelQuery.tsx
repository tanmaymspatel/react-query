import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchUsers = () => {
    return axios.get("http://localhost:3000/users/")
}
const fetchEmployees = () => {
    return axios.get("http://localhost:3000/employees")
}
function ParallelQuery() {

    const { data: userData } = useQuery(['users'], fetchUsers);
    const { data: employeeData } = useQuery(['employees'], fetchEmployees);


    console.log({ userData, employeeData });

    return (
        <h3>
            Parallel Queries
        </h3>
    )
}

export default ParallelQuery
