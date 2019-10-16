// (stdin => {
// 	const input = stdin
//  console.log(input)
// })(require('fs').readFileSync('/dev/stdin', 'utf8'))

const text = 'この文章は迷路のようになっていて、少し読み辛いかもしれません。もしこの文章が読めたなら、あなたには迷路の才能があると思います。ここまで来たらあと少しです。通らなかった文字を上から読んで下さい。'
const cipher = 'めいろ'

countMazeGrid = (text, cipher) => {
	return [...(text + cipher)].length
}

console.log(countMazeGrid(text, cipher))