/*
 * @description Entry file.
 * @author Zero Zhang
 */


var MarkdownAnalyser = require('./md-analyser');

/*
 * Getting content result by analysing each char.
 * @param {string} messageContent The analysed message content.
 * @return {string} The content result.
 */
function analyse(messageContent) {
    if (!messageContent) {
        return '';
    }
    var result = '';
    var key = '', storedChars = '';
    var isLastChar = false;
    for (var i = 0, length = messageContent.length; i < length; i++) {
        var char = messageContent[i];
        isLastChar = i === length - 1;
        if (['#', '*', '`'].indexOf(char) >= 0) {
            if (storedChars) {
                var firstKeyChar = key[0];
                if(char !== firstKeyChar) {   // No postfix match with prefix, treat the content as normal text.
                    result += key + storedChars;
                } else if (char === '*') {
                    var nextChar = messageContent[i + 1];
                    if ('*' === nextChar) {

                    }
                    result += key + storedChars;
                }
            } else {
                key += char;
            }
        } else if (key) {
            storedChars += char;
        } else if (isLastChar && key.indexOf('#') === 0) {
            if (key.length < 7) {   // title <h1> ~ <h6>
                result += MarkdownAnalyser.getTitleText(storedChars, key.length);
            } else {    // normal text
                result += key + storedChars;
            }
        } else {
            result += char;
        }
    }
    return result;
}
