import axios from 'axios'

const taxios = axios.create({
  baseURL: 'https://anilibria.wtf/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default taxios
