import axios from 'axios';

const TOKEN = "cefjrciad3i6rck636j0cefjrciad3i6rck636jg"

export default axios.create({
    baseURL:"https://finnhub.io/api/v1",
    params :{ 
        token:TOKEN
    }
})

