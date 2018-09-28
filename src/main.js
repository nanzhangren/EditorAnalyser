/*
 * @description Entry file.
 * @author Zero Zhang
 */


var MDAnalyser = require('./md-analyser');

/*
 * Getting content result by analysing each char.
 * @param {string} messageContent The analysed message content.
 * @return {string} The content result.
 */
function analyse(messageContent) {
    if (!messageContent) {
        return '';
    }
    var htmlContent = '';
    var key = '', storedChars = '';
    var isLastChar = false, tempResult;
    for (var cursor = 0, length = messageContent.length; cursor < length; cursor++) {
        var char = messageContent[cursor];
        if (char === '#') {
            tempResult = getTitleResult(messageContent, cursor);
            htmlContent += tempResult.text;
            cursor = tempResult.index - 1;     // 1 will be increased to cursor in loop.
        } else if (char === '*') {
            tempResult = getTextEffectResult(messageContent, cursor);
            htmlContent += tempResult.text;
            cursor = tempResult.index - 1;     // 1 will be increased to cursor in loop.
        } else {
            htmlContent += char;
        }
    }
    return htmlContent;
}

/*
 * Execute title processed logic.
 * - Text starts with char '#' will be treated as title.
 * - The maxmium continuous length of '#' is 6.
 * - Once the continuous length of '#' is bigger than 6, the text line will be treated as normal text.
 * @param {string} content The analysed content.
 * @param {number} index The current cursor index.
 * @return {Object} Title processed result.
 */
function getTitleResult(content, index) {
    var key = '', storedChars = '';
    var result;
    for (var i = index, length = content.length; i < length; i++) {
        var char = content[i];
        if (char === '#') {
            key += char;
        } else if (char === '\r' || char === '\n') {
            if (key.length <= 6) {
                result = MDAnalyser.getTitleHTML(storedChars, key.length);
            } else {
                result = key + storedChars;
            }
            result += char;
            break;
        } else {
            storedChars += char;
        }
    }
    return {
        text: result,
        index: i
    };
}

/*
 * Execute bold text and italic text processed logic.
 * - Text between two '**' will be treated as bold text.
 * - Text between two '*' will be treated as italic text.
 * @param {string} content The analysed content.
 * @param {number} index The current cursor index.
 * @return {Object} Title processed result.
 */
function getTextEffectResult(content, index) {
    var key = '', storedChars = '';
    var result;
    for (var i = index, length = content.length; i < length; i++) {
        var char = content[i];
        if (char === '*') {
            if (!storedChars) {
                key += char;
            } else {
                if (key.length === 1) {         // start with '*'
                    result = MDAnalyser.getItalicTextHTML(storedChars);
                } else {                        // start with more than one '*'
                    var nextChar = content[i + 1];
                    if (nextChar === '*') {     // end with '**'
                        result = key.substring(0, key.length - 2) + MDAnalyser.getBoldTextHTML(storedChars);
                        i++;
                    } else {                    // end with '*'
                        result = key.substring(0, key.length - 1) + MDAnalyser.getItalicTextHTML(storedChars);
                    }
                }
                break;
            }
        } else if (char === '\r' || char === '\n') {
            result = key + storedChars + char;
            break;
        } else {
            storedChars += char;
        }
    }
    return {
        text: result,
        index: i
    };
}
