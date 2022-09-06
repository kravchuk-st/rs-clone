(()=>{"use strict";const e=document.querySelector(".burger"),t=document.querySelector(".navbar__list"),s=[...document.querySelectorAll(".nav__link")],a={containerClass:"articles",listClass:"articles__list",articleClassList:["article"],queryOptions:{page:0,limit:7,category:"cooking tips"}},n=function(e,...t){const s=document.createElement(e);return s.classList.add(...t),s},c=function(e,t,s){return e?[!!e[t].saved.find((e=>e===s)),!!e[t].favorite.find((e=>e===s))]:[!1,!1]};const r="https://rs-recipes-server.herokuapp.com",i=async e=>{let t="";e&&0!==Object.keys(e).length&&(t=(e=>{const t=[];for(const[s,a]of Object.entries(e))switch(typeof s){case"string":case"number":case"boolean":t.push(`${s}=${a}`);break;case"object":t.push(`${s}=${a.join(",")}`)}return"?"+t.join("&")})(e));const s=await fetch(`${r}/articles/${t}`);return await s.json()};function o(e,t,s,a,n){s.classList.contains("is-active")?e[a][n].push(t.id):e[a][n]=e[a][n].filter((e=>e!==t.id)),async function(e,t){await fetch(`${r}/user/update`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(e)})}(e),localStorage.setItem("user",JSON.stringify(e))}function l(e){window.localStorage.userName=e,document.querySelector("#user-name").textContent=e}function d(e){window.localStorage.setItem("user",JSON.stringify(e))}async function u(e){e.preventDefault();const t=e.target,s=function(e){if(e.password.value===e["password-confirm"].value)return e.querySelector("#password-mismatch").classList.add("hidden"),e.querySelector("#user-exist").classList.add("hidden"),new FormData(e);e.querySelector("#password-mismatch").classList.remove("hidden")}(e.target);if(void 0!==s){const e=await p(s,"/user/register");if(400===e.status)t.querySelector("#user-exist").classList.remove("hidden");else{document.querySelector(".popup").classList.remove("is-open"),alert("Registered successfully!"),localStorage.setItem("token","true"),t.reset();const s=await e.json();d(s),l(s.name)}}}async function m(e){e.preventDefault();const t=e.target,s=(a=e.target,new FormData(a));var a;const n=await p(s,"/user/login");switch(n.status){case 401:t.querySelector("#wrong-password").classList.remove("hidden"),t.querySelector("#user-not-found").classList.add("hidden");break;case 404:case 500:t.querySelector("#user-not-found").classList.remove("hidden"),t.querySelector("#wrong-password").classList.add("hidden");break;case 200:{document.querySelector(".popup").classList.remove("is-open"),alert("Logged in successfully!"),localStorage.setItem("token","true"),t.reset();const e=await n.json();d(e),l(e.name)}}}async function p(e,t){return await fetch(`${r}${t}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(Object.fromEntries(e.entries()))})}const v=JSON.parse(localStorage.getItem("user")||"null"),g=a;async function _(e){!function(e,t,s){const a=document.querySelector(`.${t.containerClass}`).querySelector(`.${t.listClass}`),r=function(e,t,s){return e.map(((e,a)=>"largeCardIndex"in t?function(e,t,s,a,r){const i=e.dishTypes[0].split(" ").map((e=>e[0].toUpperCase()+e.slice(1))).join(" ")||"",o=Math.round(e.nutrition.nutrients[0].amount),l=String(e.id),d=`./recipe.html?id=${l}`,[u,m]=c(r,"recipes",l),p="normal"===t?s.concat("card"):s.concat(["card","card_lg"]),v=n(a,...p);return v.id=l,v.innerHTML=`\n    <div class="card__header">\n      <p class="card__dish">${i}</p>\n      <div class="recipe__btns">\n        <button class="save-recipe btn-reset save-btn"></button>\n        <button class="favorite-recipe btn-reset favorite-btn"></button>\n      </div>\n    </div>\n    <a class="card__img" href="${d}">\n      <img class="card__img" src=${e.image} alt=${e.title}>\n    </a>\n    <a class="card-anchor" href=${d}>\n      <div class="card__meta">\n        <div class="data__time">\n          <p class="time__title">Cook time</p>\n          <p class="time__info">${e.readyInMinutes} min</p>\n        </div>\n        <div class="data__calories">\n          <p class="calories__title">Calories</p>\n          <p class="calories__info">${o} kcal</p>\n        </div>\n        <div class="data__rating">\n          <p class="rating__title">Rating</p>\n          <p class="rating__info">${e.aggregateLikes}</p>\n        </div>\n      </div>\n      <div class="card__body">\n        <h3 class="card__title">${e.title}</h3>\n        <p class="card__text">${e.summary}</p>\n      </div>\n    </a>\n  `,u&&v.querySelector(".save-recipe").classList.add("is-active"),m&&v.querySelector(".favorite-recipe").classList.add("is-active"),v}(e,a===t.largeCardIndex?"large":"normal",t.cardClassList,t.listElemType,s):function(e,t,s){const a=new Date(e.postedAt).toLocaleDateString("en-us",{year:"numeric",month:"long",day:"numeric"}),r=String(e._id),i=`./article.html?id=${r}`,[o,l]=c(s,"articles",r),d=n("article",...t);return d.id=e._id,d.innerHTML=`\n    <img class="article__img" src=${e.image} alt="article preview">\n    <div class="article__content">\n      <div class="article__header">\n        <time class="article__date" datetime=${e.postedAt}>${a}</time>\n        <div class="article__btns">\n          <button class="save-article btn-reset save-btn"></button>\n          <button class="favorite-article btn-reset favorite-btn"></button>\n        </div>\n      </div>\n      <h3 class="article__title">${e.title}</h3>\n      <p class="article__summary">${e.summary}</p>\n      <a class="article__btn btn-reset" href=${i}>contunue reading</a>\n    </div>\n  `,o&&d.querySelector(".save-article").classList.add("is-active"),l&&d.querySelector(".favorite-article").classList.add("is-active"),d}(e,t.articleClassList,s)))}(e,t,s);a.innerHTML="",a.append(...r)}(await async function(e,t){return await t(e.queryOptions)}(e,i),e,v)}async function f(e){const t=e.target;g.queryOptions.category=t.value.replaceAll("-"," "),await _(g),y()}function y(){document.querySelectorAll(".article").forEach((e=>{!function(e,t){const s=e.querySelector(".save-btn"),a=e.querySelector(".favorite-btn");s.addEventListener("click",(s=>{const a=s.target;a.classList.toggle("is-active");const n=JSON.parse(localStorage.getItem("user")||"null");n&&o(n,e,a,t,"saved")})),a.addEventListener("click",(s=>{const a=s.target;a.classList.toggle("is-active");const n=JSON.parse(localStorage.getItem("user")||"null");n&&o(n,e,a,t,"favorite")}))}(e,"articles")}))}const S=e=>{e.target instanceof HTMLElement&&!e.target?.closest(".popup__content")&&e.target.closest(".popup")?.classList.remove("is-open")};_(a).then((()=>(function(){const e=document.querySelector(".profile-btn"),t=document.querySelector(".popup");e.addEventListener("click",(async()=>{if(localStorage.getItem("token")){const e=await fetch(`${r}/user/profile`,{credentials:"include"});200===e.status?(d(await e.json()),window.open("./user-page.html","_self")):t.classList.add("is-open")}else t.classList.add("is-open")}))}(),document.forms[1].addEventListener("submit",u),document.forms[0].addEventListener("submit",m),function(){const e=document.querySelector(".options-container").querySelectorAll('input[type="radio"]');for(const t of e)t.addEventListener("change",f)}(),void y()))),e.addEventListener("click",(()=>{e.classList.toggle("burger_open"),t.classList.toggle("navbar__list_open")})),s.forEach((s=>{s.addEventListener("click",(()=>{e.classList.remove("burger_open"),t.classList.remove("navbar__list_open")}))})),(()=>{const e=document.querySelector("#selected"),t=document.querySelector(".options-container"),s=document.querySelectorAll(".option");e?.addEventListener("click",(()=>{t?.classList.toggle("is-active")})),s.forEach((s=>{s.addEventListener("click",(()=>{e&&(e.textContent=s.textContent?.trim(),t?.classList.remove("is-active"))}))}))})(),document.querySelector("#user-name").textContent=window.localStorage.userName||"User",document.querySelector(".popup__body")?.addEventListener("click",S),(e=>{const t=document.getElementById(e).querySelectorAll(".tabs-nav__item"),s=document.getElementById(e).querySelectorAll(".tabs-content__item");let a="";t.forEach((e=>e.addEventListener("click",(e=>n(e)))));const n=e=>{e.preventDefault(),t.forEach((e=>e.classList.remove("is-active")));const n=e.target.classList.contains("tabs-nav__item")?e.target:e.target.closest(".tabs-nav__item");var c;n?.classList.add("is-active"),s.forEach((e=>e.classList.remove("is-active"))),a=n?.getAttribute("data-tab-name"),c=a,s.forEach((e=>{e.getAttribute("data-tab-content")===c?e.classList.add("is-active"):e.classList.remove("is-active")}))}})("forms-container")})();
//# sourceMappingURL=articles.bundle.js.map