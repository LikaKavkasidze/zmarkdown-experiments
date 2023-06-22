// Create raw array from extracted constants
import katexConstants from './constants.json'
const potentialCommands = [...katexConstants.functions, ...katexConstants.symbolsMath, ...katexConstants.symbolsText, ...katexConstants.macros, "\\ce"];

// Filter commands and remove duplicates
const commands = potentialCommands.filter(s => s.startsWith('\\'));
const uniqueCommands = Array.from(new Set(commands));

console.log(JSON.stringify(uniqueCommands))
