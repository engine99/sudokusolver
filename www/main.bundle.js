webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"gameboard\">\n<table class=\"gametable\">\n\t<tr *ngFor=\"let y1 of [0,1,2]\">\n\t\t<td *ngFor=\"let x1 of [0,1,2]\" >\n\t\t\t<table class=\"blocktable\">\n\t\t\t\t<tr *ngFor=\"let y2 of [0,1,2]\">\n\t\t\t\t\t<td *ngFor=\"let x2 of [0,1,2]\" (click)=\"tapCell(indexOf(x1, y1, x2, y2))\">\n\t\t\t\t\t\t<span [style.display]=\"data[indexOf(x1, y1, x2, y2)] < 1 ? 'none' : 'inline'\">\n\t\t\t\t\t\t\t{{data[indexOf(x1, y1, x2, y2)]}}\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</td>\n\t</tr>\t\n</table>\n</div>\n<div class=\"navigation\">\n\t<button id=\"goButton\" (click)=attack()>Attack</button>\t\n\t<button id=\"clearButton\" (click)=clear()>Clear</button>\n\t<button id=\"resetButton\" (click)=setSample()>setSample</button>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Sudoku Solver';
        // game board data. zero indicates 'none selected'
        this.sampleData = [8, 5, 6, 0, 1, 4, 7, 3, 0,
            0, 9, 0, 0, 0, 0, 0, 0, 0,
            2, 4, 0, 0, 0, 0, 1, 6, 0,
            0, 6, 2, 0, 5, 9, 3, 0, 0,
            0, 3, 1, 8, 0, 2, 4, 5, 0,
            0, 0, 5, 3, 4, 0, 9, 2, 0,
            0, 2, 4, 0, 0, 0, 0, 7, 3,
            0, 0, 0, 0, 0, 0, 0, 1, 0,
            0, 1, 8, 6, 3, 0, 2, 9, 4];
        this.clear();
    }
    // clear the game board
    AppComponent.prototype.clear = function () {
        this.data = Array(81).fill(0);
    };
    // preset the gameboard to some sample data
    AppComponent.prototype.setSample = function () {
        this.data = this.sampleData.slice();
    };
    AppComponent.prototype.indexOf = function (x1, y1, x2, y2) {
        return (y1 * 3 + y2) * 9 + (x1 * 3) + x2;
    };
    // handle cell tapping. Increment that cell
    AppComponent.prototype.tapCell = function (index) { this.data[index] = (this.data[index] + 1) % 10; };
    // solve the sudoku, if possible, and update the gameboard if a solution is found
    AppComponent.prototype.attack = function () {
        // start the search tree
        var myIdea = this.attack2(new Array());
        // if a solution was found, copy it to the game board
        if (myIdea != null) {
            this.data = myIdea;
        }
    };
    /*
     * Find a complete solution given a partial solution. Return the first complete solution found (dfs) or null if none possible.
     * Ideas are numbers to fill in to the zeroes on the game board starting with the top left.
     * In this method. Find the possible values for the next zero given existing ideas, and recurse for each.
     */
    AppComponent.prototype.attack2 = function (ideas) {
        // Used to count the number of zeroes in the game board
        var ideaIndex = 0;
        // Make a copy of the game board and fill in the zeroes with any ideas so far
        var myData = new Array(81);
        var headIndex = -1;
        // Make a copy of data ... and fill in the ideas
        for (var index = 0; index < 81; index++) {
            if (this.data[index] > 0) {
                myData[index] = this.data[index];
            }
            else if (ideaIndex < ideas.length) {
                myData[index] = ideas[ideaIndex++];
            }
            else {
                ideaIndex++;
                myData[index] = 0;
                if (headIndex === -1) {
                    headIndex = index;
                }
            }
        }
        // This cell cannot be any that exists in the block, the row or the column
        var takenByBlock = this.getTakenByBlock(myData, headIndex);
        var takenByRow = this.getTakenByRow(myData, headIndex);
        var takenByCol = this.getTakenByCol(myData, headIndex);
        var taken = takenByBlock.concat(takenByRow).concat(takenByCol);
        for (var i = 1; i < 10; i++) {
            if (!taken.includes(i)) {
                // This is the end condition - have just solved the last zero
                if (ideaIndex === ideas.length + 1) {
                    myData[headIndex] = i;
                    return myData;
                }
                // Recurse using the new partial result
                var search = this.attack2(ideas.concat(i));
                if (search != null) {
                    // If a solution was found, return it right away
                    return search;
                }
            }
        }
        return null;
    };
    // get the non-zero (taken) numbers that are in the same block as myIndex
    AppComponent.prototype.getTakenByBlock = function (idea, myIndex) {
        // which block?
        var myBlockX = Math.floor((myIndex % 9) / 3);
        var myBlockY = Math.floor(myIndex / 27);
        // what are the numbers in my block?
        return idea.filter(function (value, index) { return Math.floor((index % 9) / 3) === myBlockX && Math.floor(index / 27) === myBlockY; });
    };
    // get the non-zero (taken) numbers that are in the same column as myIndex
    AppComponent.prototype.getTakenByCol = function (idea, myIndex) {
        // which col?
        var myX = myIndex % 9;
        // what are the numbers in my col?
        return idea.filter(function (value, index) { return index % 9 === myX; });
    };
    // get the non-zero (taken) numbers that are in the same row as myIndex
    AppComponent.prototype.getTakenByRow = function (idea, myIndex) {
        // which row?
        var myY = Math.floor(myIndex / 9);
        // what are the numbers in my col?
        return idea.filter(function (value, index) { return Math.floor(index / 9) === myY; });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map