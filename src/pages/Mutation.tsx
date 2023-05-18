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
        // to update the present query
        queryClient.setQueryData(['super-heroes'], (oldData: any) => {
            oldData.push(data);
            return oldData;
        })
    }
    // fetching all data
    const { data: superHeroData } = useQuery(['super-heroes'], fetchSuperHeroes)
    // add new data
    const { mutate: addHero } = useMutation(addSuperHero, {
        /**
         * @param data the recent single data object got by submitting the form value
         */
        onSuccess: (data: any) => {
            // to invalidate previous query and store the super hero cache into new query, it doen network call
            // queryClient.invalidateQueries(['super-heroes'])

            // add newly posted data to the database without network call
            updateList(data);
        }
    })
    // delete data by id
    const { mutate: deleteHero } = useMutation(deleteSuperHero, {
        // invalidate the present query and fire an other one with updated data
        onSuccess: () => queryClient.invalidateQueries(['super-heroes'])
    })
    /**
     * @description to add new data to the db, reset form values
     */
    const handleClick = useCallback(() => {
        const newHero = { name, alterEgo }
        addHero(newHero);
        setName("");
        setAlterEgo("");
    }, [name, alterEgo, addHero])
    // delete the data by id
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
