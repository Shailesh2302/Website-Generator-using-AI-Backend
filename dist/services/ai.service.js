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
Object.defineProperty(exports, "__esModule", { value: true });
exports.callGemini = callGemini;
const generative_ai_1 = require("@google/generative-ai");
const environment_1 = require("../config/environment");
const genAI = new generative_ai_1.GoogleGenerativeAI(environment_1.config.geminiApiKey);
function callGemini(messages, maxTokens) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = genAI.getGenerativeModel({ model: environment_1.config.geminiModel });
        const chat = model.startChat({
            history: messages.slice(0, -1).map((msg) => ({
                role: msg.role,
                parts: [{ text: msg.content }],
            })),
        });
        const userMessage = messages[messages.length - 1].content;
        const result = yield chat.sendMessage(userMessage);
        const response = yield result.response;
        return response.text();
    });
}
