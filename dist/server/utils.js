"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.html = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function html(strings, ...values) {
    return strings
        .reduce((result, str, i) => result + str + (values[i] || ""), "")
        .trim()
        .replace(/\n\s+/g, " "); // Removes new lines and excessive whitespace
}
exports.html = html;
