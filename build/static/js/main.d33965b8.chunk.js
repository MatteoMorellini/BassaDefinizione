(this.webpackJsonpbassadefinizione=this.webpackJsonpbassadefinizione||[]).push([[0],{17:function(e,t,n){},25:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),r=n(18),i=n.n(r),a=n(2),l=n(9),j=n(3),o=n(0),d=function(e){var t=e.genres,n=e.currentGenre,c=e.setCurrentGenre,s=e.setIsRendered;return Object(o.jsxs)("aside",{children:[Object(o.jsx)("div",{id:"genresLegend",children:Object(o.jsx)("h1",{children:"GENRES"})}),Object(o.jsx)("ul",{children:t.filter((function(e){return e.name!==n})).map((function(e,t){return Object(o.jsx)("li",{onClick:function(e){c(e.target.innerText),s(!1)},children:Object(o.jsx)("span",{children:Object(o.jsx)("span",{children:Object(o.jsx)("span",{children:e.name})})})},t)}))})]})},u=function(e){var t=e.film;return Object(o.jsxs)("li",{className:"card",children:[Object(o.jsx)("a",{href:"/film/".concat(t.Title),children:Object(o.jsx)("img",{className:"card-img-top",src:t.Poster,alt:"Cardcap"})}),Object(o.jsxs)("div",{className:"card-body",children:[Object(o.jsx)("h5",{className:"card-title",children:t.Title}),Object(o.jsx)("hr",{}),Object(o.jsx)("p",{className:"card-text",id:"plot",children:t.Plot}),Object(o.jsx)("h6",{className:"card-label",children:"GENRE"}),Object(o.jsx)("p",{className:"card-text",id:"filmGenre",children:t.Genre}),Object(o.jsx)("h6",{className:"card-label",children:"IMDB RATING"}),Object(o.jsxs)("p",{className:"card-text",children:[t.imdbRating,Object(o.jsx)("i",{className:"far fa-star"})," | ",t.imdbVotes,Object(o.jsx)("i",{className:"fas fa-vote-yea"})]})]})]})},b=(n(25),function(e){var t=e.pagesNumber,n=e.onPageClick,c=e.currentPage,s=function(){for(var e=[],s=0;s<t;s++)e.push(Object(o.jsx)("li",{className:+c===s?"active page-item":"page-item","data-page":s,onClick:n,children:s+1},s));return e};return Object(o.jsxs)("ul",{className:"pagination justify-content-center",children:[+c>0?Object(o.jsx)("li",{"data-page":+c-1,onClick:n,className:"page-item",children:Object(o.jsx)("i",{className:"fas fa-angle-double-left"})}):null,Object(o.jsx)(s,{}),+c+1<t?Object(o.jsx)("li",{"data-page":+c+1,onClick:n,className:"page-item",children:Object(o.jsx)("i",{className:"fas fa-angle-double-right"})}):null]})}),f=function(e){var t=e.currentGenre,n=e.genres,r=e.setCurrentGenre,i=e.isRendered,a=e.setIsRendered,l=Object(c.useRef)(),j=Object(c.useRef)(),d=Object(c.useRef)(),f=Object(c.useRef)(),O=Object(c.useRef)([]),h=Object(c.useRef)(0),m=Object(c.useRef)(),x=Object(c.useRef)(),p=function(){fetch("/films?genre=".concat(t,"&page=").concat(h.current),{headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){var t=e.listOfFilms;O.current=t,a(!0)}))};Object(c.useEffect)((function(){h.current=0,p()}),[t]),Object(c.useEffect)((function(){fetch("/pagination?genre=".concat(t)).then((function(e){return e.json()})).then((function(e){var t=e.pagesLength;return m.current=Math.ceil(t/10)}))}));var g=function(e){a(!1),h.current=isNaN(e.target.dataset.page)?0:e.target.dataset.page,p()},v=function(){"none"!==j.current.style.display?(j.current.style.display="none",x.current.style.display="none",d.current.style.display="grid",f.current.innerHTML="Choose the genre"):(j.current.style.display="grid",x.current.style.display="block",d.current.style.display="none",f.current.innerHTML=t)},N=function(){return i?Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)("article",{id:"articleFilms",ref:j,children:O.current.map((function(e){return Object(o.jsx)(u,{film:e},e.imdbID)}))}),Object(o.jsx)("nav",{ref:x,children:m.current>1?Object(o.jsx)(b,{onPageClick:g,pagesNumber:m.current,currentPage:h.current}):null})]}):Object(o.jsxs)("div",{className:"lds-ellipsis",children:[Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{})]})};return Object(o.jsxs)("section",{children:[Object(o.jsx)("div",{className:"module-border-wrap",children:Object(o.jsxs)("div",{id:"slogan",children:[Object(o.jsx)("img",{src:"/img/logo.jpg",alt:"logo"}),Object(o.jsx)("h2",{children:"Search. Vote. Save."}),Object(o.jsx)("h1",{children:"ANY MOVIE IN YOUR MIND"})]})}),Object(o.jsxs)("div",{className:"genre",id:t,children:[Object(o.jsx)("h1",{id:"currentGenre",ref:f,children:t}),Object(o.jsx)("i",{id:"changeGenre",ref:l,onClick:v,className:"fas fa-exchange-alt"})]}),Object(o.jsx)(N,{}),Object(o.jsx)("article",{id:"articleGenres",ref:d,children:Object(o.jsx)("ul",{children:n.filter((function(e){return e.name!==t})).map((function(e){return Object(o.jsx)("li",{onClick:function(e){r(e.target.innerText),a(!1),v()},children:Object(o.jsx)("span",{children:Object(o.jsx)("span",{children:Object(o.jsx)("span",{children:e.name})})})},e.id)}))})})]})},O=n(7),h=n.n(O),m=function(e){var t=e.token,n=e.setToken,s=Object(c.useRef)(),r=Object(c.useRef)(),i=Object(j.f)(),l=Object(c.useState)(""),d=Object(a.a)(l,2),u=d[0],b=d[1],f=Object(c.useState)([]),O=Object(a.a)(f,2),m=O[0],x=O[1],p=Object(c.useState)(""),g=Object(a.a)(p,2),v=g[0],N=g[1],k=Object(c.useRef)(),y=Object(c.useState)(!0),T=Object(a.a)(y,2),C=T[0],R=T[1],w=Object(c.useState)(!1),S=Object(a.a)(w,2),G=S[0],E=S[1],L=function(e){C!==e&&(b(""),x([]),R(e))},F=function(){s.current.href="/login",s.current.innerHTML="<i class='fa fa-user'></i> GET STARTED",s.current.style["border-radius"]="10px",r.current.style.display="none"},A=function(){""!==t?h()("/token",{headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded",Authorization:"Bearer "+t},method:"POST"}).then((function(e){return e.json()})).then((function(e){var t=e.username;e.auth?function(e){N(e),s.current.href="/profile",s.current.innerHTML='<i class="fa fa-user"></i> '.concat(e),s.current.style["border-radius"]="10px 0 0 10px",r.current.style.display="inline"}(t):F()})).catch((function(){F()})):F()};return Object(c.useEffect)((function(){var e=function(e){k.current&&!k.current.contains(e.target)?E(!1):E(!0)};return window.addEventListener("click",e),function(){window.removeEventListener("click",e)}}),[]),Object(c.useEffect)((function(){A()}),[t]),Object(c.useEffect)((function(){var e=setTimeout((function(){u&&(C?h()("/search-movie?s=".concat(u)).then((function(e){return e.json()})).then((function(e){e.Response?(E(!0),x(e.Search)):x([])})).catch((function(){x([])})):h()("/search-user?s=".concat(u)).then((function(e){return e.json()})).then((function(e){E(!0),x(e)})).catch((function(){x([])})))}),300);return function(){clearTimeout(e)}}),[u]),Object(o.jsxs)("header",{children:[Object(o.jsx)("a",{href:"/",children:Object(o.jsx)("img",{src:"/img/dkLogo.jpg",alt:"",className:"logo"})}),Object(o.jsxs)("form",{id:"searchFilm",className:C?"searchFilm":"searchUsers",ref:k,onSubmit:function(e){e.preventDefault()},children:[Object(o.jsx)("input",{className:"input-field",spellCheck:"false",autoComplete:"off",type:"text",value:u,onChange:function(e){return b(e.target.value)},id:"inputFilm",name:"title",placeholder:C?"Search for a movie...":"Search for a user..."}),Object(o.jsxs)("div",{id:"suggestions",children:[(0===u.length||void 0===m||!1===G)&&Object(o.jsx)("span",{}),u.length>0&&void 0!==m&&!0===G&&!0===C&&Object(o.jsx)("ul",{children:m.map((function(e,t){return Object(o.jsx)("li",{children:Object(o.jsxs)("a",{href:"/film/".concat(e.Title),children:[Object(o.jsx)("p",{children:e.Title})," ",Object(o.jsx)("i",{className:"fa-solid fa-arrow-right"})]})},t)}))}),u.length>0&&void 0!==m&&!0===G&&!1===C&&Object(o.jsx)("ul",{children:m.map((function(e,t){var n=e.username;if(v!==n)return Object(o.jsx)("li",{children:Object(o.jsxs)("a",{href:"/user-search/".concat(n),children:[Object(o.jsx)("p",{children:n})," ",Object(o.jsx)("i",{className:"fa-solid fa-arrow-right"})]})},t)}))})]}),Object(o.jsxs)("div",{id:"changeSearch",children:[Object(o.jsx)("i",{className:"fa-solid fa-film",style:{opacity:C?1:.3},id:"movieIcon",onClick:function(){return L(!0)}}),Object(o.jsx)("i",{className:"fa-solid fa-users",style:{opacity:C?.3:1},id:"usersIcon",onClick:function(){return L(!1)}})]})]}),Object(o.jsxs)("div",{id:"userInteraction",children:[Object(o.jsxs)("a",{href:"/login",id:"button-user",ref:s,children:[Object(o.jsx)("i",{className:"fa-solid fa-user"})," GET STARTED"]}),Object(o.jsxs)("button",{id:"button-logout",ref:r,onClick:function(){document.cookie="jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",n(""),i.push("/")},children:[Object(o.jsx)("i",{className:"fa-solid fa-sign-out-alt"})," LOGOUT"]})]})]})},x=function(){return Object(o.jsxs)("footer",{className:"page-footer font-small special-color-dark pt-4",children:[Object(o.jsx)("div",{className:"container",children:Object(o.jsxs)("ul",{className:"list-unstyled list-inline text-center",children:[Object(o.jsx)("li",{className:"list-inline-item",children:Object(o.jsx)("a",{href:"https://www.facebook.com/profile.php?id=100010848486989",className:"btn-floating fa-lg fa-2x",children:Object(o.jsx)("i",{className:"fa-brands fa-facebook-f"})})}),Object(o.jsx)("li",{className:"list-inline-item",children:Object(o.jsx)("a",{href:"https://www.instagram.com/matteo.mrl",className:"btn-floating fa-lg fa-2x",children:Object(o.jsx)("i",{className:"fa-brands fa-instagram"})})}),Object(o.jsx)("li",{className:"list-inline-item",children:Object(o.jsx)("a",{href:"https://www.linkedin.com/in/matteo-morellini-306a331a8/",className:"btn-floating fa-lg fa-2x",children:Object(o.jsx)("i",{className:"fa-brands fa-linkedin"})})}),Object(o.jsx)("li",{className:"list-inline-item",children:Object(o.jsx)("a",{href:"https://github.com/MatteoMorellini",className:"btn-floating fa-lg fa-2x",children:Object(o.jsx)("i",{className:"fa-brands fa-github"})})})]})}),Object(o.jsx)("div",{className:"footer-copyright text-center py-3",children:"Created with passion by Matteo Morellini."})]})},p=(n(17),function(e){var t=e.token,n=e.setToken,r=Object(c.useState)("Action"),i=Object(a.a)(r,2),l=i[0],j=i[1],u=Object(c.useRef)([]),b=Object(c.useState)(),O=Object(a.a)(b,2),h=O[0],p=O[1];return Object(c.useEffect)((function(){fetch("/genres").then((function(e){return e.json()})).then((function(e){u.current=e}))}),[]),Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)(m,{token:t,setToken:n}),Object(o.jsxs)("main",{className:"main-homepage",children:[Object(o.jsx)(d,{genres:u.current,currentGenre:l,setCurrentGenre:j,setIsRendered:p}),Object(o.jsx)(f,{currentGenre:l,setCurrentGenre:j,genres:u.current,setIsRendered:p,isRendered:h})]}),Object(o.jsx)(x,{})]})}),g=(n(31),function(e){var t=e.token,n=e.setToken,r=Object(c.useState)(),i=Object(a.a)(r,2),l=i[0],d=i[1],u=Object(c.useState)(!1),b=Object(a.a)(u,2),f=b[0],O=b[1],p=Object(j.g)().title,g=Object(c.useRef)(),v=Object(c.useState)("black"),N=Object(a.a)(v,2),k=N[0],y=N[1],T=Object(c.useState)("black"),C=Object(a.a)(T,2),R=C[0],w=C[1];Object(c.useEffect)((function(){var e=encodeURI("/film-data/".concat(p));h()(e,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+t}}).then((function(e){return e.json()})).then((function(e){var t=e.data;e.found&&d(t),O(!0)}))}),[]);var S=function(e){h()("/vote",{headers:{"Content-Type":"application/json",Authorization:"Bearer "+t},body:JSON.stringify({title:p,rating:e}),method:"PUT"}).then((function(e){return e.json()})).then((function(t){var n=t.auth,c=t.vote;n&&c&&(e&&"black"===k?(y("green"),"red"===R&&w("black")):"black"===R&&(w("red"),"green"===k&&y("black")))}))};return Object(c.useEffect)((function(){t&&h()("/vote",{headers:{"Content-Type":"application/json",Authorization:"Bearer "+t},body:JSON.stringify({title:p}),method:"POST"}).then((function(e){return e.json()})).then((function(e){var t=e.auth,n=e.voted,c=e.liked;t&&n&&(c&&"black"===k?(y("green"),"red"===R&&w("black")):"black"===R&&(w("red"),"green"===k&&y("black")))}))}),[t]),f?Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)(m,{token:t,setToken:n}),void 0!==l?Object(o.jsxs)("section",{id:"specificFilm",ref:g,children:[Object(o.jsx)("img",{src:l.Poster,alt:""}),Object(o.jsxs)("div",{id:"filmInformation",children:[Object(o.jsx)("h1",{id:"title",children:l.Title}),Object(o.jsx)("h5",{id:"plot",children:l.Plot}),Object(o.jsx)("h5",{id:"genre",children:l.Genre}),Object(o.jsx)("h5",{id:"runtime",children:l.Runtime}),Object(o.jsx)("h5",{id:"released",children:l.Released}),Object(o.jsxs)("h5",{id:"director",children:["Director: ",l.Director]}),Object(o.jsxs)("h5",{id:"actors",children:["Actors: ",l.Actors]}),Object(o.jsx)("h5",{id:"awards",children:l.Awards}),Object(o.jsxs)("h5",{id:"imdbRating",children:[l.imdbRating," ",Object(o.jsx)("i",{className:"far fa-star"})," |"," ",l.imdbVotes," ",Object(o.jsx)("i",{className:"fas fa-vote-yea"})," IMDb ratings"]}),t&&Object(o.jsxs)("div",{id:"vote",children:[Object(o.jsx)("h5",{id:"textRating",children:"Rate the film"}),Object(o.jsx)("i",{className:"fas fa-thumbs-up",style:{color:k},onClick:function(){return S(1)}}),Object(o.jsx)("i",{className:"fas fa-thumbs-down",style:{color:R},onClick:function(){return S(0)}})]})]})]}):Object(o.jsx)("div",{id:"filmNotFound",children:Object(o.jsxs)("h1",{children:["FILM ",Object(o.jsx)("span",{children:"NOT FOUND"})," TRY ANOTHER NAME"]})}),Object(o.jsx)(x,{})]}):Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)(m,{token:t}),Object(o.jsxs)("div",{className:"lds-ellipsis",children:[Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{})]})," ",Object(o.jsx)(x,{})]})}),v=(n(32),function(e){var t=e.setToken,n=Object(c.useState)(),s=Object(a.a)(n,2),r=s[0],i=s[1],l=Object(c.useState)(""),d=Object(a.a)(l,2),u=d[0],b=d[1],f=Object(c.useState)(""),O=Object(a.a)(f,2),m=O[0],x=O[1],p=Object(j.f)(),g=function(e){e.preventDefault(),u.length>0&&m.length>0&&h()("/login",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({username:u,password:m})}).then((function(e){return e.json()})).then((function(e){e.message?i(e.message):(t(e.token),p.push("/"))}))};return Object(o.jsx)("div",{id:"loginPage",children:Object(o.jsxs)("form",{id:"loginForm",onSubmit:g,children:[Object(o.jsx)("a",{href:"/",children:Object(o.jsx)("img",{src:"/img/dkLogo.jpg",id:"imgLogo",alt:""})}),void 0===r?Object(o.jsx)("h1",{id:"title",children:"Log in"}):Object(o.jsx)("div",{className:"alert alert-danger",role:"alert",children:r}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{htmlFor:"username",children:"Username"}),Object(o.jsx)("input",{type:"text",className:"form-control",id:"username",name:"username",value:u,spellCheck:"false",onChange:function(e){return b(e.target.value)},autoComplete:"username"})]}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{htmlFor:"password",children:"Password"}),Object(o.jsx)("input",{type:"password",className:"form-control",id:"password",name:"password",value:m,onChange:function(e){x(e.target.value)},autoComplete:"new-password"})]}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("a",{id:"registrationLink",href:"/registration",children:"Do not have an account? Create it now"})}),Object(o.jsx)("button",{className:"btn",onClick:g,children:"SUBMIT"})]})})}),N=(n(33),function(e){var t=e.setToken,n=Object(c.useState)(""),s=Object(a.a)(n,2),r=s[0],i=s[1],l=Object(c.useState)(""),d=Object(a.a)(l,2),u=d[0],b=d[1],f=Object(c.useState)(""),O=Object(a.a)(f,2),m=O[0],x=O[1],p=Object(c.useState)(!1),g=Object(a.a)(p,2),v=(g[0],g[1]),N=Object(c.useState)(""),k=Object(a.a)(N,2),y=k[0],T=k[1],C=Object(j.f)(),R=Object(c.useRef)(),w=Object(c.useRef)(),S=Object(c.useRef)(),G=Object(c.useRef)(!1),E=Object(c.useRef)(),L=Object(c.useRef)(!1),F=Object(c.useRef)(),A=Object(c.useRef)(!1),I=Object(c.useRef)(),M=Object(c.useRef)(),P=function(e){e.preventDefault(),h()("/registration",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({username:r,mail:u,password:m})}).then((function(e){return e.json()})).then((function(e){e.message?T(e.message):(t(e.token),C.push(""))}))};Object(c.useEffect)((function(){if(r){r.match(/^(?=.{3,14}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)?(A.current=!0,I.current.style.color="green",R.current.classList.remove("invalid"),R.current.classList.add("valid"),U()):(A.current=!1,I.current.style.color="red",R.current.classList.remove("valid"),R.current.classList.add("invalid"))}})),Object(c.useEffect)((function(){if(u){u.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)?(F.current.innerHTML="<i class='fas fa-info'></i> Valid email",F.current.style.color="green",L.current=!0,S.current.classList.remove("invalid"),S.current.classList.add("valid"),U()):(F.current.innerHTML="<i class='fas fa-info'></i> Invalid email",F.current.style.color="red",L.current=!1,S.current.classList.remove("valid"),S.current.classList.add("invalid"))}}),[u]),Object(c.useEffect)((function(){if(m){m.match(/^[A-Za-z]\w{5,13}$/)?(E.current.innerHTML="<i class='fas fa-info'></i> Valid password",E.current.style.color="green",G.current=!0,w.current.classList.remove("invalid"),w.current.classList.add("valid"),U()):(E.current.innerHTML="<i class='fas fa-info'></i> 7 to 15 characters and the first must be a letter",E.current.style.color="red",G.current=!1,w.current.classList.remove("valid"),w.current.classList.add("invalid"))}}),[m]);var U=function(){A.current&&L.current&&G.current?(M.current.disabled=!1,M.current.style.backgroundColor="white",M.current.style.color="black",M.current.classList="btn btn-abled",v(!0)):(M.current.disabled=!0,M.current.style.backgroundColor="red",M.current.classList="btn",v(!1))};return Object(o.jsx)("div",{id:"registrationPage",children:Object(o.jsxs)("form",{onSubmit:P,className:"form-registration",children:[Object(o.jsx)("a",{href:"/",children:Object(o.jsx)("img",{src:"/img/dkLogo.jpg",id:"imgLogo",alt:""})}),y&&Object(o.jsx)("div",{className:"alert alert-danger",role:"alert",children:y}),Object(o.jsx)("h1",{id:"title",children:"Create account"}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{htmlFor:"username",children:"Username"}),Object(o.jsx)("input",{type:"text",ref:R,className:"form-control",id:"username",name:"username",value:r,onChange:function(e){return i(e.target.value)},autoComplete:"username"}),Object(o.jsxs)("small",{id:"usernameHelp",className:"form-text",ref:I,children:[Object(o.jsx)("i",{className:"fas fa-info"})," Letters between 4 and 15"]})]}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{htmlFor:"mail",children:"Email address"}),Object(o.jsx)("input",{type:"email",className:"form-control",id:"mail",ref:S,name:"mail",value:u,onChange:function(e){return b(e.target.value)},autoComplete:"email"}),Object(o.jsxs)("small",{id:"emailHelper",className:"form-text",ref:F,children:[Object(o.jsx)("i",{className:"fas fa-info"})," Insert a valid email"]})]}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{htmlFor:"password",children:"Password"}),Object(o.jsx)("input",{type:"password",className:"form-control",ref:w,id:"password",name:"password",value:m,onChange:function(e){return x(e.target.value)},autoComplete:"new-password"}),Object(o.jsxs)("small",{id:"passwordHelp",ref:E,className:"form-text",children:[Object(o.jsx)("i",{className:"fas fa-info"})," 7 to 15 characters and the first must be a letter"]})]}),Object(o.jsx)("button",{type:"submit",className:"btn",ref:M,onClick:P,disabled:!0,children:"SUBMIT"})]})})}),k=function(e){var t=e.genres,n=e.currentGenre,c=e.setCurrentGenre,s=function(e){c(e.target.id)};return Object(o.jsxs)("aside",{className:"user-genres",children:[Object(o.jsx)("div",{id:"genresLegend",children:Object(o.jsx)("h1",{children:"GENRES"})}),Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{onClick:s,children:"All genres"},"0"),t.filter((function(e){return e!==n})).map((function(e,t){return Object(o.jsx)("li",{id:e,onClick:s,children:e},t+1)}))]})]})},y=(n(34),function(e){var t=e.films,n=e.currentGenre;return Object(o.jsxs)("article",{className:"user-films",children:[Object(o.jsx)("div",{id:"title",children:Object(o.jsx)("h1",{children:"MOVIES YOU LIKED"})}),Object(o.jsx)("section",{id:"favouriteFilms",children:t.filter((function(e){return e.Genre.includes(n)})).map((function(e,t){return Object(o.jsxs)("div",{className:"card",children:[Object(o.jsx)("a",{href:"/film/".concat(e.Title),children:Object(o.jsx)("img",{className:"card-img-top",src:e.Poster,alt:"Cardcap"})}),Object(o.jsxs)("div",{className:"card-body",children:[Object(o.jsx)("h5",{className:"card-title",children:e.Title}),Object(o.jsxs)("p",{className:"card-text",id:"rating",children:[e.imdbRating," ",Object(o.jsx)("i",{className:"far fa-star"})]})]})]},t)}))})]})}),T=function(e){var t=e.token,n=e.setToken,r=Object(c.useState)(""),i=Object(a.a)(r,2),l=i[0],j=i[1],d=Object(c.useRef)(),u=Object(c.useState)(!1),b=Object(a.a)(u,2),f=b[0],O=b[1],h=Object(c.useRef)(),p=Object(c.useRef)(!1),g=Object(c.useRef)(),v=function(e){j(e.target.id)};return Object(c.useEffect)((function(){""!==t&&fetch("/user-data",{headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded",Authorization:"Bearer "+t}}).then((function(e){return e.json()})).then((function(e){var t=e.userGenres,n=e.userFilms;e.auth&&(d.current=t,h.current=n,O(!0))}))}),[t]),Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)(m,{token:t,setToken:n}),f?h.current.length>0?Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsxs)("div",{id:"filterGenres",onClick:function(){p.current?(p.current=!1,g.current.style.display="none"):(p.current=!0,g.current.style.display="block")},children:[Object(o.jsx)("i",{className:"fas fa-sort-down"})," Filter by genre"," ",Object(o.jsx)("i",{className:"fas fa-sort-down"})]}),Object(o.jsx)("div",{id:"allGenres",ref:g,children:Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{onClick:v,children:"All genres"},"0"),d.current.filter((function(e){return e!==l})).map((function(e,t){return Object(o.jsx)("li",{id:e,onClick:v,children:e},t+1)}))]})}),Object(o.jsx)("main",{children:Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)(k,{genres:d.current,currentGenre:l,setCurrentGenre:j}),Object(o.jsx)(y,{films:h.current,currentGenre:l})]})})]}):Object(o.jsx)("div",{id:"noFilm",children:Object(o.jsxs)("h1",{children:["you haven't ",Object(o.jsx)("span",{children:"voted"})," any movie yet."]})}):Object(o.jsxs)("div",{className:"lds-ellipsis",children:[Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{})]}),Object(o.jsx)(x,{})]})},C=function(e){var t=e.genres,n=(e.currentGenre,e.setCurrentGenre),c=function(e){n(e.target.id)};return Object(o.jsxs)("aside",{className:"user-genres",children:[Object(o.jsx)("div",{id:"genresLegend",children:Object(o.jsx)("h1",{children:"GENRES"})}),Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{onClick:c,children:"All"},"0"),t.map((function(e,t){return Object(o.jsx)("li",{id:e,onClick:c,children:e},t+1)}))]})]})},R=(n(35),function(e){var t=e.films,n=e.currentGenre,c=e.username;return Object(o.jsxs)("article",{className:"user-films",children:[Object(o.jsx)("div",{id:"title",children:Object(o.jsxs)("h1",{children:[n.toUpperCase()," MOVIES THAT ",c.toUpperCase()," LIKED"]})}),Object(o.jsx)("section",{id:"favouriteFilms",children:t.filter((function(e){return e.Genre.includes(n)})).map((function(e,t){return Object(o.jsxs)("div",{className:"card",children:[Object(o.jsx)("a",{href:"/film/".concat(e.Title),children:Object(o.jsx)("img",{className:"card-img-top",src:e.Poster,alt:"Cardcap"})}),Object(o.jsxs)("div",{className:"card-body",children:[Object(o.jsx)("h5",{className:"card-title",children:e.Title}),Object(o.jsxs)("p",{className:"card-text",id:"rating",children:[e.imdbRating," ",Object(o.jsx)("i",{className:"far fa-star"})]})]})]},t)}))})]})}),w=function(e){var t=e.token,n=e.setToken,r=Object(c.useState)(""),i=Object(a.a)(r,2),l=i[0],d=i[1],u=Object(c.useRef)(),b=Object(c.useState)(!1),f=Object(a.a)(b,2),O=f[0],h=f[1],p=Object(c.useRef)(),g=Object(j.g)().username,v=Object(c.useRef)(!1),N=Object(c.useRef)(),k=Object(c.useState)(!1),y=Object(a.a)(k,2),T=y[0],w=y[1],S=Object(c.useState)("Follow"),G=Object(a.a)(S,2),E=G[0],L=G[1],F=Object(c.useState)("#68beff"),A=Object(a.a)(F,2),I=A[0],M=A[1],P=function(e){d(e.target.id)};return Object(c.useEffect)((function(){L(T?"Unfollow":"Follow"),M(T?"#ff9900":"#68beff")}),[T]),Object(c.useEffect)((function(){t&&(fetch("/search-user-data/".concat(g)).then((function(e){return e.json()})).then((function(e){var t=e.userGenres,n=e.userFilms;u.current=t,p.current=n,h(!0)})),function(){var e=encodeURI("/follow/".concat(g));fetch(e,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+t}}).then((function(e){return e.json()})).then((function(e){var t=e.auth,n=e.followed;console.log(t,n),t&&n&&w(!0)}))}())}),[t]),Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)(m,{token:t,setToken:n}),O?Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{id:"user-info",children:t&&Object(o.jsx)("div",{id:"follow-button",style:{backgroundColor:I},onClick:function(){!function(){var e=encodeURI("/".concat(T?"un":"","follow/").concat(g));fetch(e,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+t},method:"PUT"}).then((function(e){return e.json()})).then((function(e){var t=e.auth,n=e.status;t&&n&&w(!T)}))}()},children:E})}),p.current.length>0?Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsxs)("div",{id:"filterGenres",onClick:function(){v.current?(v.current=!1,N.current.style.display="none"):(v.current=!0,N.current.style.display="block")},children:[Object(o.jsx)("i",{className:"fas fa-sort-down"})," Filter by genre"," ",Object(o.jsx)("i",{className:"fas fa-sort-down"})]}),Object(o.jsx)("div",{id:"allGenres",ref:N,children:Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{onClick:P,children:"All genres"},"0"),u.current.filter((function(e){return e!==l})).map((function(e,t){return Object(o.jsx)("li",{id:e,onClick:P,children:e},t+1)}))]})}),Object(o.jsx)("main",{children:Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)(C,{genres:u.current,currentGenre:l,setCurrentGenre:d}),Object(o.jsx)(R,{films:p.current,currentGenre:l,username:g})]})})]}):Object(o.jsx)("div",{id:"noFilm",children:Object(o.jsxs)("h1",{children:["They haven't ",Object(o.jsx)("span",{children:"voted"})," any movie yet."]})})]}):Object(o.jsxs)("div",{className:"lds-ellipsis",children:[Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{})]}),Object(o.jsx)(x,{})]})},S=(n(36),function(){return Object(o.jsx)("div",{className:"body-error404",children:Object(o.jsxs)("div",{className:"div-error404",children:[Object(o.jsx)("a",{href:"/",children:Object(o.jsx)("img",{src:"/img/logo2.jpg",id:"imgLogo",alt:""})}),Object(o.jsxs)("h1",{children:[Object(o.jsx)("i",{class:"fas fa-exclamation-triangle"})," ERROR 404"," ",Object(o.jsx)("i",{class:"fas fa-exclamation-triangle"})," ",Object(o.jsx)("br",{})," PAGE NOT FOUND"," "]}),Object(o.jsxs)("a",{href:"/",id:"homepageLink",children:[Object(o.jsx)("i",{class:"fas fa-home"})," BACK TO HOME PAGE"," "]})]})})}),G=function(){var e=Object(c.useState)(""),t=Object(a.a)(e,2),n=t[0],r=t[1];return Object(c.useEffect)((function(){r(function(e){for(var t=e+"=",n=decodeURIComponent(document.cookie).split(";"),c=0;c<n.length;c++){for(var s=n[c];" "===s.charAt(0);)s=s.substring(1);if(0===s.indexOf(t))return s.substring(t.length,s.length)}return""}("jwt"))}),[]),Object(o.jsx)(s.a.Fragment,{children:Object(o.jsx)(l.a,{children:Object(o.jsxs)(j.c,{children:[Object(o.jsx)(j.a,{exact:!0,path:"/film/:title",children:Object(o.jsx)(g,{token:n,setToken:r})}),Object(o.jsx)(j.a,{exact:!0,path:"/user-search/:username",children:Object(o.jsx)(w,{token:n,setToken:r})}),Object(o.jsx)(j.a,{exact:!0,path:"/profile",children:Object(o.jsx)(T,{token:n,setToken:r})}),Object(o.jsx)(j.a,{exact:!0,path:"/login",children:Object(o.jsx)(v,{setToken:r})}),Object(o.jsx)(j.a,{exact:!0,path:"/registration",children:Object(o.jsx)(N,{setToken:r})}),Object(o.jsx)(j.a,{exact:!0,path:"/",children:Object(o.jsx)(p,{token:n,setToken:r})}),Object(o.jsx)(j.a,{path:"/",children:Object(o.jsx)(S,{})})]})})})};i.a.render(Object(o.jsx)(s.a.StrictMode,{children:Object(o.jsx)(G,{})}),document.getElementById("root"))}},[[37,1,2]]]);
//# sourceMappingURL=main.d33965b8.chunk.js.map