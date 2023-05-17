import { Button, Input, Title } from "@mantine/core"
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import queryServices from '../../shared/QueryServices'

function SuperHeroForm() {
    let { id } = useParams();
    const { data: superHeroData } = useQuery(['crud-super-hero', id], () => fetchSuperHeroById(id as string), {
        enabled: !!id
    })
    const newName = id && superHeroData?.name ? superHeroData?.name : "";
    const newAlterEgo = id && superHeroData?.alterEgo ? superHeroData?.alterEgo : "";
    const [name, setName] = useState<string>(newName);
    const [alterEgo, setAlterEgo] = useState<string>(newAlterEgo);
    const { addSuperHero, fetchSuperHeroById, editSuperHeroById } = queryServices;
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // const editName = superHeroData?.name;
    // const editAlterEgo = superHeroData?.alterEgo

    useEffect(() => {
        if (id) {
            setName(newName)
            setAlterEgo(newAlterEgo)
        }
    }, [id, newName, newAlterEgo])

    useEffect(() => {
        console.log({ name, alterEgo });
    }, [alterEgo, name]);

    const { mutate: addHero } = useMutation(addSuperHero, {
        onSuccess: () => {
            queryClient.invalidateQueries(['crud-super-heroes'])
        }
    });

    const newHero = {
        id, name, alterEgo
    }

    const { mutate: editHero } = useMutation(() => editSuperHeroById(newHero), {
        onSuccess: () => queryClient.invalidateQueries(['crud-super-heroes'])
    })

    const handleClick = useCallback(() => {
        id ? editHero(newHero as any) : addHero(newHero);
        console.log(newHero);
        setName("");
        setAlterEgo("");
        navigate('/crud');
    }, [name, alterEgo]);

    return (
        <div>
            <Title order={3}>Super Hero Form</Title>
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
                Submit
            </Button>
        </div>
    )
}

export default SuperHeroForm
