export const getMovies = async ()=>{
    const response = await fetch('https://api.tvmaze.com/shows?page=1')
    const data = await response.json()
    return data
}

export const getSearch = async(search)=>{
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
    const data = await response.json()
    return data
}

export const getSingleSearch = async(search)=>{
    const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${search}`)
    const data = await response.json()
    return data
}

export const getDetailsById = async(id)=>{
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const data = await response.json()
    return data
}

export const getEpisodesDetails = async(id)=>{
    const response = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    const data = await response.json()
    const season = await getSeasonDetails(id)
    let episodeList = season.map((elem, index)=>{
        return {
            season : index + 1,
            episodes: data.filter((elem)=> elem.season === index + 1)
        }
    })
    return episodeList
}

export const getSeasonDetails = async(id)=>{
    const response = await fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
    const data = await response.json()
    return data
}