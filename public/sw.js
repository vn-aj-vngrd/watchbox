if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let a={};const r=e=>n(e,t),o={module:{uri:t},exports:a,require:r};s[t]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(i(...e),a)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/207-08890b8dd317d5b3.js",revision:"08890b8dd317d5b3"},{url:"/_next/static/chunks/241-8697780f08d31e3f.js",revision:"8697780f08d31e3f"},{url:"/_next/static/chunks/257-85748a58432cae53.js",revision:"85748a58432cae53"},{url:"/_next/static/chunks/281-0723bc54fd31ff67.js",revision:"0723bc54fd31ff67"},{url:"/_next/static/chunks/75fc9c18-4275c2966b1879ef.js",revision:"4275c2966b1879ef"},{url:"/_next/static/chunks/846-089eb9427ba2068b.js",revision:"089eb9427ba2068b"},{url:"/_next/static/chunks/878-7e212ad1f2fbd654.js",revision:"7e212ad1f2fbd654"},{url:"/_next/static/chunks/899-5679c1937917be33.js",revision:"5679c1937917be33"},{url:"/_next/static/chunks/framework-9b5d6ec4444c80fa.js",revision:"9b5d6ec4444c80fa"},{url:"/_next/static/chunks/main-f328696cba0f1db2.js",revision:"f328696cba0f1db2"},{url:"/_next/static/chunks/pages/404-9a5d871e674717ff.js",revision:"9a5d871e674717ff"},{url:"/_next/static/chunks/pages/500-04ed0f8025b02bc0.js",revision:"04ed0f8025b02bc0"},{url:"/_next/static/chunks/pages/_app-c0d2012faea301e1.js",revision:"c0d2012faea301e1"},{url:"/_next/static/chunks/pages/_error-7397496ca01950b1.js",revision:"7397496ca01950b1"},{url:"/_next/static/chunks/pages/account-8f4dc725ee2108cd.js",revision:"8f4dc725ee2108cd"},{url:"/_next/static/chunks/pages/auth/error-911202f3d7be5f9c.js",revision:"911202f3d7be5f9c"},{url:"/_next/static/chunks/pages/auth/newuser-368bc194f4b92357.js",revision:"368bc194f4b92357"},{url:"/_next/static/chunks/pages/auth/signin-d2dbcc090782b36e.js",revision:"d2dbcc090782b36e"},{url:"/_next/static/chunks/pages/auth/verifyrequest-be8145bfa4d28953.js",revision:"be8145bfa4d28953"},{url:"/_next/static/chunks/pages/box/%5Bid%5D-394c10c3c415ddcc.js",revision:"394c10c3c415ddcc"},{url:"/_next/static/chunks/pages/box/entry/%5Bid%5D-e41406f7d936d3fe.js",revision:"e41406f7d936d3fe"},{url:"/_next/static/chunks/pages/index-6027479de7042dfe.js",revision:"6027479de7042dfe"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b0d7587551f18e93.js",revision:"b0d7587551f18e93"},{url:"/_next/static/css/f56986ab523d785e.css",revision:"f56986ab523d785e"},{url:"/_next/static/tbteK3iLchUSUmZ5bQc1Q/_buildManifest.js",revision:"ed4cddfb0f79a4cdf3e446e5e04705e6"},{url:"/_next/static/tbteK3iLchUSUmZ5bQc1Q/_ssgManifest.js",revision:"5352cb582146311d1540f6075d1f265e"},{url:"/favicon.ico",revision:"28f1e2ab4779eed630c7858dc017af02"},{url:"/favicon/android-chrome-192x192.png",revision:"26b95fb874c9c0a1ea159022137b8246"},{url:"/favicon/android-chrome-512x512.png",revision:"77362479e29fcf0a5f945dceb2486958"},{url:"/favicon/apple-touch-icon.png",revision:"2b7c17c472e7e59649a1b1608c43e39a"},{url:"/favicon/favicon-16x16.png",revision:"5dad09e6460e9986c82dd9f9bb6e921a"},{url:"/favicon/favicon-32x32.png",revision:"7f93f415762692d8c9a100420ca625a2"},{url:"/favicon/favicon.ico",revision:"28f1e2ab4779eed630c7858dc017af02"},{url:"/favicon/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/favicon/watchbox.png",revision:"399bac0987d724ed431d4644817a998b"},{url:"/manifest.json",revision:"0f7842ab64be4049d380e40a64b3e3df"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
