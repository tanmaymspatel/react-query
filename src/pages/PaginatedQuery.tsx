import { Table, createStyles } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react";

const useStyle = createStyles((theme) => ({
    wrapper: {
        overflow: "auto",
        height: "100%"
    },
    thead: {
        backgroundColor: theme.colors.dark[0],
        color: theme.colors.orange[0],
        position: "sticky",
        top: 0
    }
}))
const fetchUsers = async (pageNumber: number) => {
    return axios.get(`http://localhost:3000/users?_limit=50&_page=${pageNumber}`);
}

function PaginatedQuery() {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const { classes } = useStyle();
    const { data: paginatedData, isFetching } = useQuery(['paginated-users', pageNumber], () => fetchUsers(pageNumber), {
        keepPreviousData: true // prevents jumping in and out of the data when next page is clicked (query changes) = basically it shows previous data untill the next data is loaded
    })

    const rows = paginatedData?.data?.map((user: any) => (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.title}</td>
            <td>{user.userId}</td>
            <td>{user.completed ? "YES" : "NO"}</td>
        </tr>
    ))
    return (
        <div className={classes.wrapper}>
            <Table striped highlightOnHover horizontalSpacing="md" verticalSpacing="md" fontSize="md">
                <thead className={classes.thead}>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>User id</th>
                        <th>IsCompleted</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            {isFetching && <h5>Loading...</h5>}
            <button onClick={() => setPageNumber(prev => prev - 1)} disabled={pageNumber === 1} >Prev</button>
            <button onClick={() => setPageNumber(prev => prev + 1)} disabled={pageNumber === 4} >Next</button>
        </div>
    )
}

export default PaginatedQuery
