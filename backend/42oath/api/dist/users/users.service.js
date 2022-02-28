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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_dto_1 = require("../dto/user.dto");
const typeorm_2 = require("../typeorm");
const typeorm_3 = require("typeorm");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getOne(userId) {
        try {
            const user = await this.userRepository.findOneOrFail(userId);
            return this.entityToDTO(user);
        }
        catch (e) {
            return null;
        }
    }
    async getUserLogin(userId) {
        const userDTO = await this.getOne(userId);
        if (userDTO)
            return userDTO.login;
        return null;
    }
    async getUserImage(userId) {
        const userDTO = await this.getOne(userId);
        if (userDTO)
            return userDTO.img_url;
        return null;
    }
    entityToDTO(user) {
        const userDTO = new user_dto_1.UserDTO();
        userDTO.id = user.id;
        userDTO.intraID = user.intraId;
        userDTO.login = user.login;
        userDTO.firstName = user.firstName;
        userDTO.lastName = user.lastName;
        userDTO.img_url = user.img_url;
        return userDTO;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.User)),
    __metadata("design:paramtypes", [typeorm_3.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map