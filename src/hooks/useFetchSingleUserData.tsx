import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchUserDetails = ({ queryKey }: any) => {
    const userId = queryKey[1]
    return axios.get(`http://localhost:3000/users/${userId}`).then(res => res.data)
}

function useFetchSingleUserData(userId: string) {

    return useQuery(['user-details', userId], fetchUserDetails)
}

export default useFetchSingleUserData;
