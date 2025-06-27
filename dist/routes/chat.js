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
const express_1 = require("express");
const ai_service_1 = require("../services/ai.service");
const prompts_1 = require("../prompts");
const router = (0, express_1.Router)();
// Chat endpoint
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userMessages = req.body.messages;
    try {
        const messages = [
            {
                role: 'user',
                content: `${(0, prompts_1.getSystemPrompt)()}\n\n` + userMessages.map((m) => m.content).join('\n'),
            },
        ];
        const output = yield (0, ai_service_1.callGemini)(messages, 8000);
        const response = {
            response: output,
        };
        res.json(response);
    }
    catch (error) {
        const errorResponse = { error: 'Failed to process chat request' };
        res.status(500).json(errorResponse);
    }
}));
exports.default = router;
