(this["webpackJsonprocket-math"]=this["webpackJsonprocket-math"]||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(1),s=n.n(r),i=n(4),a=n.n(i),u=(n(10),n(2));n.p,n(11);var o=function(){var e=Object(r.useState)(!1),t=Object(u.a)(e,2),n=t[0],s=t[1],i=Object(r.useState)(!0),a=Object(u.a)(i,2),o=(a[0],a[1],Object(r.useState)(9)),l=Object(u.a)(o,2),j=l[0],b=l[1],d=Object(r.useState)(j.toString()),f=Object(u.a)(d,2),O=f[0],h=f[1],m=Object(r.useState)(!1),x=Object(u.a)(m,2),v=x[0],p=x[1],g=Object(r.useState)(null),S=Object(u.a)(g,2),y=S[0],w=S[1],C=Object(r.useState)(!1),I=Object(u.a)(C,2),T=I[0],k=I[1],M=Object(r.useState)(0),z=Object(u.a)(M,2),A=z[0],N=z[1],D=Object(r.useState)(0),F=Object(u.a)(D,2),E=F[0],R=F[1],B=function(){return e=j,Math.floor(Math.random()*Math.floor(e))+1;var e},J=function(e){return e?function(){var e=B(),t=B(),n=new Set;for(n.add(e+t);n.size<4;)n.add(B()+t);var c=Array.from(n);return c.sort((function(e,t){return e-t})),{number1:e,number2:t,answers:c}}():function(){var e=B(),t=B(),n=new Set;for(n.add(e*t);n.size<4;)n.add(B()*t);var c=Array.from(n);return c.sort((function(e,t){return e-t})),{number1:e,number2:t,answers:c}}()},L=Object(r.useState)((function(){return J()})),P=Object(u.a)(L,2),W=P[0],q=W.number1,X=W.number2,Y=W.answers,G=P[1],H=Object(r.useState)(0),K=Object(u.a)(H,2),Q=K[0],U=K[1],V=Object(r.useRef)();Object(r.useEffect)((function(){Q<=0||(V.current=setTimeout((function(){U(Q-1)}),1e3))}),[Q]);var Z=Object(r.useState)(),$=Object(u.a)(Z,2),_=$[0],ee=$[1],te=Object(r.useRef)(!1),ne=Object(r.useRef)(null);Object(r.useEffect)((function(){}),[]);var ce=Q-60;return Object(c.jsxs)("div",{children:[!Q&&Object(c.jsxs)("div",{className:"intro",children:[Object(c.jsxs)("div",{children:[Object(c.jsx)("label",{children:"Max number:"}),Object(c.jsx)("input",{type:"number",value:O,min:2,onChange:function(e){h(e.target.value),b(parseInt(e.target.value,10)>2?parseInt(e.target.value,10):9)}}),_&&Object(c.jsx)("div",{style:{color:"red"},children:_})]}),Object(c.jsx)("button",{style:{fontSize:20},onClick:function(){parseInt(O)>=2?(ee(""),h(j.toString()),p(!0),Q&&clearTimeout(V.current),G(J(!0)),R(0),N(0),U(63),s(!0)):ee("Max number must be at least 2")},children:"Addition test"}),Object(c.jsx)("button",{style:{fontSize:20},onClick:function(){parseInt(O)>=2?(ee(""),h(j.toString()),p(!1),Q&&clearTimeout(V.current),G(J(!1)),R(0),N(0),U(63),s(!0)):ee("Max number must be at least 2")},children:"Multiplication test"}),Object(c.jsx)("div",{children:n&&!Q?"You got ".concat(A," right!"):""})]}),ce>0&&Object(c.jsx)("div",{className:"countdown",children:ce}),ce<=0&&Q>0&&Object(c.jsxs)("div",{className:"App".concat(ce>0?" app-opaque":""),children:[Object(c.jsxs)("div",{style:{flex:"1",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},children:[Object(c.jsx)("div",{children:Object(c.jsxs)("span",{children:["Time left: ",Q,"s"]})}),Object(c.jsxs)("div",{style:{fontWeight:"bold",fontSize:"60px",flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:[!v&&Object(c.jsxs)("span",{children:[q," X ",X]}),v&&Object(c.jsxs)("span",{children:[q," + ",X]})]})]}),Object(c.jsx)("div",{className:"Answer",children:Y.map((function(e){var t=null!==y&&e===(v?q+X:q*X),n=y===e;return Object(c.jsx)("div",{className:"AnswerDiv",children:Object(c.jsx)("button",{style:{background:t?"lightgreen":n?"red":"lightgrey"},onClick:function(){return function(e){Q&&!te.current&&(e===(v?q+X:q*X)?(N(A+1),G(J(v)),k(!0),clearTimeout(ne.current),ne.current=setTimeout((function(){k(!1)}),1e3)):(te.current=!0,R(E+1),w(e),setTimeout((function(){w(null),G(J(v)),te.current=!1}),2e3)))}(e)},children:e})})}))}),Object(c.jsxs)("div",{style:{flex:"1",display:"flex",flexDirection:"column",justifyContent:"space-evenly",alignItems:"center",fontSize:"60px"},children:[Object(c.jsxs)("div",{children:["Correct:"," ",Object(c.jsx)("span",{className:"correctanswer".concat(T?" flashgreen":""),children:A})]}),Object(c.jsxs)("div",{children:["Wrong: ",E]})]})]})]})},l=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),s(e),i(e)}))};a.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(o,{})}),document.getElementById("root")),l()}},[[12,1,2]]]);
//# sourceMappingURL=main.cf824703.chunk.js.map