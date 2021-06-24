(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/adimola/Projects/Angular/notify-articles/client/src/main.ts */"zUnb");


/***/ }),

/***/ "72Wa":
/*!***********************************************!*\
  !*** ./src/app/core/intersection-observer.ts ***!
  \***********************************************/
/*! exports provided: IntersectionStatus, fromIntersectionObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntersectionStatus", function() { return IntersectionStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromIntersectionObserver", function() { return fromIntersectionObserver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");



var IntersectionStatus;
(function (IntersectionStatus) {
    IntersectionStatus["Visible"] = "Visible";
    IntersectionStatus["Pending"] = "Pending";
    IntersectionStatus["NotVisible"] = "NotVisible";
})(IntersectionStatus || (IntersectionStatus = {}));
const fromIntersectionObserver = (element, config, debounce = 0) => new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"]((subscriber) => {
    const subject$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (isIntersecting(entry)) {
                subject$.next({ entry, observer });
            }
        });
    }, config);
    subject$.subscribe(() => {
        subscriber.next(IntersectionStatus.Pending);
    });
    subject$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["debounceTime"])(debounce), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(Boolean))
        .subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        const isEntryVisible = yield isVisible(res.entry.target);
        if (isEntryVisible) {
            subscriber.next(IntersectionStatus.Visible);
            res.observer.unobserve(res.entry.target);
        }
        else {
            subscriber.next(IntersectionStatus.NotVisible);
        }
    }));
    intersectionObserver.observe(element);
    return {
        unsubscribe() {
            intersectionObserver.disconnect();
            subject$.unsubscribe();
        },
    };
});
function isVisible(element) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            const observer = new IntersectionObserver(([entry]) => {
                resolve(entry.isIntersecting);
                observer.disconnect();
            });
            observer.observe(element);
        });
    });
}
function isIntersecting(entry) {
    return entry.isIntersecting || entry.intersectionRatio > 0;
}


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "QVKM":
/*!**************************************!*\
  !*** ./src/app/core/data.service.ts ***!
  \**************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class DataService {
    constructor(http) {
        this.http = http;
        this.API_URL = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production ? '' : 'http://localhost:3001/api/v1/';
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
                'Content-Type': 'application/json',
                Accept: '*/*',
            }),
        };
    }
    getSources() {
        return this.http
            .get(this.API_URL + 'sources', this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => console.log('after sharing')));
    }
}
DataService.ɵfac = function DataService_Factory(t) { return new (t || DataService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
DataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: DataService, factory: DataService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var actioncable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! actioncable */ "9e53");
/* harmony import */ var actioncable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(actioncable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _notification_header_notification_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notification-header/notification-header.component */ "bins");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _core_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/data.service */ "QVKM");
/* harmony import */ var _core_cache_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/cache.service */ "yXlR");







