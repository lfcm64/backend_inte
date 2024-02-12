"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import userRouter from './routes/user.routes';
//import teamRouter from './routes/team.routes';
const faction_routes_1 = __importDefault(require("./routes/faction.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
//app.use('/user', userRouter);
//app.use('/team', teamRouter);
app.use('/faction', faction_routes_1.default);
app.listen(8000, () => {
    console.log(`Server is running...`);
});
//# sourceMappingURL=index.js.map