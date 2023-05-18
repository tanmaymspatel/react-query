import { Table, createStyles } from "@mantine/core"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

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

const fetchUsers = (pageParam: number) => {
    return axios.get(`http://localhost:3000/users?_limit=50&_page=${pageParam}`)
}

function InfiniteQuery() {

    const { classes } = useStyle();

    const { data: infiniteData, fetchNextPage, hasNextPage } = useInfiniteQuery(['infinite-users'], ({ pageParam = 1 }) => fetchUsers(pageParam), {
        getNextPageParam: (lastPage: any, allPages: any) => {
            return lastPage.data.length === 50 ? allPages.length + 1 : undefined
        }
    })

    const rows = infiniteData?.pages?.map((page: any) => {
        return page.data.map((user: any) => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.title}</td>
                    <td>{user.userId}</td>
                    <td>{user.completed ? "YES" : "NO"}</td>
                </tr>
            )
        })
    })


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
            <button onClick={() => fetchNextPage()} disabled={!hasNextPage} >load more</button>
        </div>
    )
}

export default InfiniteQuery;
