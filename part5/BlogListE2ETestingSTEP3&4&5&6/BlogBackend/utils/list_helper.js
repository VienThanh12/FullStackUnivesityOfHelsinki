
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

const mostBlog = (blogs) => {
    const mostBlog = {
        author: "",
        blogs: 0
    }
    var maxBlogs = 0
    var a = []
    for(var i = 0; i < blogs.length; i++)
        a[blogs[i].author] = 0
    for(var i = 0; i < blogs.length; i++){
        a[blogs[i].author] += 1
        maxBlogs = Math.max(maxBlogs, a[blogs[i].author])
    }

    for(var i = 0; i < blogs.length; i++){
        if(maxBlogs === a[blogs[i].author]){
            mostBlog.author = blogs[i].author
            mostBlog.blogs = maxBlogs
        }
    }
    return mostBlog
}

const mostLike = (blogs) => {
    const mostLike = {
        author: "",
        likes: 0
    }
    var maxLikes = 0
    var a = []
    for(var i = 0; i < blogs.length; i++)
        a[blogs[i].author] = 0
    
    for(var i = 0; i < blogs.length; i++){
        a[blogs[i].author] += blogs[i].likes
        maxLikes = Math.max(maxLikes, a[blogs[i].author])
    }
    
    for(var i = 0; i < blogs.length; i++){
        if(maxLikes === a[blogs[i].author]){
            mostLike.author = blogs[i].author
            mostLike.likes = maxLikes
        }
    }
    //console.log(mostLike)
    return mostLike
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLike
}