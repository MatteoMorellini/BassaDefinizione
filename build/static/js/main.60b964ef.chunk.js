(this.webpackJsonpbassadefinizione=this.webpackJsonpbassadefinizione||[]).push([[0],{17:function(e,t,c){},25:function(e,t,c){},31:function(e,t,c){},32:function(e,t,c){},33:function(e,t,c){},34:function(e,t,c){},35:function(e,t,c){},36:function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),r=c(18),a=c.n(r),i=c(2),l=c(9),j=c(3),o=c(0),d=function(e){var t=e.genres,c=e.currentGenre,n=e.setCurrentGenre,s=e.setIsRendered;return Object(o.jsxs)("aside",{children:[Object(o.jsx)("div",{id:"genresLegend",children:Object(o.jsx)("h1",{children:"GENRES"})}),Object(o.jsx)("ul",{children:t.filter((function(e){return e.name!==c})).map((function(e,t){return Object(o.jsx)("li",{onClick:function(e){n(e.target.innerText),s(!1)},children:Object(o.jsx)("span",{children:Object(o.jsx)("span",{children:Object(o.jsx)("span",{children:e.name})})})},t)}))})]})},u=function(e){var t=e.film;return Object(o.jsxs)("li",{className:"card",children:[Object(o.jsx)("a",{href:"/film/".concat(t.Title),children:Object(o.jsx)("img",{className:"card-img-top",src:t.Poster,alt:"Cardcap"})}),Object(o.jsxs)("div",{className:"card-body",children:[Object(o.jsx)("h5",{className:"card-title",children:t.Title}),Object(o.jsx)("hr",{}),Object(o.jsx)("p",{className:"card-text",id:"plot",children:t.Plot}),Object(o.jsx)("h6",{className:"card-label",children:"GENRE"}),Object(o.jsx)("p",{className:"card-text",id:"filmGenre",children:t.Genre}),Object(o.jsx)("h6",{className:"card-label",children:"IMDB RATING"}),Object(o.jsxs)("p",{className:"card-text",children:[t.imdbRating,Object(o.jsx)("i",{className:"far fa-star"})," | ",t.imdbVotes,Object(o.jsx)("i",{className:"fas fa-vote-yea"})]})]})]})},b=(c(25),function(e){var t=e.pagesNumber,c=e.onPageClick,n=e.currentPage,s=function(){for(var e=[],s=0;s<t;s++)e.push(Object(o.jsx)("li",{className:+n===s?"active page-item":"page-item","data-page":s,onClick:c,children:s+1},s));return e};return Object(o.jsxs)("ul",{className:"pagination justify-content-center",children:[+n>0?Object(o.jsx)("li",{"data-page":+n-1,onClick:c,className:"page-item",children:Object(o.jsx)("i",{className:"fas fa-angle-double-left"})}):null,Object(o.jsx)(s,{}),+n+1<t?Object(o.jsx)("li",{"data-page":+n+1,onClick:c,className:"page-item",children:Object(o.jsx)("i",{className:"fas fa-angle-double-right"})}):null]})}),f=function(e){var t=e.currentGenre,c=e.genres,r=e.setCurrentGenre,a=e.isRendered,i=e.setIsRendered,l=Object(n.useRef)(),j=Object(n.useRef)(),d=Object(n.useRef)(),f=Object(n.useRef)(),O=Object(n.useRef)([]),h=Object(n.useRef)(0),m=Object(n.useRef)(),x=Object(n.useRef)(),g=function(){fetch("/films?genre=".concat(t,"&page=").concat(h.current),{headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){var t=e.listOfFilms;O.current=t,i(!0)}))};Object(n.useEffect)((function(){h.current=0,g()}),[t]),Object(n.useEffect)((function(){fetch("/pagination?genre=".concat(t)).then((function(e){return e.json()})).then((function(e){var t=e.pagesLength;return m.current=Math.ceil(t/10)}))}));var p=function(e){i(!1),h.current=isNaN(e.target.dataset.page)?0:e.target.dataset.page,g()},v=function(){"none"!==j.current.style.display?(j.current.style.display="none",x.current.style.display="none",d.current.style.display="grid",f.current.innerHTML="Choose the genre"):(j.current.style.display="grid",x.current.style.display="block",d.current.style.display="none",f.current.innerHTML=t)},N=function(){return a?Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)("article",{id:"articleFilms",ref:j,children:O.current.map((function(e){return Object(o.jsx)(u,{film:e},e.imdbID)}))}),Object(o.jsx)("nav",{ref:x,children:m.current>1?Object(o.jsx)(b,{onPageClick:p,pagesNumber:m.current,currentPage:h.current}):null})]}):Object(o.jsxs)("div",{className:"lds-ellipsis",children:[Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{})]})};return Object(o.jsxs)("section",{children:[Object(o.jsx)("div",{className:"module-border-wrap",children:Object(o.jsxs)("div",{id:"slogan",children:[Object(o.jsx)("img",{src:"/img/logo.jpg",alt:"logo"}),Object(o.jsx)("h2",{children:"Search. Vote. Save."}),Object(o.jsx)("h1",{children:"ANY MOVIE IN YOUR MIND"})]})}),Object(o.jsxs)("div",{className:"genre",id:t,children:[Object(o.jsx)("h1",{id:"currentGenre",ref:f,children:t}),Object(o.jsx)("i",{id:"changeGenre",ref:l,onClick:v,className:"fas fa-exchange-alt"})]}),Object(o.jsx)(N,{}),Object(o.jsx)("article",{id:"articleGenres",ref:d,children:Object(o.jsx)("ul",{children:c.filter((function(e){return e.name!==t})).map((function(e){return Object(o.jsx)("li",{onClick:function(e){r(e.target.innerText),i(!1),v()},children:Object(o.jsx)("span",{children:Object(o.jsx)("span",{children:Object(o.jsx)("span",{children:e.name})})})},e.id)}))})})]})},O=c(8),h=c.n(O),m=function(e){var t=e.token,c=e.setToken,s=Object(n.useRef)(),r=Object(n.useRef)(),a=Object(j.f)(),l=Object(n.useState)(""),d=Object(i.a)(l,2),u=d[0],b=d[1],f=Object(n.useState)([]),O=Object(i.a)(f,2),m=O[0],x=O[1],g=function(){s.current.href="/login",s.current.innerHTML="<i class='fa fa-user'></i> GET STARTED",s.current.style["border-radius"]="10px",r.current.style.display="none"},p=function(){""!==t?h()("/token",{headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded",Authorization:"Bearer "+t},method:"POST"}).then((function(e){return e.json()})).then((function(e){var t=e.username;e.auth?function(e){s.current.href="/user/".concat(e),s.current.innerHTML='<i class="fa fa-user"></i> '.concat(e),s.current.style["border-radius"]="10px 0 0 10px",r.current.style.display="inline"}(t):g()})).catch((function(){g()})):g()};return Object(n.useEffect)((function(){p()})),Object(n.useEffect)((function(){var e=setTimeout((function(){u&&h()("/search?s=".concat(u)).then((function(e){return e.json()})).then((function(e){e.Response?x(e.Search):x([])})).catch((function(){x([])}))}),300);return function(){clearTimeout(e)}}),[u]),Object(o.jsxs)("header",{children:[Object(o.jsx)("a",{href:"/",children:Object(o.jsx)("img",{src:"/img/dkLogo.jpg",alt:"",className:"logo"})}),Object(o.jsxs)("form",{id:"searchFilm",onSubmit:function(e){e.preventDefault()},children:[Object(o.jsx)("i",{className:"fa fa-search"}),Object(o.jsx)("input",{className:"input-field",spellCheck:"false",autoComplete:"off",type:"text",value:u,onChange:function(e){return b(e.target.value)},id:"inputFilm",name:"title",placeholder:"Search for a movie..."}),Object(o.jsx)("div",{id:"suggestions",children:0===u.length||void 0===m?Object(o.jsx)("span",{}):Object(o.jsx)("ul",{children:m.map((function(e,t){return Object(o.jsx)("li",{children:Object(o.jsxs)("a",{href:"/film/".concat(e.Title),children:[Object(o.jsx)("p",{children:e.Title})," ",Object(o.jsx)("i",{className:"fas fa-arrow-right"})]})},t)}))})})]}),Object(o.jsxs)("div",{id:"userInteraction",children:[Object(o.jsxs)("a",{href:"/login",id:"button-user",ref:s,children:[Object(o.jsx)("i",{className:"far fa-user"})," GET STARTED"]}),Object(o.jsxs)("button",{id:"button-logout",ref:r,onClick:function(){document.cookie="jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",c(""),a.push("/")},children:[Object(o.jsx)("i",{className:"fas fa-sign-out-alt"})," LOGOUT"]})]})]})},x=function(){return Object(o.jsxs)("footer",{className:"page-footer font-small special-color-dark pt-4",children:[Object(o.jsx)("div",{className:"container",children:Object(o.jsxs)("ul",{className:"list-unstyled list-inline text-center",children:[Object(o.jsx)("li",{className:"list-inline-item",children:Object(o.jsx)("a",{href:"https://www.facebook.com/profile.php?id=100010848486989",className:"btn-floating fa-lg fa-2x",children:Object(o.jsx)("i",{className:"fab fa-facebook-f",children:" "})})}),Object(o.jsx)("li",{className:"list-inline-item",children:Object(o.jsx)("a",{href:"https://twitter.com/Mmorello08",className:"btn-floating fa-lg fa-2x",children:Object(o.jsx)("i",{className:"fab fa-twitter",children:" "})})}),Object(o.jsx)("li",{className:"list-inline-item",children:Object(o.jsx)("a",{href:"https://www.instagram.com/matteo.mrl/?hl=it",className:"btn-floating fa-lg fa-2x",children:Object(o.jsx)("i",{className:"fab fa-instagram",children:" "})})}),Object(o.jsx)("li",{className:"list-inline-item",children:Object(o.jsx)("a",{href:"https://www.linkedin.com/in/matteo-morellini-306a331a8/",className:"btn-floating fa-lg fa-2x",children:Object(o.jsx)("i",{className:"fab fa-linkedin-in",children:" "})})}),Object(o.jsx)("li",{className:"list-inline-item",children:Object(o.jsx)("a",{href:"https://github.com/TheGodMorel",className:"btn-floating fa-lg fa-2x",children:Object(o.jsx)("i",{className:"fab fa-github",children:" "})})})]})}),Object(o.jsxs)("div",{className:"footer-copyright text-center py-3",children:["Created with ",Object(o.jsx)("i",{className:"fas fa-heart"})," by Matteo Morellini."]})]})},g=(c(17),function(e){var t=e.token,c=e.setToken,r=Object(n.useState)("Action"),a=Object(i.a)(r,2),l=a[0],j=a[1],u=Object(n.useRef)([]),b=Object(n.useState)(),O=Object(i.a)(b,2),h=O[0],g=O[1];return Object(n.useEffect)((function(){fetch("/genres").then((function(e){return e.json()})).then((function(e){u.current=e,j(e[0].name)}))}),[]),Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)(m,{token:t,setToken:c}),Object(o.jsxs)("main",{className:"main-homepage",children:[Object(o.jsx)(d,{genres:u.current,currentGenre:l,setCurrentGenre:j,setIsRendered:g}),Object(o.jsx)(f,{currentGenre:l,setCurrentGenre:j,genres:u.current,setIsRendered:g,isRendered:h})]}),Object(o.jsx)(x,{})]})}),p=(c(31),function(e){var t=e.token,c=e.setToken,r=Object(n.useState)(),a=Object(i.a)(r,2),l=a[0],d=a[1],u=Object(n.useState)(!1),b=Object(i.a)(u,2),f=b[0],O=b[1],g=Object(j.g)().title,p=Object(n.useRef)(),v=Object(n.useRef)(),N=Object(n.useRef)();Object(n.useEffect)((function(){var e=encodeURI("/film-data/".concat(g));h()(e,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+t}}).then((function(e){return e.json()})).then((function(e){var t=e.data;e.found&&d(t),O(!0)}))}),[]);var y=function(e){h()("/vote",{headers:{"Content-Type":"application/json",Authorization:"Bearer "+t},body:JSON.stringify({title:g,rating:e}),method:"PUT"}).then((function(e){return e.json()})).then((function(t){var c=t.auth,n=t.vote;c&&n&&(e?(p.current.style.color="green",v.current.style.color="black"):(v.current.style.color="red",p.current.style.color="black"))}))};return f?Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)(m,{token:t,setToken:c}),void 0!==l?Object(o.jsxs)("section",{id:"specificFilm",ref:N,children:[Object(o.jsx)("img",{src:l.Poster,alt:""}),Object(o.jsxs)("div",{id:"filmInformation",children:[Object(o.jsx)("h1",{id:"title",children:l.Title}),Object(o.jsx)("h5",{id:"plot",children:l.Plot}),Object(o.jsx)("h5",{id:"genre",children:l.Genre}),Object(o.jsx)("h5",{id:"runtime",children:l.Runtime}),Object(o.jsx)("h5",{id:"released",children:l.Released}),Object(o.jsxs)("h5",{id:"director",children:["Director: ",l.Director]}),Object(o.jsxs)("h5",{id:"actors",children:["Actors: ",l.Actors]}),Object(o.jsx)("h5",{id:"awards",children:l.Awards}),Object(o.jsxs)("h5",{id:"imdbRating",children:[l.imdbRating," ",Object(o.jsx)("i",{className:"far fa-star"})," |"," ",l.imdbVotes," ",Object(o.jsx)("i",{className:"fas fa-vote-yea"})," IMDb ratings"]}),t&&Object(o.jsxs)("div",{id:"vote",children:[Object(o.jsx)("h5",{id:"textRating",children:"Rate the film"}),Object(o.jsx)("i",{className:"fas fa-thumbs-up",onClick:function(){return y(1)},ref:p}),Object(o.jsx)("i",{className:"fas fa-thumbs-down",onClick:function(){return y(0)},ref:v})]})]})]}):Object(o.jsx)("div",{id:"filmNotFound",children:Object(o.jsxs)("h1",{children:["FILM ",Object(o.jsx)("span",{children:"NOT FOUND"})," TRY ANOTHER NAME"]})}),Object(o.jsx)(x,{})]}):Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)(m,{token:t}),Object(o.jsxs)("div",{className:"lds-ellipsis",children:[Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{})]})," ",Object(o.jsx)(x,{})]})}),v=(c(32),function(e){var t=e.setToken,c=Object(n.useState)(),s=Object(i.a)(c,2),r=s[0],a=s[1],l=Object(n.useState)(""),d=Object(i.a)(l,2),u=d[0],b=d[1],f=Object(n.useState)(""),O=Object(i.a)(f,2),m=O[0],x=O[1],g=Object(j.f)(),p=function(e){e.preventDefault(),u.length>0&&m.length>0&&h()("/login",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({username:u,password:m})}).then((function(e){return e.json()})).then((function(e){e.message?a(e.message):(t(e.token),g.push("/"))}))};return Object(o.jsx)("div",{id:"loginPage",children:Object(o.jsxs)("form",{id:"loginForm",onSubmit:p,children:[Object(o.jsx)("a",{href:"/",children:Object(o.jsx)("img",{src:"/img/dkLogo.jpg",id:"imgLogo",alt:""})}),void 0===r?Object(o.jsx)("h1",{id:"title",children:"Log in"}):Object(o.jsx)("div",{className:"alert alert-danger",role:"alert",children:r}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{htmlFor:"username",children:"Username"}),Object(o.jsx)("input",{type:"text",className:"form-control",id:"username",name:"username",value:u,spellCheck:"false",onChange:function(e){return b(e.target.value)},autoComplete:"username"})]}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{htmlFor:"password",children:"Password"}),Object(o.jsx)("input",{type:"password",className:"form-control",id:"password",name:"password",value:m,onChange:function(e){x(e.target.value)},autoComplete:"new-password"})]}),Object(o.jsx)("div",{className:"form-group",children:Object(o.jsx)("a",{id:"registrationLink",href:"/registration",children:"Do not have an account? Create it now"})}),Object(o.jsx)("button",{className:"btn",onClick:p,children:"SUBMIT"})]})})}),N=(c(33),function(e){var t=e.setToken,c=Object(n.useState)(""),s=Object(i.a)(c,2),r=s[0],a=s[1],l=Object(n.useState)(""),d=Object(i.a)(l,2),u=d[0],b=d[1],f=Object(n.useState)(""),O=Object(i.a)(f,2),m=O[0],x=O[1],g=Object(n.useState)(!1),p=Object(i.a)(g,2),v=(p[0],p[1]),N=Object(n.useState)(""),y=Object(i.a)(N,2),k=y[0],T=y[1],R=Object(j.f)(),C=Object(n.useRef)(),w=Object(n.useRef)(),L=Object(n.useRef)(),S=Object(n.useRef)(!1),G=Object(n.useRef)(),E=Object(n.useRef)(!1),A=Object(n.useRef)(),F=Object(n.useRef)(!1),M=Object(n.useRef)(),I=Object(n.useRef)(),P=function(e){e.preventDefault(),h()("/registration",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({username:r,mail:u,password:m})}).then((function(e){return e.json()})).then((function(e){e.message?T(e.message):(t(e.token),R.push(""))}))};Object(n.useEffect)((function(){if(r){r.match(/^(?=.{3,14}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)?(F.current=!0,M.current.style.color="green",C.current.classList.remove("invalid"),C.current.classList.add("valid"),D()):(F.current=!1,M.current.style.color="red",C.current.classList.remove("valid"),C.current.classList.add("invalid"))}})),Object(n.useEffect)((function(){if(u){u.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)?(A.current.innerHTML="<i class='fas fa-info'></i> Valid email",A.current.style.color="green",E.current=!0,L.current.classList.remove("invalid"),L.current.classList.add("valid"),D()):(A.current.innerHTML="<i class='fas fa-info'></i> Invalid email",A.current.style.color="red",E.current=!1,L.current.classList.remove("valid"),L.current.classList.add("invalid"))}}),[u]),Object(n.useEffect)((function(){if(m){m.match(/^[A-Za-z]\w{5,13}$/)?(G.current.innerHTML="<i class='fas fa-info'></i> Valid password",G.current.style.color="green",S.current=!0,w.current.classList.remove("invalid"),w.current.classList.add("valid"),D()):(G.current.innerHTML="<i class='fas fa-info'></i> 7 to 15 characters and the first must be a letter",G.current.style.color="red",S.current=!1,w.current.classList.remove("valid"),w.current.classList.add("invalid"))}}),[m]);var D=function(){F.current&&E.current&&S.current?(I.current.disabled=!1,I.current.style.backgroundColor="white",I.current.style.color="black",I.current.classList="btn btn-abled",v(!0)):(I.current.disabled=!0,I.current.style.backgroundColor="red",I.current.classList="btn",v(!1))};return Object(o.jsx)("div",{id:"registrationPage",children:Object(o.jsxs)("form",{onSubmit:P,className:"form-registration",children:[Object(o.jsx)("a",{href:"/",children:Object(o.jsx)("img",{src:"/img/dkLogo.jpg",id:"imgLogo",alt:""})}),k&&Object(o.jsx)("div",{className:"alert alert-danger",role:"alert",children:k}),Object(o.jsx)("h1",{id:"title",children:"Create account"}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{htmlFor:"username",children:"Username"}),Object(o.jsx)("input",{type:"text",ref:C,className:"form-control",id:"username",name:"username",value:r,onChange:function(e){return a(e.target.value)},autoComplete:"username"}),Object(o.jsxs)("small",{id:"usernameHelp",className:"form-text",ref:M,children:[Object(o.jsx)("i",{className:"fas fa-info"})," Letters between 4 and 15"]})]}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{htmlFor:"mail",children:"Email address"}),Object(o.jsx)("input",{type:"email",className:"form-control",id:"mail",ref:L,name:"mail",value:u,onChange:function(e){return b(e.target.value)},autoComplete:"email"}),Object(o.jsxs)("small",{id:"emailHelper",className:"form-text",ref:A,children:[Object(o.jsx)("i",{className:"fas fa-info"})," Insert a valid email"]})]}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{htmlFor:"password",children:"Password"}),Object(o.jsx)("input",{type:"password",className:"form-control",ref:w,id:"password",name:"password",value:m,onChange:function(e){return x(e.target.value)},autoComplete:"new-password"}),Object(o.jsxs)("small",{id:"passwordHelp",ref:G,className:"form-text",children:[Object(o.jsx)("i",{className:"fas fa-info"})," 7 to 15 characters and the first must be a letter"]})]}),Object(o.jsx)("button",{type:"submit",className:"btn",ref:I,onClick:P,disabled:!0,children:"SUBMIT"})]})})}),y=function(e){var t=e.genres,c=e.currentGenre,n=e.setCurrentGenre,s=function(e){n(e.target.id)};return Object(o.jsxs)("aside",{className:"user-genres",children:[Object(o.jsx)("div",{id:"genresLegend",children:Object(o.jsx)("h1",{children:"GENRES"})}),Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{onClick:s,children:"All genres"},"0"),t.filter((function(e){return e!==c})).map((function(e,t){return Object(o.jsx)("li",{id:e,onClick:s,children:e},t+1)}))]})]})},k=(c(34),function(e){var t=e.films,c=e.currentGenre;return Object(o.jsxs)("article",{className:"user-films",children:[Object(o.jsx)("div",{id:"title",children:Object(o.jsx)("h1",{children:"MOVIES YOU LIKED"})}),Object(o.jsx)("section",{id:"favouriteFilms",children:t.filter((function(e){return e.Genre.includes(c)})).map((function(e,t){return Object(o.jsxs)("div",{className:"card",children:[Object(o.jsx)("a",{href:"/film/".concat(e.Title),children:Object(o.jsx)("img",{className:"card-img-top",src:e.Poster,alt:"Cardcap"})}),Object(o.jsxs)("div",{className:"card-body",children:[Object(o.jsx)("h5",{className:"card-title",children:e.Title}),Object(o.jsxs)("p",{className:"card-text",id:"rating",children:[e.imdbRating," ",Object(o.jsx)("i",{className:"far fa-star"})]})]})]},t)}))})]})}),T=function(e){var t=e.token,c=e.setToken,r=Object(n.useState)(""),a=Object(i.a)(r,2),l=a[0],d=a[1],u=Object(n.useRef)(),b=Object(n.useState)(!1),f=Object(i.a)(b,2),O=f[0],h=f[1],g=Object(n.useRef)(),p=Object(j.g)().username,v=Object(n.useRef)(!1),N=Object(n.useRef)(),T=function(e){d(e.target.id)};return Object(n.useEffect)((function(){""!==t&&fetch("/user-data/".concat(p),{headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded",Authorization:"Bearer "+t}}).then((function(e){return e.json()})).then((function(e){var t=e.userGenres,c=e.userFilms;e.auth&&(u.current=t,g.current=c,h(!0))}))}),[t]),Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)(m,{token:t,setToken:c}),O?g.current.length>0?Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsxs)("div",{id:"filterGenres",onClick:function(){v.current?(v.current=!1,N.current.style.display="none"):(v.current=!0,N.current.style.display="block")},children:[Object(o.jsx)("i",{className:"fas fa-sort-down"})," Filter by genre"," ",Object(o.jsx)("i",{className:"fas fa-sort-down"})]}),Object(o.jsx)("div",{id:"allGenres",ref:N,children:Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{onClick:T,children:"All genres"},"0"),u.current.filter((function(e){return e!==l})).map((function(e,t){return Object(o.jsx)("li",{id:e,onClick:T,children:e},t+1)}))]})}),Object(o.jsx)("main",{children:Object(o.jsxs)(s.a.Fragment,{children:[Object(o.jsx)(y,{genres:u.current,currentGenre:l,setCurrentGenre:d}),Object(o.jsx)(k,{films:g.current,currentGenre:l})]})})]}):Object(o.jsx)("div",{id:"noFilm",children:Object(o.jsxs)("h1",{children:["you haven't ",Object(o.jsx)("span",{children:"voted"})," any movie yet."]})}):Object(o.jsxs)("div",{className:"lds-ellipsis",children:[Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{})]}),Object(o.jsx)(x,{})]})},R=(c(35),function(){return Object(o.jsx)("div",{className:"body-error404",children:Object(o.jsxs)("div",{className:"div-error404",children:[Object(o.jsx)("a",{href:"/",children:Object(o.jsx)("img",{src:"/img/logo2.jpg",id:"imgLogo",alt:""})}),Object(o.jsxs)("h1",{children:[Object(o.jsx)("i",{class:"fas fa-exclamation-triangle"})," ERROR 404"," ",Object(o.jsx)("i",{class:"fas fa-exclamation-triangle"})," ",Object(o.jsx)("br",{})," PAGE NOT FOUND"," "]}),Object(o.jsxs)("a",{href:"/",id:"homepageLink",children:[Object(o.jsx)("i",{class:"fas fa-home"})," BACK TO HOME PAGE"," "]})]})})}),C=function(){var e=Object(n.useState)(""),t=Object(i.a)(e,2),c=t[0],r=t[1];return Object(n.useEffect)((function(){return r(function(e){for(var t=e+"=",c=decodeURIComponent(document.cookie).split(";"),n=0;n<c.length;n++){for(var s=c[n];" "===s.charAt(0);)s=s.substring(1);if(0===s.indexOf(t))return s.substring(t.length,s.length)}return""}("jwt"))}),[]),Object(o.jsx)(s.a.Fragment,{children:Object(o.jsx)(l.a,{children:Object(o.jsxs)(j.c,{children:[Object(o.jsx)(j.a,{exact:!0,path:"/film/:title",children:Object(o.jsx)(p,{token:c,setToken:r})}),Object(o.jsx)(j.a,{exact:!0,path:"/user/:username",children:Object(o.jsx)(T,{token:c,setToken:r})}),Object(o.jsx)(j.a,{exact:!0,path:"/login",children:Object(o.jsx)(v,{setToken:r})}),Object(o.jsx)(j.a,{exact:!0,path:"/registration",children:Object(o.jsx)(N,{setToken:r})}),Object(o.jsx)(j.a,{exact:!0,path:"/",children:Object(o.jsx)(g,{token:c,setToken:r})}),Object(o.jsx)(j.a,{path:"/",children:Object(o.jsx)(R,{})})]})})})};a.a.render(Object(o.jsx)(s.a.StrictMode,{children:Object(o.jsx)(C,{})}),document.getElementById("root"))}},[[36,1,2]]]);
//# sourceMappingURL=main.60b964ef.chunk.js.map