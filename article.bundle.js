(()=>{"use strict";const e=document.querySelector(".burger"),t=document.querySelector(".navbar__list"),n=[...document.querySelectorAll(".nav__link")],s="https://rs-recipes-server.herokuapp.com",a=function(e,...t){const n=document.createElement(e);return n.classList.add(...t),n},i=function(e,t,n){return e?[!!e[t].saved.find((e=>e===n)),!!e[t].favorite.find((e=>e===n))]:[!1,!1]};function r(e,t){if(void 0===e)return null;const n=document.createElement("div"),s=e.map((e=>{const n=a("li",t);return n.innerHTML=e,n}));return n.append(...s),n}function c(e,t){const n=e.querySelector(".save-btn"),s=e.querySelector(".favorite-btn");n.addEventListener("click",(n=>{const s=n.target;s.classList.toggle("is-active");const a=JSON.parse(localStorage.getItem("user")||"null");a&&o(a,e,s,t,"saved")})),s.addEventListener("click",(n=>{const s=n.target;s.classList.toggle("is-active");const a=JSON.parse(localStorage.getItem("user")||"null");a&&o(a,e,s,t,"favorite")}))}function o(e,t,n,a,i){n.classList.contains("is-active")?e[a][i].push(t.id):e[a][i]=e[a][i].filter((e=>e!==t.id)),async function(e,t){await fetch(`${s}/user/update`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(e)})}(e),localStorage.setItem("user",JSON.stringify(e))}function l(e){window.localStorage.userName=e,document.querySelector("#user-name").textContent=e}function d(e){window.localStorage.setItem("user",JSON.stringify(e))}async function u(e){e.preventDefault();const t=e.target,n=function(e){if(e.password.value===e["password-confirm"].value)return e.querySelector("#password-mismatch").classList.add("hidden"),e.querySelector("#user-exist").classList.add("hidden"),new FormData(e);e.querySelector("#password-mismatch").classList.remove("hidden")}(e.target);if(void 0!==n){const e=await m(n,"/user/register");if(400===e.status)t.querySelector("#user-exist").classList.remove("hidden");else{document.querySelector(".popup").classList.remove("is-open"),alert("Registered successfully!"),t.reset();const n=await e.json();d(n),l(n.name)}}}async function p(e){e.preventDefault();const t=e.target,n=(s=e.target,new FormData(s));var s;const a=await m(n,"/user/login");switch(a.status){case 401:t.querySelector("#wrong-password").classList.remove("hidden"),t.querySelector("#user-not-found").classList.add("hidden");break;case 404:case 500:t.querySelector("#user-not-found").classList.remove("hidden"),t.querySelector("#wrong-password").classList.add("hidden");break;case 200:{document.querySelector(".popup").classList.remove("is-open"),alert("Logged in successfully!"),t.reset();const e=await a.json();d(e),l(e.name)}}}async function m(e,t){return await fetch(`${s}${t}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(Object.fromEntries(e.entries()))})}const v=JSON.parse(localStorage.getItem("user")||"null");function _(){c(document.querySelector(".article-container"),"articles"),document.querySelectorAll(".card").forEach((e=>{c(e,"recipes")})),function(){const e=document.querySelector(".profile-btn"),t=document.querySelector(".popup");e.addEventListener("click",(async()=>{if(e="token",document.cookie.split("; ").find((t=>t.startsWith(`${e}=`)))?.split("=")[1]){const e=await fetch(`${s}/user/profile`,{credentials:"include"});200===e.status?(d(await e.json()),window.open("./user-page.html","_self")):t.classList.add("is-open")}else t.classList.add("is-open");var e}))}(),document.forms[1].addEventListener("submit",u),document.forms[0].addEventListener("submit",p)}const f=window.location.search,g=new URLSearchParams(f).get("id");e.addEventListener("click",(()=>{e.classList.toggle("burger_open"),t.classList.toggle("navbar__list_open")})),n.forEach((n=>{n.addEventListener("click",(()=>{e.classList.remove("burger_open"),t.classList.remove("navbar__list_open")}))})),async function(e){const t=await(async e=>{const t=await fetch(`${s}/articles/${e}`);return await t.json()})(e);(function(e,t){const n=document.querySelector("#main"),s=document.createElement("section"),a=new Date(e.postedAt).toLocaleDateString("en-us",{year:"numeric",month:"long",day:"numeric"}),c=String(e._id),[o,l]=i(t,"articles",c),d=r(e.category,"categories__item"),u=r(e.body,"article__text");s.innerHTML=`\n    <div class="container article-container" id=${c}>\n      <div class="article__btns">\n        <button class="article__btn_favorite btn_outlined btn-reset favorite-btn">Add to favorite articles</button>\n        <button class="article__btn_save btn_outlined btn-reset save-btn">Save for later</button>\n      </div>\n      <h1 class="article-main__title">${e.title}</h1>\n      <img class="article-main__img" src=${e.image} alt="article img">\n      <div class="article__meta">\n        <time class="article__date" datetime=${e.postedAt}>${a}</time>\n        <ul class="article__categories list-reset">\n          ${d?.innerHTML}\n        </ul>\n      </div>\n      <div class="article__descr">\n        ${u?.innerHTML}\n      </div>\n    </div>\n  `,o&&s.querySelector(".save-btn").classList.add("is-active"),l&&s.querySelector(".favorite-btn").classList.add("is-active"),n.appendChild(s)})(t,v),t.relevantRecipes.length>0&&function(e,t){const n=document.querySelector("#main"),s=a("section","relevant-recipes");s.innerHTML='\n    <div class="container">\n      <h2 class="relevant-recipes__title">Relevant recipes</h2>\n      <ul class="relevant-recipes__list list-reset">\n      </ul>\n    </div>\n  ';const r=s.querySelector(".relevant-recipes__list"),c=e.map((e=>function(e,t,n,s,r){const c=e.dishTypes[0].split(" ").map((e=>e[0].toUpperCase()+e.slice(1))).join(" ")||"",o=Math.round(e.nutrition.nutrients[0].amount),l=String(e.id),d=`./recipe.html?id=${l}`,[u,p]=i(r,"recipes",l),m="normal"===t?n.concat("card"):n.concat(["card","card_lg"]),v=a(s,...m);return v.id=l,v.innerHTML=`\n    <div class="card__header">\n      <p class="card__dish">${c}</p>\n      <div class="recipe__btns">\n        <button class="save-recipe btn-reset save-btn"></button>\n        <button class="favorite-recipe btn-reset favorite-btn"></button>\n      </div>\n    </div>\n    <a class="card__img" href="${d}">\n      <img class="card__img" src=${e.image} alt=${e.title}>\n    </a>\n    <a class="card-anchor" href=${d}>\n      <div class="card__meta">\n        <div class="data__time">\n          <p class="time__title">Cook time</p>\n          <p class="time__info">${e.readyInMinutes} min</p>\n        </div>\n        <div class="data__calories">\n          <p class="calories__title">Calories</p>\n          <p class="calories__info">${o} kcal</p>\n        </div>\n        <div class="data__rating">\n          <p class="rating__title">Rating</p>\n          <p class="rating__info">${e.aggregateLikes}</p>\n        </div>\n      </div>\n      <div class="card__body">\n        <h3 class="card__title">${e.title}</h3>\n        <p class="card__text">${e.summary}</p>\n      </div>\n    </a>\n  `,u&&v.querySelector(".save-recipe").classList.add("is-active"),p&&v.querySelector(".favorite-recipe").classList.add("is-active"),v}(e,"normal",["recipe__item"],"li",t)));r.append(...c),n.appendChild(s)}(await Promise.all(t.relevantRecipes.map((async e=>await(async e=>{const t=await fetch(`${s}/recipes/${e}`);return await t.json()})(String(e))))),v)}(g).then((()=>_())),document.querySelector("#user-name").textContent=window.localStorage.userName||"User"})();
//# sourceMappingURL=article.bundle.js.map