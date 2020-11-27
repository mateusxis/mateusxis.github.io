console.log(document.location);
console.log("teste");
var path = document.location.pathname.replace("/noticias/", "");
var url = `https://b2b.ingresso.dev/api/v1/articles/${path}?api_key=dxupCeaaEKPMPUjcnWSmMiaT`;

fetch(url).then(function (resolve) {
  resolve.json().then(function (result) {
    var article = result.article;
    if (article) {
      var bannerArticle = document.getElementById("bannerArticle");
      bannerArticle.setAttribute("src", article.image.url);
      bannerArticle
        .getElementsByTagName("img")[0]
        .setAttribute("src", article.image.url);
  
      document.getElementsByTagName("title")[0].innerText =
        article.title + " - Ingresso.com";
      document.getElementsByClassName("highlight-caption-title")[0].innerText =
        article.title;
      document.getElementsByClassName(
        "highlight-caption-description"
      )[0].innerText = article.subtitle;
      document.getElementsByClassName(
        "highlight-caption-post-meta"
      )[0].innerText =
        new Date(article.created_at).getDate() +
        "/" +
        new Date(article.created_at).getMonth() +
        "/" +
        new Date(article.created_at).getFullYear() +
        " | " +
        new Date(article.created_at).getHours() +
        ":" +
        new Date(article.created_at).getMinutes() +
        " | " +
        article.publisher.name;
      document.getElementById("pathArticle").innerText = article.title;
      document.getElementById("subtitleArticle").innerText = article.subtitle;
      document.getElementById("contentArticle").innerHTML = article.content;
  
      var tagList = [];
      for (var i = 0; i < article.category_list.length; i++) {
        tagList.push(`
          <span class="tag tag${i + 1}">${article.category_list[i]}</span>
        `);
      }
      document.getElementsByClassName("tags-box")[0].innerHTML = tagList.join("");
  
      if (article.ingresso_url_key !== "") {
        document.getElementsByClassName("button-options")[0].innerHTML = `
          <a href="https://www.ingresso.dev/filme/${article.ingresso_url_key}" class="btn btn-primary">comprar ingressos</a>
          <a href="/noticias" class="btn btn-outline-primary">ver todas as notícias</a>
        `;
      }
    }
  });
});
