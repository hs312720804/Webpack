!function(e){function t(t){for(var r,o,u=t[0],i=t[1],a=0,l=[];a<u.length;a++)o=u[a],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&l.push(n[o][0]),n[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(c&&c(t);l.length;)l.shift()()}var r={},n={1:0};function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.e=function(e){var t=[],r=n[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,o){r=n[e]=[t,o]}));t.push(r[2]=u);var i,a=document.createElement("script");a.charset="utf-8",a.timeout=120,o.nc&&a.setAttribute("nonce",o.nc),a.src=function(e){return o.p+"js/"+({0:"hahha"}[e]||e)+"."+{0:"c7da04f2a0"}[e]+".js"}(e);var c=new Error;i=function(t){a.onerror=a.onload=null,clearTimeout(l);var r=n[e];if(0!==r){if(r){var o=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+o+": "+u+")",c.name="ChunkLoadError",c.type=o,c.request=u,r[1](c)}n[e]=void 0}};var l=setTimeout((function(){i({type:"timeout",target:a})}),12e4);a.onerror=a.onload=i,document.head.appendChild(a)}return Promise.all(t)},o.m=e,o.c=r,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o.oe=function(e){throw console.error(e),e};var u=window.webpackJsonp=window.webpackJsonp||[],i=u.push.bind(u);u.push=t,u=u.slice();for(var a=0;a<u.length;a++)t(u[a]);var c=i;o(o.s=0)}([function(e,t,r){r.e(0).then(r.bind(null,1)).then((e,t)=>{console.log(e)}).catch(e=>{}),console.log("reduce sum--\x3e"+function(...e){return e.reduce((e,t)=>e+t,0)}(1,2,4,5,6))}]);