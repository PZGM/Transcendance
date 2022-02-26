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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../auth/controllers/auth/guards");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async getSelf(request) {
        console.log(request.session.id);
        const user = await this.userService.getOne(0);
        if (user)
            return user;
        throw new common_1.NotFoundException();
    }
    async getOne(userId) {
        const user = await this.userService.getOne(userId);
        if (user)
            return user;
        throw new common_1.NotFoundException();
    }
    async getLogin(userId) {
        const login = await this.userService.getUserLogin(userId);
        if (login)
            return login;
        throw new common_1.NotFoundException();
    }
    async getImage(userId) {
        const img = await this.userService.getUserImage(userId);
        if (img)
            return img;
        throw new common_1.NotFoundException();
    }
};
__decorate([
    (0, common_1.Get)('/me'),
    (0, common_1.UseGuards)(guards_1.AuthentificatedGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSelf", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(guards_1.AuthentificatedGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('/:id/login'),
    (0, common_1.UseGuards)(guards_1.AuthentificatedGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getLogin", null);
__decorate([
    (0, common_1.Get)('/:id/image'),
    (0, common_1.UseGuards)(guards_1.AuthentificatedGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getImage", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map