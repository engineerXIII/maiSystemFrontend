import axios from "axios";

const AppApiUrl = 'http://192.168.50.199:8888'

export default function Api(config) {
    config.url = AppApiUrl + config.url
    return axios(config)
}