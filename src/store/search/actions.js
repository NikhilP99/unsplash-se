import axios from 'axios'


export const search = (data) => dispatch => {

    axios.post('https://api.unsplash.com/search/photos',
        {
            query: data

        },
        {
            headers: {
                'Authorization': 'Client-ID YOUR_ACCESS_KEY'
            }
        }
    )
    .then(res => {
        console.log('response:',res)
        if(res && res.data && res.data.success && res.data.token!==""){


            dispatch({
                type: "Asdf",
            })

            
        }else{
            dispatch({
                type: "asdf"
            })
        }
    })
    .catch(err => {
        alert("Internal Server Error! Please try again.")
        return Promise.reject(err)
    })
}