class AppComponent {
    constructor(dataService, cacheService) {
        this.dataService = dataService;
        this.cacheService = cacheService;
        this.title = 'Notify-Articles';
        this.articles = [];
        this.sources = [];
        this.eventsSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    ngOnInit() {
        this.cable = actioncable__WEBPACK_IMPORTED_MODULE_0__["createConsumer"]('ws://localhost:3001/cable');
        // console.log(this.cable.subscriptions);
        this.subscription = this.cable.subscriptions.create('ArticlesChannel', {
            connected: this.connected,
            disconnected: this.disconnected,
            received: (data) => this.received(data),
        });
        this.sourcesOBS$ = this.dataService.getSources();
        this.sourcesSubscription = this.sourcesOBS$.subscribe((data) => {
            data.filter((source) => {
                this.sources.push(source);
                const readedArticles = this.cacheService.read(source.sourceId.toString());
                console.log(readedArticles);
                for (const article of source.articles) {
                    article.unread = readedArticles.includes(article.articleId.toString())
                        ? false
                        : true;
                    this.articles.push(article);
                }
            });
        });
    }
    connected() {
        console.log('connected!');
    }
    disconnected() {
        console.log('disconnected!');
    }
    received(data) {
        if (!data.body.articleId || data.body === {}) {
            return;
        }
        const newArticle = data.body;
        if (this.articles.find((article) => article.articleId === newArticle.articleId)) {
            return;
        }
        newArticle.unread = true;
        this.articles.push(newArticle);
        this.eventsSubject.next(newArticle);
    }
    getunreadArticles() {
        let counter = 0;
        this.articles.filter((article) => {
            if (article) {
                counter = article.unread ? (counter += 1) : counter;
            }
        });
        return counter;
    }
    ngOnDestroy() {
        this.cacheService.cleanAll();
        this.sourcesSubscription.unsubscribe();
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_data_service__WEBPACK_IMPORTED_MODULE_4__["DataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_cache_service__WEBPACK_IMPORTED_MODULE_5__["CacheService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_notification_header_notification_header_component__WEBPACK_IMPORTED_MODULE_2__["NotificationHeaderComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.notificationComponent = _t.first);
    } }, decls: 1, vars: 3, consts: [[3, "articles", "events", "unreadArticles"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-notification-header", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("articles", ctx.articles)("events", ctx.eventsSubject.asObservable())("unreadArticles", ctx.getunreadArticles());
    } }, directives: [_notification_header_notification_header_component__WEBPACK_IMPORTED_MODULE_2__["NotificationHeaderComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "TtVb":
/*!******************************************************************************************!*\
  !*** ./src/app/notification-header/notification-button/notification-button.component.ts ***!
  \******************************************************************************************/
/*! exports provided: NotificationButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationButtonComponent", function() { return NotificationButtonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "wHSu");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "6NWb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");





const _c0 = ["bellIcon"];
function NotificationButtonComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r1.unreadArtcile, "+");
} }
class NotificationButtonComponent {
    constructor(elRef) {
        this.elRef = elRef;
        this.faBell = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faBell"];
        this.unreadArtcile = 0;
    }
    ngOnChanges(changes) {
        if (this.iconView) {
            this.iconView.nativeElement.classList.add('shake-now');
            setTimeout(() => {
                this.iconView.nativeElement.classList.remove('shake-now');
            }, 3000);
        }
        // console.log(this.divView.nativeElement);
    }
    ngOnInit() { }
}
NotificationButtonComponent.ɵfac = function NotificationButtonComponent_Factory(t) { return new (t || NotificationButtonComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
NotificationButtonComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NotificationButtonComponent, selectors: [["notification-button"]], viewQuery: function NotificationButtonComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.iconView = _t.first);
    } }, inputs: { unreadArtcile: "unreadArtcile" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 4, vars: 2, consts: [[1, "badge-notification"], [1, "fa-stack-4x", "icon-bell", "icon-grey", 3, "icon"], ["bellIcon", ""], ["class", "badge", 4, "ngIf"], [1, "badge"]], template: function NotificationButtonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "fa-icon", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, NotificationButtonComponent_div_3_Template, 3, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faBell);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.unreadArtcile > 0);
    } }, directives: [_fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FaIconComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: [".badge-notification[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  top: 50%;\n  display: inline-block;\n  text-align: center;\n  vertical-align: middle;\n  position: relative;\n  border-radius: 50%;\n}\n\n.badge[_ngcontent-%COMP%] {\n  position: absolute;\n  background: #a11b2d;\n  box-sizing: content-box;\n  min-width: 22px;\n  width: 100%;\n  height: 18px;\n  transform: translateX(-49%) translateY(-53%);\n  padding: 1px;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  font-size: 16px;\n  border-radius: 50%;\n  color: white;\n}\n\n.icon-bell[_ngcontent-%COMP%] {\n  position: absolute;\n  display: block;\n  margin: 0;\n  right: 10px;\n  top: 11px;\n  background: transparent;\n  padding: 8px;\n  border-radius: 50%;\n  color: #fff;\n  font-size: 25px;\n}\n\n.icon-bell[_ngcontent-%COMP%]:hover {\n  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  transform-origin: top right;\n}\n\n.shake-now[_ngcontent-%COMP%] {\n  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  transform-origin: top right;\n}\n\n@keyframes shake {\n  0% {\n    transform: rotate(0);\n  }\n  15% {\n    transform: rotate(5deg);\n  }\n  30% {\n    transform: rotate(-5deg);\n  }\n  45% {\n    transform: rotate(4deg);\n  }\n  60% {\n    transform: rotate(-4deg);\n  }\n  75% {\n    transform: rotate(2deg);\n  }\n  85% {\n    transform: rotate(-2deg);\n  }\n  92% {\n    transform: rotate(1deg);\n  }\n  100% {\n    transform: rotate(0);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vdGlmaWNhdGlvbi1idXR0b24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFFBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSw0Q0FBQTtFQUNBLFlBQUE7RUFFQSxtQkFBQTtFQUVBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FBRUY7O0FBQUE7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FBR0Y7O0FBREE7RUFDRSwrREFBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSwyQkFBQTtBQUlGOztBQUZBO0VBQ0UsK0RBQUE7RUFDQSxtQ0FBQTtVQUFBLDJCQUFBO0VBQ0EsMkJBQUE7QUFLRjs7QUFIQTtFQUNFO0lBQ0Usb0JBQUE7RUFNRjtFQUpBO0lBQ0UsdUJBQUE7RUFNRjtFQUpBO0lBQ0Usd0JBQUE7RUFNRjtFQUpBO0lBQ0UsdUJBQUE7RUFNRjtFQUpBO0lBQ0Usd0JBQUE7RUFNRjtFQUpBO0lBQ0UsdUJBQUE7RUFNRjtFQUpBO0lBQ0Usd0JBQUE7RUFNRjtFQUpBO0lBQ0UsdUJBQUE7RUFNRjtFQUpBO0lBQ0Usb0JBQUE7RUFNRjtBQUNGIiwiZmlsZSI6Im5vdGlmaWNhdGlvbi1idXR0b24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYmFkZ2Utbm90aWZpY2F0aW9uIHN2ZyB7XG4gIHdpZHRoOiAxMHB4O1xuICBoZWlnaHQ6IDEwcHg7XG4gIHRvcDogNTAlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG4uYmFkZ2Uge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJhY2tncm91bmQ6IHJnYigxNjEsIDI3LCA0NSk7XG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICBtaW4td2lkdGg6IDIycHg7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDE4cHg7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNDklKSB0cmFuc2xhdGVZKC01MyUpO1xuICBwYWRkaW5nOiAxcHg7XG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbi5pY29uLWJlbGwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDA7XG4gIHJpZ2h0OiAxMHB4O1xuICB0b3A6IDExcHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtc2l6ZTogMjVweDtcbn1cbi5pY29uLWJlbGw6aG92ZXIge1xuICBhbmltYXRpb246IHNoYWtlIDAuNXMgY3ViaWMtYmV6aWVyKDAuMzYsIDAuMDcsIDAuMTksIDAuOTcpIGJvdGg7XG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIHJpZ2h0O1xufVxuLnNoYWtlLW5vdyB7XG4gIGFuaW1hdGlvbjogc2hha2UgMC41cyBjdWJpYy1iZXppZXIoMC4zNiwgMC4wNywgMC4xOSwgMC45NykgYm90aDtcbiAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgcmlnaHQ7XG59XG5Aa2V5ZnJhbWVzIHNoYWtlIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xuICB9XG4gIDE1JSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNWRlZyk7XG4gIH1cbiAgMzAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNWRlZyk7XG4gIH1cbiAgNDUlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0ZGVnKTtcbiAgfVxuICA2MCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC00ZGVnKTtcbiAgfVxuICA3NSUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDJkZWcpO1xuICB9XG4gIDg1JSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpO1xuICB9XG4gIDkyJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMWRlZyk7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMCk7XG4gIH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _icons_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons-module */ "kDtP");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _notification_header_notification_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notification-header/notification-header.component */ "bins");
/* harmony import */ var _notification_header_notification_button_notification_button_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notification-header/notification-button/notification-button.component */ "TtVb");
/* harmony import */ var _core_intersection_observer_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/intersection-observer.directive */ "iVfJ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");









class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ providers: [], imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _icons_module__WEBPACK_IMPORTED_MODULE_3__["IconsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
        _notification_header_notification_header_component__WEBPACK_IMPORTED_MODULE_5__["NotificationHeaderComponent"],
        _notification_header_notification_button_notification_button_component__WEBPACK_IMPORTED_MODULE_6__["NotificationButtonComponent"],
        _core_intersection_observer_directive__WEBPACK_IMPORTED_MODULE_7__["IntersectionObserverDirective"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _icons_module__WEBPACK_IMPORTED_MODULE_3__["IconsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"]] }); })();


