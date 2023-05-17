import axios from "axios";

const fetchSuperHeroes = async () => {
    const result = await axios.get("http://localhost:3000/superHeroes")
    return result.data;
}
const fetchSuperHeroById = async (id: string) => {
    const result = await axios.get(`http://localhost:3000/superHeroes/${id}`)
    return result.data;
}
const editSuperHeroById = async (hero: any) => {
    const result = await axios.put(`http://localhost:3000/superHeroes/${hero.id}`, hero)
    return result.data;
}
const deleteSuperHero = async (id: string) => {
    const result = await axios.delete(`http://localhost:3000/superHeroes/${id}`)
    return result.data;
}
// to be added in useMutation
const addSuperHero = async (hero: any) => {
    const result = await axios.post("http://localhost:3000/superHeroes", hero)
    return result.data;
}

const queryServices = {
    fetchSuperHeroes,
    fetchSuperHeroById,
    deleteSuperHero,
    addSuperHero,
    editSuperHeroById
}

export default queryServices;