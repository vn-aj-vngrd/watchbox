if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>n(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/0lK-lVUEphKMeWlNoLX-5/_buildManifest.js",revision:"c4b076513aedafe86240b7826b43f19e"},{url:"/_next/static/0lK-lVUEphKMeWlNoLX-5/_ssgManifest.js",revision:"5352cb582146311d1540f6075d1f265e"},{url:"/_next/static/chunks/281-0723bc54fd31ff67.js",revision:"0723bc54fd31ff67"},{url:"/_next/static/chunks/466-b2c08d5806b17e17.js",revision:"b2c08d5806b17e17"},{url:"/_next/static/chunks/565-a788a29111b1a303.js",revision:"a788a29111b1a303"},{url:"/_next/static/chunks/75fc9c18-4275c2966b1879ef.js",revision:"4275c2966b1879ef"},{url:"/_next/static/chunks/83-17a02a945b6c1db6.js",revision:"17a02a945b6c1db6"},{url:"/_next/static/chunks/878-7e212ad1f2fbd654.js",revision:"7e212ad1f2fbd654"},{url:"/_next/static/chunks/framework-9b5d6ec4444c80fa.js",revision:"9b5d6ec4444c80fa"},{url:"/_next/static/chunks/main-f328696cba0f1db2.js",revision:"f328696cba0f1db2"},{url:"/_next/static/chunks/pages/404-c84f498a0f7ade61.js",revision:"c84f498a0f7ade61"},{url:"/_next/static/chunks/pages/500-1796d646acf9dc7b.js",revision:"1796d646acf9dc7b"},{url:"/_next/static/chunks/pages/_app-db89a3271cb608c7.js",revision:"db89a3271cb608c7"},{url:"/_next/static/chunks/pages/_error-7397496ca01950b1.js",revision:"7397496ca01950b1"},{url:"/_next/static/chunks/pages/account-4655cc30de6a97f2.js",revision:"4655cc30de6a97f2"},{url:"/_next/static/chunks/pages/auth/error-865ac016e80d9e60.js",revision:"865ac016e80d9e60"},{url:"/_next/static/chunks/pages/auth/newuser-1dae96e12b06aef3.js",revision:"1dae96e12b06aef3"},{url:"/_next/static/chunks/pages/auth/signin-569fab7376f37657.js",revision:"569fab7376f37657"},{url:"/_next/static/chunks/pages/auth/verifyrequest-09dbc3181da5cf9b.js",revision:"09dbc3181da5cf9b"},{url:"/_next/static/chunks/pages/box/%5Bid%5D-9e3b9e2a25c50ae3.js",revision:"9e3b9e2a25c50ae3"},{url:"/_next/static/chunks/pages/box/entry/%5Bid%5D-6f3986a853cc539a.js",revision:"6f3986a853cc539a"},{url:"/_next/static/chunks/pages/index-8cf5cfce2ca79128.js",revision:"8cf5cfce2ca79128"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-246c5233b889db27.js",revision:"246c5233b889db27"},{url:"/_next/static/css/4c5b8306b393f580.css",revision:"4c5b8306b393f580"},{url:"/favicon.ico",revision:"28f1e2ab4779eed630c7858dc017af02"},{url:"/favicon/android-chrome-192x192.png",revision:"26b95fb874c9c0a1ea159022137b8246"},{url:"/favicon/android-chrome-512x512.png",revision:"77362479e29fcf0a5f945dceb2486958"},{url:"/favicon/apple-touch-icon.png",revision:"2b7c17c472e7e59649a1b1608c43e39a"},{url:"/favicon/favicon-16x16.png",revision:"5dad09e6460e9986c82dd9f9bb6e921a"},{url:"/favicon/favicon-32x32.png",revision:"7f93f415762692d8c9a100420ca625a2"},{url:"/favicon/favicon.ico",revision:"28f1e2ab4779eed630c7858dc017af02"},{url:"/favicon/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/favicon/watchbox.png",revision:"399bac0987d724ed431d4644817a998b"},{url:"/manifest.json",revision:"0f7842ab64be4049d380e40a64b3e3df"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
