
const dummy = (blogs) => {
    return 1
}

const totalLikes = (listWithOneBlog) => {
    var sum = 0
    //console.log(listWithOneBlog[].likes)
    for(var i = 0; i < listWithOneBlog.length; i++){
        sum += listWithOneBlog[i].likes
    }
    console.log(sum)
    return sum
}

const favoriteBlog = (blogs) => {
    const maxBlog = {
        title: "",
        author: "",
        likes: 0
    }
    var maxLikes = 0
    
    for(var i = 0; i < blogs.length; i++){
        if(maxLikes < blogs[i].likes){
            maxLikes = blogs[i].likes
            maxBlog.title = blogs[i].title
            maxBlog.author = blogs[i].author
            maxBlog.likes = blogs[i].likes
        }    
    }
    return maxBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}