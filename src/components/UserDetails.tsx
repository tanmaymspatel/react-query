import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Paper } from "@mantine/core";

import useFetchSingleUserData from "../hooks/useFetchSingleUserData";
/**
 * @returns details of perticular user from id
 */
function UserDetails() {
    const { userId } = useParams();
    const { data, isLoading } = useFetchSingleUserData(userId as string);
    const [userDetails, setUSerDetails] = useState<any>({})

    useEffect(() => {
        setUSerDetails(data)
    }, [data]);

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <h4>User Details</h4>

            <Paper my={"xl"} p={"xl"}>
                <p>id : {userDetails?.id}</p>
                <p>title : {userDetails?.title}</p>
                <p>completed : {userDetails?.completed}</p>
                <p>user-id : {userDetails?.userId}</p>
            </Paper>
        </div>
    )
}

export default UserDetails;
