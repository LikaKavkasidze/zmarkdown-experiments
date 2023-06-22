const katexConstants = require('./katexConstants.json')
const str = '\\immediate\\write18{ls / > outputrce} \\input{outputrce}'

// Check count of {}
const openingBracesCount = (str.match(/(?<!\\){/g) || []).length
const closingBracesCount = (str.match(/(?<!\\)}/g) || []).length

if(openingBracesCount != closingBracesCount) {
	console.log('Invalid!')
}

// Ensure only valid commands
const commands = str.match(/\\[^\s]*/g)

for(let c of commands) {
	if(!katexConstants.includes(c)) {
		console.log('Invalid command!')
	}
}
