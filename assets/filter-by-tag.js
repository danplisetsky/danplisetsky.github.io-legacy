(function () {
    const getTag = search => {
        return decodeURIComponent(
            search.substr(search.indexOf('?') + 1));    
    };

    const getAllPosts = ulClass => {
        return document.querySelectorAll(`ul.${ulClass}>li`);
    };

    const filterPostsByTag = (posts, tag) => {
        [...posts].forEach(post => {
            if (!post.dataset.tags.includes(tag))
                post.remove();    
        });
    };

    filterPostsByTag(
        getAllPosts('post-list'),
        getTag(document.location.search)
    );

})();