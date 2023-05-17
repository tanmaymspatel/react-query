import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Group, Input, Paper, Text } from "@mantine/core";

import queryServices from '../shared/QueryServices'

function Mutation() {

    const [name, setName] = useState<string>("");
    const [alterEgo, setAlterEgo] = useState<string>("");
    const queryClient = useQueryClient();
    const { fetchSuperHeroes, deleteSuperHero, addSuperHero } = queryServices;

    const updateList = (data: any) => {
        queryClient.setQueryData(['super-heroes'], (oldData: any) => {
            oldData.push(data);
            return oldData;
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

    const deleteHeroHandler = (id: string) => {
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
                    superHeroData?.map((hero: any) => {
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
