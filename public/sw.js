if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>n(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/235.7f27d4641689c962.js",revision:"7f27d4641689c962"},{url:"/_next/static/chunks/283-e4a48e546d8e0c5f.js",revision:"e4a48e546d8e0c5f"},{url:"/_next/static/chunks/363-cd4cbbb5d32cc55b.js",revision:"cd4cbbb5d32cc55b"},{url:"/_next/static/chunks/41-1f50e58d32c0b65a.js",revision:"1f50e58d32c0b65a"},{url:"/_next/static/chunks/517-b11db0183cc1852d.js",revision:"b11db0183cc1852d"},{url:"/_next/static/chunks/730-14152de288c57792.js",revision:"14152de288c57792"},{url:"/_next/static/chunks/914-0054fe6a9144c0da.js",revision:"0054fe6a9144c0da"},{url:"/_next/static/chunks/framework-af0f4a194372e349.js",revision:"af0f4a194372e349"},{url:"/_next/static/chunks/main-3816f49d376c3b2c.js",revision:"3816f49d376c3b2c"},{url:"/_next/static/chunks/pages/404-4f4f7b35588cfbdf.js",revision:"4f4f7b35588cfbdf"},{url:"/_next/static/chunks/pages/500-7997c6336d3e551e.js",revision:"7997c6336d3e551e"},{url:"/_next/static/chunks/pages/_app-9558588a229267cc.js",revision:"9558588a229267cc"},{url:"/_next/static/chunks/pages/_error-19439e0d668ff289.js",revision:"19439e0d668ff289"},{url:"/_next/static/chunks/pages/account-5a068ba498e210ae.js",revision:"5a068ba498e210ae"},{url:"/_next/static/chunks/pages/auth/error-7a8804fb87dca4ea.js",revision:"7a8804fb87dca4ea"},{url:"/_next/static/chunks/pages/auth/newuser-9efa4ec871585e69.js",revision:"9efa4ec871585e69"},{url:"/_next/static/chunks/pages/auth/signin-e7cf11f0f45309b4.js",revision:"e7cf11f0f45309b4"},{url:"/_next/static/chunks/pages/auth/verifyrequest-100269c60fbed4b9.js",revision:"100269c60fbed4b9"},{url:"/_next/static/chunks/pages/box/%5Bid%5D-fd596a1af6891f96.js",revision:"fd596a1af6891f96"},{url:"/_next/static/chunks/pages/box/entry/%5Bid%5D-c9aff07fa26d8636.js",revision:"c9aff07fa26d8636"},{url:"/_next/static/chunks/pages/index-561d2cb903b63cf2.js",revision:"561d2cb903b63cf2"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-a2b965595ab2a9a5.js",revision:"a2b965595ab2a9a5"},{url:"/_next/static/css/0890a8d73f13bc79.css",revision:"0890a8d73f13bc79"},{url:"/_next/static/css/c3261747c0d1508c.css",revision:"c3261747c0d1508c"},{url:"/_next/static/mIqLykYtuDZWvWuENyJe3/_buildManifest.js",revision:"f3a0fbabc500f20a4b3ea56cac989980"},{url:"/_next/static/mIqLykYtuDZWvWuENyJe3/_ssgManifest.js",revision:"5352cb582146311d1540f6075d1f265e"},{url:"/favicon.ico",revision:"28f1e2ab4779eed630c7858dc017af02"},{url:"/favicon/android-chrome-192x192.png",revision:"26b95fb874c9c0a1ea159022137b8246"},{url:"/favicon/android-chrome-512x512.png",revision:"77362479e29fcf0a5f945dceb2486958"},{url:"/favicon/apple-touch-icon.png",revision:"2b7c17c472e7e59649a1b1608c43e39a"},{url:"/favicon/favicon-16x16.png",revision:"5dad09e6460e9986c82dd9f9bb6e921a"},{url:"/favicon/favicon-32x32.png",revision:"7f93f415762692d8c9a100420ca625a2"},{url:"/favicon/favicon.ico",revision:"28f1e2ab4779eed630c7858dc017af02"},{url:"/favicon/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/manifest.json",revision:"0f7842ab64be4049d380e40a64b3e3df"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
