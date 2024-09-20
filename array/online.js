function analyzeSocialMediaData(users) {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const activeUsers = users.filter(user => 
        user.posts.some(post => new Date(post.timestamp) > oneWeekAgo)
    );

    const popularPosts = activeUsers.map(user => 
        user.posts.filter(post => post.likes >= 10)
    );

    const totalLikesPerUser = popularPosts.map(posts => 
        posts.reduce((totalLikes, post) => totalLikes + post.likes, 0)
    );

    const totalLikes = totalLikesPerUser.reduce((sum, likes) => sum + likes, 0);
    const averageLikesPerUser = activeUsers.length ? totalLikes / activeUsers.length : 0;

    return averageLikesPerUser;
}
