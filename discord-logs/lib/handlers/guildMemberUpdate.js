"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildMemberUpdateEvent = void 0;
/**
 * @handler Guild Member Events
 * @related guildMemberUpdate
 */
function handleGuildMemberUpdateEvent(client, oldMember, newMember) {
    return __awaiter(this, void 0, void 0, function () {
        var emitted, addedRoles_1, removedRoles_1;
        return __generator(this, function (_a) {
            emitted = false;
            if (!oldMember.partial) {
                /**
                 * @event guildMemberBoost
                 * @description Emitted when a member starts boosting.
                 * @param {DJS:GuildMember} member The member who started boosting.
                 * @example
                 * client.on("guildMemberBoost", (member) => {
                 *   console.log(member.user.tag+" has started boosting "+member.guild.name+"!");
                 * });
                 */
                if (!oldMember.premiumSince && newMember.premiumSince) {
                    client.emit('guildMemberBoost', newMember);
                    emitted = true;
                }
                /**
                 * @event guildMemberUnboost
                 * @description Emitted when a member stops boosting.
                 * @param {DJS:GuildMember} member The member who stopped boosting.
                 * @example
                 * client.on("guildMemberUnboost", (member) => {
                 *   console.log(member.user.tag+" has stopped boosting "+member.guild.name+"...");
                 * });
                 */
                if (oldMember.premiumSince && !newMember.premiumSince) {
                    client.emit('guildMemberUnboost', newMember);
                    emitted = true;
                }
                addedRoles_1 = [];
                newMember.roles.cache.forEach(function (role) {
                    if (!oldMember.roles.cache.has(role.id))
                        addedRoles_1.push(role);
                });
                /**
                 * @event guildMemberRoleAdd
                 * @description Emitted when a member acquires a new role.
                 * @param {DJS:GuildMember} member The member who acquired the role.
                 * @param {DJS:Role} role The role the member has acquired.
                 * @example
                 * client.on("guildMemberRoleAdd", (member, role) => {
                 *   console.log(member.user.tag+" acquired the role: "+role.name);
                 * });
                 */
                addedRoles_1.forEach(function (role) {
                    client.emit('guildMemberRoleAdd', oldMember, role);
                    emitted = true;
                });
                removedRoles_1 = [];
                oldMember.roles.cache.forEach(function (role) {
                    if (!newMember.roles.cache.has(role.id))
                        removedRoles_1.push(role);
                });
                /**
                 * @event guildMemberRoleRemove
                 * @description Emitted when a member looses a new role.
                 * @param {DJS:GuildMember} member The member who lost the role.
                 * @param {DJS:Role} role The role the member has lost.
                 * @example
                 * client.on("guildMemberRoleRemove", (member, role) => {
                 *   console.log(member.user.tag+" lost the role: "+role.name);
                 * });
                 */
                removedRoles_1.forEach(function (role) {
                    client.emit('guildMemberRoleRemove', oldMember, role);
                    emitted = true;
                });
                /**
                 * @event guildMemberNicknameUpdate
                 * @description Emitted when a member's nickname changes.
                 * @param {DJS:GuildMember} member The member whose nickname has changed.
                 * @param {string} oldNickname The member's old nickname.
                 * @param {string} newNickname The member's new nickname.
                 * @example
                 * client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
                 *   console.log(member.user.tag+"'s nickname is now "+newNickname);
                 * });
                 */
                if (oldMember.nickname !== newMember.nickname) {
                    client.emit('guildMemberNicknameUpdate', newMember, oldMember.nickname, newMember.nickname);
                    emitted = true;
                }
            }
            /**
             * @event unhandledGuildMemberUpdate
             * @description Emitted when the guildMemberUpdate event is triggered but discord-logs didn't trigger any custom event.
             * @param {DJS:Guild} oldMember The member before the update.
             * @param {DJS:Guild} newMember The member after the update.
             * @example
             * client.on("unhandledGuildMemberUpdate", (oldMember, newMember) => {
             *   console.log("Member '"+oldMember.id+"' was edited but discord-logs couldn't find what was updated...");
             * });
             */
            if (!emitted) {
                client.emit('unhandledGuildMemberUpdate', oldMember, newMember);
            }
            return [2 /*return*/];
        });
    });
}
exports.handleGuildMemberUpdateEvent = handleGuildMemberUpdateEvent;
