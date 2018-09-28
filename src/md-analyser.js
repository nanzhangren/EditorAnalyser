/*
 * @description Markdown analyse file.
 * @author Zero Zhang
 */


var MarkdownAnalyser = {};

/*
 * Getting title text analysed by char '#'.
 * @param {string} content The processed content.
 * @param {number} level The title level.
 * @return {string} The title text.
 */
function getTitleText(content, level) {
    return '<h' + level + '>' + content + '</h' + level + '>';
}
MarkdownAnalyser.getTitleText = getTitleText;

module.exports = MarkdownAnalyser;
