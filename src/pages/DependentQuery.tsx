import { Paper } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchPerson = (email: string) => {
    return axios.get(`http://localhost:3000/person/${email}`)
}

const fetchCoursesByChannelId = (channelId: string) => {
    return axios.get(`http://localhost:3000/channels/${channelId}`)
}

function DependentQuery({ email }: any) {

    const { data: person } = useQuery(['person', email], () => fetchPerson(email))
    const channelId = person?.data.channelId

    const { data: channelData } = useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
        enabled: !!channelId // query will only fire if there is any channel id
    })
    console.log({ person, channelData, channelId });


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

export default DependentQuery

