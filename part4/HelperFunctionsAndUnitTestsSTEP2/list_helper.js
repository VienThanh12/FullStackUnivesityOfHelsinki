
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
//totalLikes(listWithOneBlog)
module.exports = {
    dummy,
    totalLikes
}