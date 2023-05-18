import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchUserDetails = async (userId: string) => {
    // const userId = queryKey[1]
    return axios.get(`http://localhost:3000/users/${userId}`).then(res => res.data)
}
/**
 * @returns custom hook to fetch single user data 
 */
function useFetchSingleUserData(userId: string) {

    return useQuery(['user-details', userId], () => fetchUserDetails(userId))
}

export default useFetchSingleUserData;
