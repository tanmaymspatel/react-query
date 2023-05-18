import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchUsers = async () => {
    return axios.get(' http://localhost:3000/users').then(res => res.data
    )
}
/**
 *@description custom hook for fetching the data with useQuery hook  
 */
function useFetchUserData(onSuccess: any, onError: any) {

    return useQuery(['user-details'], fetchUsers, {
        // cacheTime: 5000, // in miliseconds 
        // staleTime: 30000, // if data is not going to change very often then, to omit unnecessary network calls ==> default value: 0
        // refetchOnMount: false // default : true
        // refetchInterval: false // data polling,
        // enabled: false, //not to fetch data initially 
        // retry: 0,
        onSuccess: onSuccess,
        onError: onError,
        // select: (data) => {
        //     return data?.map((user: any) => user.title)
        // } // to transform the data (mapping)
    })
}

export default useFetchUserData;
