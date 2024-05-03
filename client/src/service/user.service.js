import axios from "axios";
var url_server = process.env.REACT_APP_URL_SERVER

const createUser = (name, description) =>{
   return axios.post(url_server + '/create', {name, description})
}

const deleteUser = (id) =>{

   return axios.delete( url_server +`/delete/${id}`)
}

const updateUser = (id,name, description) =>{
   return axios.put( url_server + `/update/${id}`,{name,description})
}

const getData = () =>{
   return axios.get(url_server + '/getList');
}
export { createUser, deleteUser, updateUser, getData};