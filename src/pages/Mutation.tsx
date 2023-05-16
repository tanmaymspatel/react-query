import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button, Group, Input, Paper, Text } from "@mantine/core";

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:3000/superHeroes")
}
const deleteSuperHero = (id: number) => {
    return axios.delete(`http://localhost:3000/superHeroes/${id}`)
}
// to be added in useMutation
const addSuperHero = (hero: any) => {
    return axios.post("http://localhost:3000/superHeroes", hero)
}



function Mutation() {

    const [name, setName] = useState<string>("");
    const [alterEgo, setAlterEgo] = useState<string>("");
    const queryClient = useQueryClient();

    const updateList = (data: any) => {
        queryClient.setQueryData(['super-heroes'], (oldData: any) => {
            return {
                ...oldData, data: [...oldData.data, data.data]
            }
        })
    }

    const { data: superHeroData } = useQuery(['super-heroes'], fetchSuperHeroes)
    const { mutate: addHero } = useMutation(addSuperHero, {
        onSuccess: (data: any) => {
            // to invalidate previous query and store the super hero cache into new query, it doen network call
            // queryClient.invalidateQueries(['super-heroes'])

            // add newly posted data to the database without network call
            updateList(data);
        }
    })

    const { mutate: deleteHero } = useMutation(deleteSuperHero, {
        onSuccess: () => queryClient.invalidateQueries(['super-heroes'])
    })

    const handleClick = useCallback(() => {
        const newHero = { name, alterEgo }
        addHero(newHero);
        setName("");
        setAlterEgo("");
    }, [name, alterEgo, addHero])

    const deleteHeroHandler = (id: number) => {
        deleteHero(id)
    }

    return (
        <div>
            <h3>Super Heroes</h3>
            <div>
                <Input my={"md"}
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input my={"sm"}
                    type="text"
                    placeholder="Enter Alter Ego"
                    value={alterEgo}
                    onChange={(e) => setAlterEgo(e.target.value)}
                />
                <Button my={"md"}
                    onClick={handleClick}>
                    Add Hero
                </Button>
            </div>
            <div>
                {
                    superHeroData?.data.map((hero: any) => {
                        return (
                            <div key={hero.id}>
                                <Paper my={"sm"} p={"sm"}>
                                    <Group position="apart">
                                        <Text>
                                            {hero.name} - {hero.alterEgo}
                                        </Text>
                                        <Button color="red" onClick={() => deleteHeroHandler(hero.id)}>Delete</Button>
                                    </Group>
                                </Paper>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Mutation
