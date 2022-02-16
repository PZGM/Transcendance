"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMSession = exports.User = exports.entities = void 0;
const session_1 = require("./entities/session");
Object.defineProperty(exports, "TypeORMSession", { enumerable: true, get: function () { return session_1.TypeORMSession; } });
const user_1 = require("./entities/user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
exports.entities = [user_1.User, session_1.TypeORMSession];
//# sourceMappingURL=index.js.map