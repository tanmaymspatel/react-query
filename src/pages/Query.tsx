import { useEffect, useState } from 'react'
import { Table, createStyles } from "@mantine/core";
import useFetchUserData from '../hooks/useFetchUserData';
import { useNavigate } from 'react-router-dom';

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

function Query() {
    const [userData, setUserData] = useState<any>([])
    const { classes } = useStyle();
    const navigate = useNavigate()
    // const fetchUsers = async () => {
    //     return axios.get(' http://localhost:3000/users').then(res => res.data
    //     )
    // }

    const onSuccess = (data: any) => {
        console.log("on success", data);
    }
    const onError = (error: any) => {
        console.log("on Error", error);
    }

    const {
        data,
        isLoading,
        isError,
        error,
        isFetching,
        // refetch 
    } = useFetchUserData(onSuccess, onError)
    // = useQuery(['user-details'], fetchUsers, {
    //     // cacheTime: 5000, // in miliseconds 
    //     // staleTime: 30000, // if data is not going to change very often then, to omit unnecessary network calls ==> default value: 0
    //     // refetchOnMount: false // default : true
    //     // refetchOnWindowFocus: true // default 
    //     // refetchInterval: false // data polling,
    //     // enabled: false //not to fetch data initially 
    //     retry: 0,
    //     onSuccess: onSuccess,
    //     onError: onError,
    //     // select: (data) => {
    //     //     return data.map((user: any) => user.title)
    //     // } // to transform the data
    // })

    console.log({ isLoading, isFetching });

    if (isError) {
        return <h2>{(error as any).message}</h2>
    }

    const rows = userData?.map((user: any) => (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td className='cursor-pointer' onClick={() => navigate(`${user.id}`)}>{user.title}</td>
            <td>{user.userId}</td>
            <td>{user.completed ? "YES" : "NO"}</td>
        </tr>
    ))

    useEffect(() => {
        setUserData(data)
    }, [data])
    return (
        <div className={classes.wrapper}>
            {/* {!userData && <Button onClick={() => refetch()}>Fetch Users</Button>} */}
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
            {/* {
                userData.map((title: any, i: number) => {
                    return (
                        <div key={i}>
                            <p>{title}</p>
                        </div>
                    )
                })
            } */}
        </div>
    )
}

export default Query
