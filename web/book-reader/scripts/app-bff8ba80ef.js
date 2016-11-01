!function(){"use strict";angular.module("sdaBookReader",["ngAnimate","ngCookies","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ngMaterial","trcBiblio","trcReln"])}(),function(){"use strict";function e(e){function t(t){return angular.isArray(t)&&(t=t[0]),t?e.compact([t.title,t.subtitle]).join(": "):""}return t}e.$inject=["_"],angular.module("sdaBookReader").filter("workTitle",e)}(),function(){"use strict";function e(e,t){var o=this;e.$watch("$ctrl.title",function(e){angular.isArray(e)&&(o.title=t.getTitle(e))})}e.$inject=["$scope","worksRepo"],angular.module("sdaBookReader").component("workTitle",{templateUrl:"app/components/work-title/work-title.html",bindings:{title:"<"},controller:e})}(),function(){"use strict";angular.module("sdaBookReader").component("workAuthors",{templateUrl:"app/components/work-authors/work-authors.html",bindings:{authors:"<"}})}(),function(){"use strict";function e(){function e(e,t,r){t===o&&e.slideUp(250,"easeInOutCubic",r)}function t(e,t,r){t===o&&e.hide().slideDown(250,"easeInOutCubic",r)}var o="ng-hide";return{beforeAddClass:e,removeClass:t}}angular.module("sdaBookReader").animation(".slide",e),jQuery.easing.easeInOutCubic=function(e,t,o,r,n){return(t/=n/2)<1?r/2*t*t*t+o:r/2*((t-=2)*t*t+2)+o}}(),function(){"use strict";angular.module("sdaBookReader").component("relationships",{templateUrl:"app/components/relationships/relationships.html",bindings:{relns:"<"}})}(),function(){"use strict";function e(e,t){function o(t){t.$watchGroup(["bookId","page"],function(o){var a=o[0],i=o[1],l=r({scheme:"https",host:"archive.org",path:["stream",a],query:{ui:"embed"},fragment:n(i?"page/"+i:"","mode/2up")});t.src=e.trustAsResourceUrl(l)})}function r(e){var o=t.defaults(t.clone(e)||{},{scheme:"http",query:{}});if(!o.host)throw new Error("host option must be provided");return t.isArray(o.path)&&(o.path=n.apply(null,o.path)),t.isObject(o.query)&&(o.query=a(o.query,o.querySep)),o.scheme+"://"+n(o.host,o.path)+(o.query?"?"+o.query:"")+(o.fragment?"#"+o.fragment:"")}function n(){return t.chain(arguments).map(function(e){return t.trim(e,"\r\n\t /")}).filter().join("/")}function a(e,o){return o=o||"&",t.chain(e).map(function(e,o){return o?(t.isArray(e)||(e=[e]),t.map(e,function(e){return o+(e?"="+e:"")})):[]}).flatten().filter().join(o)}var i={restrict:"E",template:'<iframe ng-src="{{src}}">',replace:!0,link:o,scope:{bookId:"=",page:"="}};return i}e.$inject=["$sce","_"],angular.module("sdaBookReader").directive("iaReader",e)}(),function(){"use strict";function e(e,o){function r(r){r.$watchGroup(["bookId","page"],function(n){var a=n[0],i=n[1],l={id:a,ui:"embed"};i&&(l.seq=i);var s=o.map(l,function(e,t){return t+"="+e}).join(";"),c=t+"?"+s;r.src=e.trustAsResourceUrl(c)})}var n={restrict:"E",template:'<iframe ng-src="{{src}}">',replace:!0,link:r,scope:{bookId:"=",page:"="}};return n}e.$inject=["$sce","_"];var t="https://babel.hathitrust.org/cgi/pt";angular.module("sdaBookReader").directive("hathitrustReader",e)}(),function(){"use strict";function e(){function e(e){angular.extend(o.options,e)}function t(e){return e.load(o.options)}t.$inject=["googleBooksScriptLoader"];var o={};return o.options={transport:"https",v:0,language:"en",preventLoad:!1},o.configure=e,o.$get=t,o}angular.module("sdaBookReader").provider("googleBooksApi",e)}(),function(){"use strict";function e(e,t,o,r){function n(e){return"auto"===e.transport?"//www.google.com/books/api.js?":e.transport+"://www.google.com/books/api.js?"}function a(e){var o=["transport","preventLoad","randomizedFunctionName"],a=r.map(r.omit(e,o),function(e,t){return t+"="+e});c?t.remove("#"+c):c="gbooks_load_"+Math.round(1e3*Math.random()),a=a.join("&");var i='<script id="'+c+'" type="text/javascript" src="'+n(e)+a+'"></script>';t.find("body").append(i)}function i(){return angular.isDefined(e.google)&&angular.isDefined(e.google.books)}function l(t){var r=o.defer();if(i())return r.resolve(e.google.books),r.promise;var n="onGoogleBooksReady"+Math.round(1e3*Math.random());return t.callback=n,e[n]=function(){e[n]=null,r.resolve(e.google.books)},t.preventLoad||a(t),u=t,u.randomizedFunctionName=n,r.promise}function s(){var t=u;i()?e[t.randomizedFunctionName]&&e[t.randomizedFunctionName]():a(t)}var c=void 0,u=void 0;return{load:l,manualLoad:s}}e.$inject=["$window","$document","$q","_"],angular.module("sdaBookReader").factory("googleBooksScriptLoader",e)}(),function(){"use strict";function e(e,t){function o(o,r){t.load(),e.then(function(e){var t=new e.DefaultViewer(r.get(0));o.$watch("bookId",function(e){t.load(e)}),o.$on("resize",function(){t.resize()})})}var r={restrict:"E",link:o,scope:{bookId:"="}};return r}e.$inject=["googleBooksApi","googleBooksApiManualLoader"],angular.module("sdaBookReader").directive("googleBookReader",e)}(),function(){"use strict";function e(e){function t(){e.manualLoad()}var o={};return o.load=t,o}e.$inject=["googleBooksScriptLoader"],angular.module("sdaBookReader").service("googleBooksApiManualLoader",e)}(),function(){"use strict";function e(e){var o=this;e.$watch("$ctrl.content",function(e){o.longEnough=!e||e.length>t})}e.$inject=["$scope"],angular.module("sdaBookReader").component("collapsibleSummary",{templateUrl:"app/components/collapsible-summary/collapsible-summary.html",bindings:{content:"<"},controller:e});var t=500}(),function(){"use strict";angular.module("sdaBookReader").component("citation",{templateUrl:"app/components/citation/citation.html",bindings:{authors:"<",title:"<",pubInfo:"<",edition:"<",volume:"<"}})}(),function(){"use strict";function e(e,t,o,r,n){function a(){i.lockSidebar=!i.lockSidebar,e(function(){t.$broadcast("resize")},500)}var i=this;i.copyRef=o,i.work=r,i.relns=n,i.lockSidebar=!0,i.toggleSidenav=a}e.$inject=["$timeout","$rootScope","copyRef","work","relns"],angular.module("sdaBookReader").controller("BookReaderController",e)}(),function(){"use strict";function e(e){e.debug("runBlock end")}e.$inject=["$log"],angular.module("sdaBookReader").run(e)}(),function(){"use strict";function e(e,t){e.state("home",{url:"/",templateUrl:"app/layout.html"}).state("read",{url:"/:workId/:copyId?editionId&volumeId",templateUrl:"app/book-reader/book-reader.html",controller:"BookReaderController",controllerAs:"vm",resolve:{copyRef:["$stateParams","worksRepo",function(e,t){"ngInject";var o=t.getDigitalCopy(e.copyId,e.workId,e.editionId,e.volumeId);return o.$promise}],work:["$stateParams","worksRepo",function(e,t){"ngInject";var o=t.get(e.workId);return o.$promise}],relns:["$stateParams","relnRepo","worksRepo",function(e,t,o){"ngInject";var r="works/"+e.workId,n=t.search(r);return n.$promise.then(function(){var e=t.normalizeRelationships(n,r,o);return e.$promise}).catch(function(){return[]})}]}}),t.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("sdaBookReader").config(e)}(),function(){"use strict";angular.module("sdaBookReader")}(),function(){"use strict";function e(e,t,o,r,n){e.debugEnabled(!0),o.url="/api/catalog/works",r.url="/api/catalog/relationships",n.configure({preventLoad:!0}),t.definePalette("darkBrown",{50:"#595c59",100:"#4c4f4c",200:"#404240",300:"#333533",400:"#272827",500:"#1a1b1a",600:"#0d0e0d",700:"#010101",800:"#000000",900:"#000000",A100:"#e0f0e0",A200:"#565956",A400:"#7e837e",A700:"#000000",contrastDefaultColor:"light",contrastDarkColors:["A100"]}),t.definePalette("copper",{50:"#d4b190",100:"#cca47e",200:"#c5976b",300:"#be8a59",400:"#b67e47",500:"#a47140",600:"#926439",700:"#7f5832",800:"#6d4b2b",900:"#5b3e23",A100:"#dcc3ab",A200:"#a47140",A400:"#48321c",A700:"#272927",contrastDefaultColor:"light",contrastDarkColors:["50","100","200","A100"]}),t.theme("default").primaryPalette("darkBrown").accentPalette("copper")}e.$inject=["$logProvider","$mdThemingProvider","worksRepoProvider","relnRepoProvider","googleBooksApiProvider"],angular.module("sdaBookReader").config(e)}(),angular.module("sdaBookReader").run(["$templateCache",function(e){e.put("app/layout.html",'<md-toolbar class=layout-navbar><div class=md-toolbar-tools><a class=logo href=/ layout=column layout-align="center center"><img src=/assets/images/sda-logo-light.png alt=SDA flex=nogrow></a><h1>Book Reader</h1></div></md-toolbar><div layout=column layout-align="center center" flex layout-fill ui-view><div class=md-display-1>This app is meant to receive parameters to locate a digital copy, but none were provided.<br></div></div>'),e.put("app/book-reader/book-reader.html",'<md-toolbar class=layout-navbar><div class=md-toolbar-tools><md-button class="md-accent md-icon-button" ng-click=vm.toggleSidenav($event)><md-icon>menu</md-icon></md-button><a class=logo href=/ ><img src=/assets/images/sda-logo-light.png alt=SDA></a></div></md-toolbar><main layout=row layout-align=center flex><md-sidenav class=book-info md-component-id=left class=md-sidenav-left md-is-locked-open=vm.lockSidebar layout=column layout-padding><div><h1 class="md-title title"><work-title title=vm.work.titles></work-title></h1><p class=by-line>by<work-authors authors=vm.work.authors></work-authors></p></div><collapsible-summary ng-if=vm.work.summary content=vm.work.summary></collapsible-summary><div flex></div><div ng-if="vm.relns.length > 0"><h2>Related Books</h2><relationships relns=vm.relns></relationships></div></md-sidenav><div layout=column flex><div ng-switch=vm.copyRef.type layout=column layout-padding flex><hathitrust-reader ng-switch-when=hathitrust book-id=vm.copyRef.properties.htid page=vm.copyRef.properties.seq flex></hathitrust-reader><ia-reader ng-switch-when=internetarchive book-id=vm.copyRef.properties.id page=vm.copyRef.properties.seq flex></ia-reader><google-book-reader ng-switch-when=googlebooks book-id=vm.copyRef.properties.id flex></google-book-reader><div ng-switch-default layout=column layout-align="center center" flex><div class=md-display-1 ng-if=vm.loading>Sorry. We were unable to load a book reader for that resource.</div><div class=md-display-1 ng-if=!vm.loading layout=column flex layout-align="center center"><div>Loading book reader&hellip;</div><md-progress-circular md-mode=indeterminate></md-progress-circular></div></div></div></div></main>'),e.put("app/components/citation/citation.html",'<work-authors class=authors authors=$ctrl.authors></work-authors><work-title class=title title=$ctrl.title></work-title><span class=edition ng-if=$ctrl.edition>{{$ctrl.edition}}.</span> <span class=volume ng-if=$ctrl.volume>{{$ctrl.volume}}.</span> <span class=pubinfo ng-if="$ctrl.pubInfo.place || $ctrl.pubInfo.publisher || $ctrl.pubInfo.date.description">(<span class=place ng-if=$ctrl.pubInfo.place>{{$ctrl.pubInfo.place}},</span> <span class=publisher ng-if=$ctrl.pubInfo.publisher>{{$ctrl.pubInfo.publisher}}.</span> <time class=date ng-if=$ctrl.pubInfo.date.description datetime={{$ctrl.pubInfo.date.calendar}}>{{$ctrl.pubInfo.date.description}}</time>)</span>'),e.put("app/components/collapsible-summary/collapsible-summary.html",'<section class=summary ng-bind-html=$ctrl.content ng-class="{collapsed: ($ctrl.longEnough && !$ctrl.summaryExpanded)}" ng-click="$ctrl.summaryExpanded = true"></section><div layout=row layout-align="center center" ng-if=$ctrl.longEnough><md-button ng-click="$ctrl.summaryExpanded = !$ctrl.summaryExpanded" class=md-raised>Show {{$ctrl.summaryExpanded ? \'Less\' : \'More\'}}</md-button></div>'),e.put("app/components/relationships/relationships.html",'<div ng-repeat="group in $ctrl.relns"><md-subheader class="md-no-sticky collapse-handle" ng-click="group.visible = !group.visible"><md-icon>{{group.visible ? \'expand_more\' : \'keyboard_arrow_right\'}}</md-icon>{{group.label}}</md-subheader><md-list class=slide ng-show=group.visible><div ng-repeat="reln in group.relationships"><md-list-item ng-repeat="entity in reln.entities" ng-href=/research/#/books/{{entity.refParams.workId}} aria-label="{{entity.entity.titles | workTitle}}"><citation authors=entity.entity.authors title=entity.entity.titles pub-info=entity.entity.publicationInfo edition=entity.entity.editionName volume=entity.entity.volumeNumber></citation></md-list-item></div></md-list></div>'),e.put("app/components/work-authors/work-authors.html","<span class=author ng-repeat=\"author in $ctrl.authors\"><a ng-href=/research/#/people/{{author.authorId}}>{{author.firstName}} {{author.lastName}}</a>{{$last ? '' : ',' }}</span>"),e.put("app/components/work-title/work-title.html","<span class=title ng-if=$ctrl.title.title>{{$ctrl.title.title}}</span>{{ $ctrl.title.title && $ctrl.title.subtitle ? ': ' : ''}}<span class=subtitle ng-if=$ctrl.title.subtitle>{{$ctrl.title.subtitle}}</span>")}]);