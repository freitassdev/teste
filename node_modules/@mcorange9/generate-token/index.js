const DefChars = 'abcdefghijklmnopqrstuvwxyz-_.'

function getRandInt(max){
    return Math.floor(Math.random() * max);
}

module.exports = class generateToken {
	// a bit unconventional but it works
	constructor(chars=DefChars){
		this.chars = chars
	}

	generateToken(length=5, chars=this.chars){
		let uchars = this.chars.split('');
		let result = '';
		let i
		for(i=0;i<length;i++){
			if(getRandInt(2) === 0) {
				result += uchars[getRandInt(uchars.length)]
			} else {
				result += uchars[getRandInt(uchars.length)].toUpperCase()
			}
		}
		return result
	}
}