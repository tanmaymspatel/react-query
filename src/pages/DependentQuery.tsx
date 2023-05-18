import { Paper } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
// fetching all data
const fetchPerson = (email: string) => {
    return axios.get(`http://localhost:3000/person/${email}`)
}
// fetching data by specific id
const fetchCoursesByChannelId = (channelId: string) => {
    return axios.get(`http://localhost:3000/channels/${channelId}`)
}
/**
 * @returns Dependent query component
 */
function DependentQuery({ email }: any) {
    // fetching all data
    const { data: person } = useQuery(['person', email], () => fetchPerson(email))
    const channelId = person?.data.channelId;
    // fetching data by email id
    const { data: channelData } = useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
        enabled: !!channelId // query will only fire if there is any channel id, that is called dependent query
    })

    return (
        <div>
            <h3>Dependent Query</h3>

            <Paper my={"xl"} p={"xl"}>
                {
                    channelData?.data?.courses.map((course: any, i: number) => {
                        return <div key={i}>
                            <p>{course}</p>
                        </div>
                    })
                }
            </Paper>
        </div>
    )
}

export default DependentQuery;

