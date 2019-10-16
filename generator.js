// (stdin => {
// 	const input = stdin
//  console.log(input)
// })(require('fs').readFileSync('/dev/stdin', 'utf8'))

const text = 'この文章は迷路のようになっていて、少し読み辛いかもしれません。もしこの文章が読めたなら、あなたには迷路の才能があると思います。ここまで来たらあと少しです。通らなかった文字を上から読んで下さい。'
const cipher = 'めいろ'

const countMazeGrid = (text, cipher) => {
	return [...(text + cipher)].length
}

const primeFactorization = n => {
	let s = Math.floor(Math.sqrt(n))
	let r = 0
	let result = []

	for (let i = 2;i <= s;i++) {
		if ((n % i) == 0) {
			r = 0
            do {
				r++
                n = n / i
			} while ((n % i) == 0)
			result.push({num:i, r:r})
		}
	}
	
	if (n > s) {
		result.push({num:n, r:1})
	}
	return result
}

console.log(primeFactorization(countMazeGrid(text, cipher)))