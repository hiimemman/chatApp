import {getUsers, createUsers} from '../api/users'
export const sampleData = {
    name: "Madoxx",
    username: "Sasukef",
    email: "Random@gmail.comf",
    hashedPassword: 'Random',
}
export default  async function Users(){
// const createUser = await createUsers(sampleData)
const data = await getUsers()
    return(
        <div>
            {data.body.map((datas) =>{
                return (
                <div> 
                <h1>Name: {datas.name}</h1>
                <h1>Username: {datas.username}</h1>
                <h1>Email: {datas.email}</h1>
                <h1>Password: {datas.password}</h1>
                </div>
                )
            })}
        </div>
    )
}  