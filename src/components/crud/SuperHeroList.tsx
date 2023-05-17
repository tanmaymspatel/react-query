import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import queryServices from '../../shared/QueryServices'
import { Button, Group, Paper, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function SuperHeroList() {
    const { fetchSuperHeroes, deleteSuperHero } = queryServices;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: superHeroData } = useQuery(['crud-super-heroes'], fetchSuperHeroes);
    const { mutate: deleteHero } = useMutation(deleteSuperHero, {
        onSuccess: () => {
            queryClient.invalidateQueries(['crud-super-heroes'])
        }
    })

    const deleteHeroHandler = (id: string) => {
        deleteHero(id);
    }
    return (
        <div>
            <Group position="right" mb={"xl"}>
                <Button onClick={() => navigate('/superhero-form')}>Add</Button>
            </Group>
            {
                superHeroData?.map((hero: any) => {
                    return (
                        <div key={hero.id}>
                            <Paper my={"sm"} p={"sm"}>
                                <Group position="apart">
                                    <Text>
                                        {hero.name} - {hero.alterEgo}
                                    </Text>
                                    <div>
                                        <Button color="blue" mr={"sm"} onClick={() => navigate(`/superhero-form/${hero.id}/edit`)}>Edit</Button>
                                        <Button color="red" onClick={() => deleteHeroHandler(hero.id)}>Delete</Button>
                                    </div>
                                </Group>
                            </Paper>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SuperHeroList
