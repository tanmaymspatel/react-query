import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Input, Paper } from "@mantine/core";

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:3000/superHeroes")
}

// to be added in useMutation
const addSuperHero = (hero: any) => {
    return axios.post("http://localhost:3000/superHeroes", hero)
}

function Mutation() {

    const [name, setName] = useState<string>("");
    const [alterEgo, setAlterEgo] = useState<string>("");

    const { data: superHeroData } = useQuery(['super-heroes'], fetchSuperHeroes)
    const { mutate: addHero } = useMutation(addSuperHero)

    const handleClick = useCallback(() => {
        const newHero = { name, alterEgo }
        addHero(newHero);
        setName("");
        setAlterEgo("");
    }, [name, alterEgo, addHero])

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
                                <Paper my={"sm"} p={"sm"}>{hero.name} - {hero.alterEgo}</Paper>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Mutation
