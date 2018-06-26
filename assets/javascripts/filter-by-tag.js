(function() {
  const getTag = search => {
    return decodeURIComponent(search.substr(search.indexOf("?") + 1));
  };

  const getAllPosts = ulClass => {
    return document.querySelectorAll(`ul.${ulClass}>li`);
  };

  const filterPostsByTag = (posts, tag) => {
    [...posts].forEach(post => {
      if (!post.dataset.tags.includes(tag)) post.remove();
    });
  };

  const markCurrentTag = tag => {
    const currentTag = [...document.querySelector(".tags").children].find(
      el => el.innerText === tag
    );
    currentTag.classList.add("current-tag");
  };

  const currentTag = getTag(document.location.search);
  filterPostsByTag(getAllPosts("post-list"), currentTag);
  markCurrentTag(currentTag);
})();