/***/ }),

/***/ "bins":
/*!**********************************************************************!*\
  !*** ./src/app/notification-header/notification-header.component.ts ***!
  \**********************************************************************/
/*! exports provided: NotificationHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationHeaderComponent", function() { return NotificationHeaderComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "wHSu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _core_cache_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/cache.service */ "yXlR");
/* harmony import */ var _notification_button_notification_button_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notification-button/notification-button.component */ "TtVb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _core_intersection_observer_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/intersection-observer.directive */ "iVfJ");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "6NWb");








function NotificationHeaderComponent_div_4_ul_6_li_1_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const article_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("src", article_r3.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("alt", article_r3.source_title);
} }
const _c0 = function (a0, a1) { return { "bg-dark": a0, "bg-light": a1 }; };
function NotificationHeaderComponent_div_4_ul_6_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("visibilityChange", function NotificationHeaderComponent_div_4_ul_6_li_1_Template_div_visibilityChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7); const article_r3 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3); return ctx_r6.onVisibilityChanged(article_r3, $event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "fa-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, NotificationHeaderComponent_div_4_ul_6_li_1_div_13_Template, 2, 2, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const article_r3 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](8, _c0, article_r3.unread === true, article_r3.unread === false));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("intersectionDebounce", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", article_r3.original_url, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", article_r3.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx_r2.faLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", article_r3.source_title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](article_r3.published_date);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", article_r3.image_url);
} }
function NotificationHeaderComponent_div_4_ul_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ul", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, NotificationHeaderComponent_div_4_ul_6_li_1_Template, 14, 11, "li", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.sortedArticles)("ngForTrackBy", ctx_r1.trackByIndex);
} }
function NotificationHeaderComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, NotificationHeaderComponent_div_4_ul_6_Template, 2, 2, "ul", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.articles.length);
} }
class NotificationHeaderComponent {
    constructor(cacheService, changeDetector) {
        this.cacheService = cacheService;
        this.changeDetector = changeDetector;
        this.faLink = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faLink"];
        this.articleSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]([]);
        this.throttle = 0;
        this.distance = 1;
        this.visibilityStatus = {};
        this.showNotification = false;
    }
    set articles(value) {
        // set the latest value for _data BehaviorSubject
        this.articleSubject.next(value);
    }
    get articles() {
        // get the latest value from _data BehaviorSubject
        return this.articleSubject.getValue();
    }
    get sortedArticles() {
        //  if(this.showNotification )
        return this.articles.sort((a, b) => {
            return (new Date(b.published_date) -
                new Date(a.published_date));
        });
        // else
        // return
    }
    ngOnInit() {
        let articles = [];
        this.articleSubject.subscribe((d) => {
            articles = d;
        });
        this.articles = articles;
        this.eventsSubscription = this.events.subscribe((article) => this.addArticle(article));
        this.articles.filter((article) => {
            if (article.unread) {
                this.unreadArticles += 1;
            }
        });
    }
    onVisibilityChanged(changedArticle, status) {
        this.visibilityStatus[changedArticle.articleId] = status;
        if (this.visibilityStatus[changedArticle.articleId] === 'Visible') {
            this.articles.filter((article) => {
                if (article.articleId === changedArticle.articleId) {
                    const saved = this.cacheService.save(changedArticle.sourceId.toString(), changedArticle.articleId.toString(), 1);
                    setTimeout(() => (article.unread = false), 2500);
                    if (saved) {
                        this.unreadArticles -= 1;
                    }
                }
            });
        }
    }
    trackByIndex(index) {
        return index;
    }
    openNotification(state) {
        this.showNotification = state;
    }
    addArticle(article) { }
    ngOnDestroy() {
        this.eventsSubscription.unsubscribe();
        this.articleSubject.unsubscribe();
    }
}
NotificationHeaderComponent.ɵfac = function NotificationHeaderComponent_Factory(t) { return new (t || NotificationHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_cache_service__WEBPACK_IMPORTED_MODULE_3__["CacheService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"])); };
NotificationHeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: NotificationHeaderComponent, selectors: [["app-notification-header"]], inputs: { events: "events", unreadArticles: "unreadArticles", articles: "articles" }, decls: 5, vars: 2, consts: [[1, "notification-header"], [1, "notification-wrapper"], [1, "notification-btn", 3, "click"], [3, "unreadArtcile"], ["class", "notification-content", 4, "ngIf"], [1, "notification-content"], [1, "notification-title"], [1, "mdi", "mdi-settings"], [1, "label"], [1, "notification-body"], ["id", "articles_list", "style", "\n            margin: 0;\n            padding: 0;\n            -ms-overflow-style: 'none';\n            scrollbar-width: 'none';\n          ", 4, "ngIf"], ["id", "articles_list", 2, "margin", "0", "padding", "0", "-ms-overflow-style", "none", "scrollbar-width", "none"], ["class", "article", 3, "ngClass", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "article", 3, "ngClass"], ["intersectionObserver", "", 2, "display", "inherit", "width", "100%", 3, "intersectionDebounce", "visibilityChange"], [1, "article-body"], [1, "article-link", 3, "href"], [1, "article-details"], [1, "article-source"], [1, "source-title"], [2, "font-size", "12px", "color", "#4c587e", 3, "icon"], [1, "article-date"], [1, "article-date-time"], ["class", "article-media", 4, "ngIf"], [1, "article-media"], ["loading", "lazy", 1, "article-media-cell", 2, "width", "100%", "height", "100%", 3, "src", "alt"]], template: function NotificationHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NotificationHeaderComponent_Template_div_click_2_listener() { return ctx.openNotification(!ctx.showNotification); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "notification-button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, NotificationHeaderComponent_div_4_Template, 7, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("unreadArtcile", ctx.unreadArticles);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.showNotification);
    } }, directives: [_notification_button_notification_button_component__WEBPACK_IMPORTED_MODULE_4__["NotificationButtonComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgClass"], _core_intersection_observer_directive__WEBPACK_IMPORTED_MODULE_6__["IntersectionObserverDirective"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FaIconComponent"]], styles: [".notification-header[_ngcontent-%COMP%] {\n  background-color: #4c587e;\n  width: 100%;\n  height: 68px;\n  padding: 0;\n  margin: 0;\n}\n\n.notification-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  margin-right: 15px;\n  padding: 22px 13px;\n  float: right;\n  border-radius: 5px;\n}\n\n.notification-wrapper[_ngcontent-%COMP%]   .notification-btn[_ngcontent-%COMP%] {\n  color: #ffffff;\n  cursor: pointer;\n}\n\n.notification-wrapper[_ngcontent-%COMP%]   .notification-content[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 46px;\n  right: 10px;\n  width: 350px;\n  height: 425px !important;\n  background-color: whitesmoke;\n  z-index: 300;\n  border-radius: 6%;\n}\n\n.notification-wrapper[_ngcontent-%COMP%]   .notification-title[_ngcontent-%COMP%] {\n  padding: 10px;\n  color: #ffffff;\n  background-image: linear-gradient(-225deg, #755dd5 35%, #4c587e 100%);\n}\n\n.notification-wrapper[_ngcontent-%COMP%]   .notification-title[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 90%;\n  text-align: center;\n  font-weight: 500;\n}\n\n.notification-wrapper[_ngcontent-%COMP%]   .notification-content[_ngcontent-%COMP%]   .notification-body[_ngcontent-%COMP%] {\n  overflow: scroll;\n  height: 90%;\n  margin: 0;\n}\n\n.article[_ngcontent-%COMP%] {\n  padding: 2px;\n  display: flex;\n  flex: 1 1 100%;\n  flex-wrap: wrap;\n  position: relative;\n  border-bottom: 1px solid #264097;\n  min-height: 45px;\n}\n\n.bg-dark[_ngcontent-%COMP%] {\n  background-color: #777575;\n  animation: to-light 3s 1;\n  animation-delay: 2s;\n}\n\n.bg-light[_ngcontent-%COMP%] {\n  background-color: transparent;\n}\n\n.article[_ngcontent-%COMP%]   .article-body[_ngcontent-%COMP%] {\n  flex: 1 1;\n  font-size: medium;\n  position: relative;\n  z-index: 1;\n  margin-left: 5px;\n  width: 75%;\n}\n\n.article-media[_ngcontent-%COMP%] {\n  width: 20%;\n}\n\n.article-details[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 4px;\n}\n\n.article-details-cell[_ngcontent-%COMP%] {\n  flex: 0 0 80px;\n  margin-left: 5px;\n  color: #c2c4c9;\n  padding: 2px;\n}\n\n.article-media-cell[_ngcontent-%COMP%] {\n  flex: 0 0 80px;\n  color: #c2c4c9;\n  padding: 0px;\n}\n\n.article-date-time[_ngcontent-%COMP%] {\n  align-items: center;\n  font-size: 14px;\n}\n\n.article-source[_ngcontent-%COMP%] {\n  width: 70%;\n  font-size: 14px;\n}\n\n.source-title[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: bolder;\n}\n\n.article-link[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: inherit;\n  font-style: italic;\n  font-size: medium;\n}\n\n.article-date[_ngcontent-%COMP%] {\n  width: 30%;\n}\n\n@media (max-width: 480px) {\n  .notification-content[_ngcontent-%COMP%] {\n    top: 46px !important;\n    right: -15px !important;\n    width: 320px !important;\n  }\n}\n\n@keyframes to-light {\n  from {\n    background: #777575;\n  }\n  to {\n    background: transparent;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vdGlmaWNhdGlvbi1oZWFkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7QUFDRjs7QUFDQTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQUVGOztBQUFBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUFHRjs7QUFEQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esd0JBQUE7RUFDQSw0QkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQUlGOztBQUZBO0VBQ0UsYUFBQTtFQUNBLGNBQUE7RUFDQSxxRUFBQTtBQUtGOztBQUNBO0VBQ0UscUJBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQUVGOztBQUFBO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtBQUdGOztBQURBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtBQUlGOztBQUZBO0VBQ0UseUJBQUE7RUFDQSx3QkFBQTtFQUNBLG1CQUFBO0FBS0Y7O0FBSEE7RUFDRSw2QkFBQTtBQU1GOztBQUpBO0VBQ0UsU0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0FBT0Y7O0FBSkE7RUFDRSxVQUFBO0FBT0Y7O0FBSkE7RUFFRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFNRjs7QUFKQTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FBT0Y7O0FBTEE7RUFDRSxjQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7QUFRRjs7QUFOQTtFQUNFLG1CQUFBO0VBQ0EsZUFBQTtBQVNGOztBQVBBO0VBQ0UsVUFBQTtFQUNBLGVBQUE7QUFVRjs7QUFSQTtFQUNFLGNBQUE7RUFDQSxtQkFBQTtBQVdGOztBQVRBO0VBQ0UscUJBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQVlGOztBQVRBO0VBQ0UsVUFBQTtBQVlGOztBQVZBO0VBQ0U7SUFDRSxvQkFBQTtJQUNBLHVCQUFBO0lBQ0EsdUJBQUE7RUFhRjtBQUNGOztBQVZBO0VBQ0U7SUFDRSxtQkFBQTtFQVlGO0VBVkE7SUFDRSx1QkFBQTtFQVlGO0FBQ0YiLCJmaWxlIjoibm90aWZpY2F0aW9uLWhlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ub3RpZmljYXRpb24taGVhZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc2LCA4OCwgMTI2KTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNjhweDtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xufVxuLm5vdGlmaWNhdGlvbi13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG4gIHBhZGRpbmc6IDIycHggMTNweDtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG4ubm90aWZpY2F0aW9uLXdyYXBwZXIgLm5vdGlmaWNhdGlvbi1idG4ge1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLm5vdGlmaWNhdGlvbi13cmFwcGVyIC5ub3RpZmljYXRpb24tY29udGVudCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA0NnB4O1xuICByaWdodDogMTBweDtcbiAgd2lkdGg6IDM1MHB4O1xuICBoZWlnaHQ6IDQyNXB4ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XG4gIHotaW5kZXg6IDMwMDtcbiAgYm9yZGVyLXJhZGl1czogNiU7XG59XG4ubm90aWZpY2F0aW9uLXdyYXBwZXIgLm5vdGlmaWNhdGlvbi10aXRsZSB7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgLTIyNWRlZyxcbiAgICByZ2IoMTE3LCA5MywgMjEzKSAzNSUsXG4gICAgcmdiKDc2IDg4IDEyNikgMTAwJVxuICApO1xufVxuLm5vdGlmaWNhdGlvbi13cmFwcGVyIC5ub3RpZmljYXRpb24tdGl0bGUgLmxhYmVsIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogOTAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG4ubm90aWZpY2F0aW9uLXdyYXBwZXIgLm5vdGlmaWNhdGlvbi1jb250ZW50IC5ub3RpZmljYXRpb24tYm9keSB7XG4gIG92ZXJmbG93OiBzY3JvbGw7XG4gIGhlaWdodDogOTAlO1xuICBtYXJnaW46IDA7XG59XG4uYXJ0aWNsZSB7XG4gIHBhZGRpbmc6IDJweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleDogMSAxIDEwMCU7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzI2NDA5NztcbiAgbWluLWhlaWdodDogNDVweDtcbn1cbi5iZy1kYXJrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExOSwgMTE3LCAxMTcpO1xuICBhbmltYXRpb246IHRvLWxpZ2h0IDNzIDE7XG4gIGFuaW1hdGlvbi1kZWxheTogMnM7XG59XG4uYmctbGlnaHQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbi5hcnRpY2xlIC5hcnRpY2xlLWJvZHkge1xuICBmbGV4OiAxIDEgMCU7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIHdpZHRoOiA3NSU7XG4gIC8vIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG4uYXJ0aWNsZS1tZWRpYSB7XG4gIHdpZHRoOiAyMCU7XG59XG5cbi5hcnRpY2xlLWRldGFpbHMge1xuICAvLyAgIHBhZGRpbmctdG9wOiA1MCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogNHB4O1xufVxuLmFydGljbGUtZGV0YWlscy1jZWxsIHtcbiAgZmxleDogMCAwIDgwcHg7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIGNvbG9yOiByZ2IoMTk0LCAxOTYsIDIwMSk7XG4gIHBhZGRpbmc6IDJweDtcbn1cbi5hcnRpY2xlLW1lZGlhLWNlbGwge1xuICBmbGV4OiAwIDAgODBweDtcbiAgY29sb3I6IHJnYigxOTQsIDE5NiwgMjAxKTtcbiAgcGFkZGluZzogMHB4O1xufVxuLmFydGljbGUtZGF0ZS10aW1lIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuLmFydGljbGUtc291cmNlIHtcbiAgd2lkdGg6IDcwJTtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuLnNvdXJjZS10aXRsZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXdlaWdodDogYm9sZGVyO1xufVxuLmFydGljbGUtbGluayB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgZm9udC1zaXplOiBtZWRpdW07XG59XG5cbi5hcnRpY2xlLWRhdGUge1xuICB3aWR0aDogMzAlO1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XG4gIC5ub3RpZmljYXRpb24tY29udGVudCB7XG4gICAgdG9wOiA0NnB4ICFpbXBvcnRhbnQ7XG4gICAgcmlnaHQ6IC0xNXB4ICFpbXBvcnRhbnQ7XG4gICAgd2lkdGg6IDMyMHB4ICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0by1saWdodCB7XG4gIGZyb20ge1xuICAgIGJhY2tncm91bmQ6IHJnYigxMTksIDExNywgMTE3KTtcbiAgfVxuICB0byB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ "iVfJ":
/*!*********************************************************!*\
  !*** ./src/app/core/intersection-observer.directive.ts ***!
  \*********************************************************/
/*! exports provided: IntersectionObserverDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntersectionObserverDirective", function() { return IntersectionObserverDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _intersection_observer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./intersection-observer */ "72Wa");





class IntersectionObserverDirective {
    constructor(element) {
        this.element = element;
        this.intersectionDebounce = 0;
        this.intersectionRootMargin = '0px';
        this.visibilityChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    ngOnInit() {
        const element = this.element.nativeElement;
        const config = {
            root: this.intersectionRoot,
            rootMargin: this.intersectionRootMargin,
            threshold: this.intersectionThreshold,
        };
        Object(_intersection_observer__WEBPACK_IMPORTED_MODULE_3__["fromIntersectionObserver"])(element, config, this.intersectionDebounce)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.destroy$))
            .subscribe((status) => {
            this.visibilityChange.emit(status);
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
}
IntersectionObserverDirective.ɵfac = function IntersectionObserverDirective_Factory(t) { return new (t || IntersectionObserverDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
IntersectionObserverDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: IntersectionObserverDirective, selectors: [["", "intersectionObserver", ""]], inputs: { intersectionDebounce: "intersectionDebounce", intersectionRootMargin: "intersectionRootMargin", intersectionRoot: "intersectionRoot", intersectionThreshold: "intersectionThreshold" }, outputs: { visibilityChange: "visibilityChange" } });


/***/ }),

/***/ "kDtP":
/*!*********************************!*\
  !*** ./src/app/icons-module.ts ***!
  \*********************************/
/*! exports provided: IconsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconsModule", function() { return IconsModule; });
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "6NWb");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "wHSu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




class IconsModule {
    constructor(library) {
        // add icons to the library for convenient access in other components
        library.addIcons(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faLink"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faBell"]);
    }
}
IconsModule.ɵfac = function IconsModule_Factory(t) { return new (t || IconsModule)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_0__["FaIconLibrary"])); };
IconsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: IconsModule });
IconsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_0__["FontAwesomeModule"]], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_0__["FontAwesomeModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](IconsModule, { imports: [_fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_0__["FontAwesomeModule"]], exports: [_fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_0__["FontAwesomeModule"]] }); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "yXlR":
/*!***************************************!*\
  !*** ./src/app/core/cache.service.ts ***!
  \***************************************/
/*! exports provided: CacheService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CacheService", function() { return CacheService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class CacheService {
    constructor() { }
    save(sourceId, articleId, expiration) {
        if (!sourceId || !articleId) {
            return false;
        }
        const expirationMins = expiration || 0;
        const expMS = expirationMins !== 0 ? expirationMins * 60 * 1000 : 0;
        const articles = this.read(sourceId);
        if (articles.includes(articleId)) {
            return false;
        }
        articles.push(articleId);
        const record = {
            value: JSON.stringify(articles),
            expiration: expMS !== 0 ? new Date().getTime() + expMS : null,
            hasExpiration: expMS !== 0 ? true : false,
        };
        localStorage.setItem(sourceId, JSON.stringify(record));
        return true;
    }
    read(sourceId) {
        const item = localStorage.getItem(sourceId);
        if (item !== null) {
            const record = JSON.parse(item);
            console.log(record);
            if (!record) {
                return [];
            }
            else {
                return JSON.parse(record.value);
            }
        }
        return [];
    }
    removeSource(sourceId) {
        localStorage.removeItem(sourceId);
    }
    cleanAll() {
        localStorage.clear();
    }
}
CacheService.ɵfac = function CacheService_Factory(t) { return new (t || CacheService)(); };
CacheService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CacheService, factory: CacheService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch((err) => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map