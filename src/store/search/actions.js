import axios from 'axios'
import {client_ID} from "../../config"

export const search = (query) => dispatch => {

    axios.get('https://api.unsplash.com/search/photos',{
        params: {
            client_id: client_ID,
            query,
            per_page: 12
        }
    })
    .then(res => {
        let resultsArray = res.data.results

        let images = resultsArray.map(obj => {
            return {
                id: obj.id,
                user: obj.user.name,
                url: obj.urls.thumb,
                download: obj.links.download
            }
        })

        dispatch({
            type: "RESULTS",
            payload: {
                query,
                images,
                total: res.data.total
            }    
        })

        console.log(images)

    })
    .catch(err => {
        alert("Internal Server Error! Please try again.")
        return Promise.reject(err)
    })
}


export const load_more = (query,page) => dispatch => {

    axios.get('https://api.unsplash.com/search/photos',{
        params: {
            client_id: client_ID,
            query,
            per_page: 12,
            page
        }
    })
    .then(res => {
        let resultsArray = res.data.results

        let images = resultsArray.map(obj => {
            return {
                id: obj.id,
                user: obj.user.name,
                url: obj.urls.thumb,
                download: obj.links.download
            }
        })

        dispatch({
            type: "LOAD_MORE",
            payload: {
                query: query,
                images
            }    
        })

    })
    .catch(err => {
        alert("Internal Server Error! Please try again.")
        return Promise.reject(err)
    })
}