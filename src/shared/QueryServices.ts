import axios from "axios";
/**
 *@name fetchSuperHeroes
 @description fetch all the superhero data 
 */
const fetchSuperHeroes = async () => {
    const result = await axios.get("http://localhost:3000/superHeroes")
    return result.data;
}
/**
 *@name fetchSuperHeroById
 @description fetch perticular superhero data by id
 */
const fetchSuperHeroById = async (id: string) => {
    const result = await axios.get(`http://localhost:3000/superHeroes/${id}`)
    return result.data;
}
/**
 *@name editSuperHeroById
 @description edit data of perticular id
 */
const editSuperHeroById = async (hero: any) => {
    const result = await axios.put(`http://localhost:3000/superHeroes/${hero.id}`, hero)
    return result.data;
}
/**
 *@name deleteSuperHero
 @description delete data of perticular id
 */
const deleteSuperHero = async (id: string) => {
    const result = await axios.delete(`http://localhost:3000/superHeroes/${id}`)
    return result.data;
}
/**
 *@name addSuperHero
 @description add data to the database
 */
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