import { useEffect } from 'react'
import { Table, createStyles } from "@mantine/core"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer";
import axios from "axios"
import SingleRow from "./SingleRow";

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
    return axios.get(`http://localhost:3000/users?_limit=20&_page=${pageParam}`)
}

function InfiniteScrollList() {

    const { classes } = useStyle();
    const { ref, inView } = useInView();
    const { data: infiniteData, fetchNextPage, hasNextPage } = useInfiniteQuery(['infinite-scroll'], ({ pageParam = 1 }) => fetchUsers(pageParam), {
        getNextPageParam: (lastPage: any, allPages: any) => {
            return lastPage.data.length === 20 ? allPages.length + 1 : undefined
        }
    })

    const rows = infiniteData?.pages?.map((page: any) => {
        return page.data.map((user: any, index: number) => {
            if (page.length === index + 1) {
                return <SingleRow ref={ref} key={user.id} user={user} />
            }
            return <SingleRow ref={ref} key={user.id} user={user} />
        })
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

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
        </div>
    )
}

export default InfiniteScrollList;
