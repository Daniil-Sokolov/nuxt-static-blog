webpackJsonp([2],{179:function(t,a,n){"use strict";function e(t){n(362)}Object.defineProperty(a,"__esModule",{value:!0});var i=n(364),A=n(365),s=n(20),r=e,d=s(i.a,A.a,r,"data-v-033dfa02",null);a.default=d.exports},362:function(t,a,n){var e=n(363);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n(15)("b175711c",e,!0)},363:function(t,a,n){a=t.exports=n(14)(!0),a.push([t.i,"h1[data-v-033dfa02]{display:block;text-align:center;font-size:50px;font-size:8vw;font-weight:700;color:#35495e;letter-spacing:1px}@media (min-width:1100px){h1[data-v-033dfa02]{font-size:80px}}h2[data-v-033dfa02]{color:#35495e;text-align:center}.description[data-v-033dfa02]{max-width:400px;margin:0 auto 60px;text-align:center}.title[data-v-033dfa02]{text-align:center;margin:10px 0;font-size:20px}.title a[data-v-033dfa02]{display:inline-block}.article[data-v-033dfa02]{display:inline-block;width:33%;vertical-align:top;padding:10px 15px}.article p[data-v-033dfa02]{text-align:center;max-width:350px;margin:auto}@media (max-width:780px){.article[data-v-033dfa02]{width:50%}}@media (max-width:580px){.article[data-v-033dfa02]{width:100%}h1[data-v-033dfa02]{font-size:40px}}","",{version:3,sources:["/home/anon/sofware/blog/vue/homepage/pages/_category/index.vue"],names:[],mappings:"AACA,oBACE,cAAe,AACf,kBAAmB,AACnB,eAAgB,AAChB,cAAe,AACf,gBAAkB,AAClB,cAAe,AACf,kBAAoB,CACrB,AACD,0BACA,oBACI,cAAgB,CACnB,CACA,AACD,oBACE,cAAe,AACf,iBAAkB,CACnB,AACD,8BACE,gBAAiB,AACjB,mBAAwB,AACxB,iBAAmB,CACpB,AACD,wBACE,kBAAmB,AACnB,cAAc,AACd,cAAgB,CACjB,AACD,0BACE,oBAAsB,CACvB,AACD,0BACE,qBAAsB,AACtB,UAAW,AACX,mBAAoB,AACpB,iBAAmB,CACpB,AACD,4BACE,kBAAmB,AACnB,gBAAiB,AACjB,WAAY,CACb,AACD,yBACA,0BACI,SAAW,CACd,CACA,AACD,yBACA,0BACI,UAAY,CACf,AACD,oBACI,cAAgB,CACnB,CACA",file:"index.vue",sourcesContent:["\nh1[data-v-033dfa02]{\n  display: block;\n  text-align: center;\n  font-size: 50px;\n  font-size: 8vw;\n  font-weight: bold;\n  color: #35495e;\n  letter-spacing: 1px;\n}\n@media (min-width: 1100px){\nh1[data-v-033dfa02]{\n    font-size: 80px;\n}\n}\nh2[data-v-033dfa02]{\n  color: #35495e;\n  text-align: center\n}\n.description[data-v-033dfa02]{\n  max-width: 400px;\n  margin:0 auto 60px auto;\n  text-align: center;\n}\n.title[data-v-033dfa02]{\n  text-align: center;\n  margin:10px 0;\n  font-size: 20px;\n}\n.title a[data-v-033dfa02]{\n  display: inline-block;\n}\n.article[data-v-033dfa02]{\n  display: inline-block;\n  width: 33%;\n  vertical-align: top;\n  padding: 10px 15px;\n}\n.article p[data-v-033dfa02]{\n  text-align: center;\n  max-width: 350px;\n  margin:auto;\n}\n@media (max-width: 780px){\n.article[data-v-033dfa02]{\n    width: 50%;\n}\n}\n@media (max-width: 580px){\n.article[data-v-033dfa02]{\n    width: 100%;\n}\nh1[data-v-033dfa02]{\n    font-size: 40px;\n}\n}\n"],sourceRoot:""}])},364:function(t,a,n){"use strict";var e=n(29),i=n.n(e),A=n(30),s=n.n(A);a.a={transition:function(t,a){return a&&"index"!==a.name?"index"===t.name?"slide-up":"slide-down":"slide-up"},asyncData:function(){function t(t){return a.apply(this,arguments)}var a=s()(i.a.mark(function t(a){var n,e,A;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=a.params.category,e=a.store.state.posts.filter(function(t){return t.category.slug===n}),A=e[0].category,t.abrupt("return",{category:A,posts:e});case 4:case"end":return t.stop()}},t,this)}));return t}()}},365:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"transition"},[n("div",{staticClass:"backlink"},[n("nuxt-link",{staticClass:"novisited",attrs:{to:"/"}},[t._v("Back home")])],1),n("h1",{staticClass:"big"},[t._v(t._s(t.category.name))]),n("p",{staticClass:"description"},[t._v(t._s(t.category.description))]),n("section",[n("hr"),t._l(t.posts,function(a){return n("div",{staticClass:"article transition"},[n("div",{staticClass:"title"},[n("nuxt-link",{attrs:{to:"/"+a.category.slug+"/"+a.slug}},[n("h3",[t._v(t._s(a.title))])])],1),n("p",[t._v(t._s(a.subtitle))])])})],2)])},i=[],A={render:e,staticRenderFns:i};a.a=A}});
//# sourceMappingURL=2.nuxt.bundle.04576f06c3b469d3b906.js.map