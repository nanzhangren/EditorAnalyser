/*
 * @description Markdown analyse file.
 * @author Zero Zhang
 */


var MarkdownAnalyser = {};

/*
 * Getting title html.
 * @param {string} content The processed content.
 * @param {number} level The title level.
 * @return {string} The title html.
 */
function getTitleHTML(content, level) {
    return '<h' + level + '>' + content + '</h' + level + '>';
}
MarkdownAnalyser.getTitleHTML = getTitleHTML;

/*
 * Getting bold text html.
 * @param {string} content The processed content.
 * @return {string} The bold text html.
 */
function getBoldTextHTML(content) {
    return '<b>' + content + '</b>';
}
MarkdownAnalyser.getBoldTextHTML = getBoldTextHTML;

/*
 * Getting italic text html.
 * @param {string} content The processed content.
 * @return {string} The italic text html.
 */
function getItalicTextHTML(content) {
    return '<i>' + content + '</i>';
}
MarkdownAnalyser.getItalicTextHTML = getItalicTextHTML;

module.exports = MarkdownAnalyser;
