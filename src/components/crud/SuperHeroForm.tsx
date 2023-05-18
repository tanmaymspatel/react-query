import { Button, Input, Title } from "@mantine/core"
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import queryServices from '../../shared/QueryServices'

function SuperHeroForm() {
    let { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    // data fetching by id 
    const { data: superHeroData } = useQuery(['crud-super-hero', id], () => fetchSuperHeroById(id as string), {
        enabled: !!id // invokes hook only after the id is available i.e in edit mode
    })
    const newName = id && superHeroData?.name ? superHeroData?.name : "";
    const newAlterEgo = id && superHeroData?.alterEgo ? superHeroData?.alterEgo : "";
    const [name, setName] = useState<string>(newName);
    const [alterEgo, setAlterEgo] = useState<string>(newAlterEgo);
    const { addSuperHero, fetchSuperHeroById, editSuperHeroById } = queryServices;
    // setting valu of form fiels in edit mode
    useEffect(() => {
        if (id) {
            setName(newName)
            setAlterEgo(newAlterEgo)
        }
    }, [id, newName, newAlterEgo])
    // adding new data 
    const { mutate: addHero } = useMutation(addSuperHero, {
        onSuccess: () => {
            //invalidates present query for the updation of the data records
            queryClient.invalidateQueries(['crud-super-heroes'])
        }
    });
    // data getting from form submission
    const newHero = {
        id, name, alterEgo
    }
    // editing the data
    const { mutate: editHero } = useMutation(() => editSuperHeroById(newHero), {
        onSuccess: () => queryClient.invalidateQueries(['crud-super-heroes'])
    })
    /**
     * @name handleClick
     * @description adding and editing the data, resetting the form values and navigate to list
     */
    const handleClick = () => {
        id ? editHero(newHero as any) : addHero(newHero);
        setName("");
        setAlterEgo("");
        navigate('/crud');
    }

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
