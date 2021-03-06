"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const profile_service_1 = require('./../services/profile.service');
const token_service_1 = require('./../services/token.service');
const lists_service_1 = require('./../services/lists.service');
let ProfileComponent = class ProfileComponent {
    constructor(route, router, profileService, tokenService, listsService) {
        this.route = route;
        this.router = router;
        this.profileService = profileService;
        this.tokenService = tokenService;
        this.listsService = listsService;
        this.profile = {};
        this.numItems = 0;
        this.price = 0;
    }
    ngOnInit() {
        this.token = this.tokenService.getToken();
        this.days = [];
        for (var i = 1; i < 365; i++) {
            this.days.push(i);
        }
        this.profileService.getProfileAPI(this.token).then(x => {
            this.profile = x;
        });
        this.listsService.getListsAPI(this.token).then(x => {
            this.lists = x.lists;
            this.countItems();
            this.countPrice();
        });
    }
    countItems() {
        for (this.i = 0; this.i < this.lists.length; this.i++) {
            this.numItems += this.lists[this.i].items.length;
        }
    }
    countPrice() {
        for (this.i = 0; this.i < this.lists.length; this.i++) {
            for (this.j = 0; this.j < this.lists[this.i].items.length; this.j++) {
                this.price += this.lists[this.i].items[this.j].price;
            }
        }
    }
    isInHeatmap(dayNum) {
        let arrayIndex = this.profile.heatmap.indexOf(dayNum);
        if (arrayIndex === -1) {
            return 0;
        }
        return arrayIndex;
    }
    setHeatSquareStyle(dayNum) {
        if (this.isInHeatmap(dayNum))
            return "#168865";
        else
            return "#dbdbdb";
    }
};
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: './app/profile/profile.html',
        styleUrls: ['./app/profile/profile.css']
    }), 
    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, profile_service_1.ProfileService, token_service_1.TokenService, lists_service_1.ListsService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map