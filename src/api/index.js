import axios from 'axios';

const baseURL = 'https://some-domain.com/api/';

const ajax = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'X-Custom-Header': 'foobar'
    }
});

export default ajax;
