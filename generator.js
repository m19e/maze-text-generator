// (stdin => {
// 	const input = stdin
//  console.log(input)
// })(require('fs').readFileSync('/dev/stdin', 'utf8'))

const text =
  "この文章は、迷路のようになっていて、少し読み辛いかもしれません。もしこの文章が読めたなら、あなたには迷路の才能があると思います。ここまで来たらあと少しです。通らなかった文字を上から読んで下さい。";
const cipher = "めいろ";

const countMazeGrid = (text, cipher) => {
  return [...(text + cipher)].length;
};

const primeFactorization = n => {
  let s = Math.floor(Math.sqrt(n));
  let r = 0;
  let result = [];

  for (let i = 2; i <= s; i++) {
    if (n % i == 0) {
      r = 0;
      do {
        r++;
        n = n / i;
      } while (n % i == 0);
      result.push({ num: i, r: r });
    }
  }

  if (n > s) {
    result.push({ num: n, r: 1 });
  }
  return result;
};

const getPrimeFactors = n => {
  if (n < 2) return [];
  if (n === 2 || n === 3 || n === 5) return [n];
  if (n % 2 === 0) return [2, ...getPrimeFactors(n/2)];
  if (n % 3 === 0) return [3, ...getPrimeFactors(n/3)];
  if (n % 5 === 0) return [5, ...getPrimeFactors(n/5)];
  let prime = 7;
  let step = 4;
  const limit = Math.sqrt(n);
  while (prime <= limit) {
    if (n % prime === 0) return [prime, ...getPrimeFactors(n/prime)];
    prime += step;
    step = 6 - step;
  }
  return [n];
};

// JavaScript Array permutation generator
// (optimized from CoffeeScript output: see ArrayPermutation.coffee)
(() => {
  const generatePermutation = (perm, pre, post, n) => {
    let elem, i, rest, len;
    if (n > 0) {
      for (i = 0, len = post.length; i < len; ++i) {
        rest = post.slice(0);
        elem = rest.splice(i, 1);
        generatePermutation(perm, pre.concat(elem), rest, n - 1);
      }
    } else {
      perm.push(pre);
    }
  };

  /*
  extend Array.prototype
  e.g. [0, 1, 2].permutation(2)
  => [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]
  */
  Array.prototype.permutation = function(n) {
    if (n == null) n = this.length;
    let perm = [];
    generatePermutation(perm, [], this, n);
    return perm;
  };
})();

const sortAsc = arr => arr.sort((a, b) => a - b)
const sortDesc = arr => sortAsc(arr).reverse()

const uniq = (items, key) => {
  let set = {};
  // let key = [].join;
  return items.filter(item => {
    let k = key ? key.apply(item) : item;
    return k in set ? false : (set[k] = true);
  });
};

let pairedArray = uniq([2, 2, 5, 7].permutation(), [].join).map(arr => {
  let pair = [];
  let mid = arr.length % 2 !== 0 ? arr.pop() : 1 ;
  pair.push(arr.shift() * arr.pop());
  pair.push(arr.shift() * arr.pop());
  return (sortAsc(pair));
});

// console.log(pairedArray);
// console.log(uniq(pairedArray, [].join));

const selectedAspectPairs = arrs => {
  let obj = {}
  arrs.forEach( arr => obj[Math.abs(arr[0] - arr[1])] = arr)
  return obj[Math.min(...Object.keys(obj))]
}

const calculateMazeAspect = arrs => {
  let odd, mid
  let options = []
  // odd = arrs[0].length % 2 !== 0 ? true : false
  for (arr of arrs) {
    let option = []
    while (arr.length !== 0) {
      if (arr.length === 1) {
         option = sortAsc(option)
         option[0] = option[0] * arr.pop()
      } else {
        option.push(arr.pop() * arr.pop())
      }
    }
    options.push(option)
  }
  return uniq(options, [].join)
};

const generateEmptyArray = arr => {
  return new Array(arr[1]).fill(new Array(arr[0]));
};

const fillArray = arr => {
	return arr.map(x => new Array(x.length).fill('ほ'))
};


const moveUp = position => {
  return {
    x: position.x,
    y: position.y - 1
  }
}

const moveLeft = position => {
  return {
    x: position.x - 1,
    y: position.y
  }
}

const moveDown = position => {
  return {
    x: position.x,
    y: position.y + 1
  }
}


const moveRight = position => {
  return {
    x: position.x + 1,
    y: position.y
  }
}

const searchAround = (maze, position) => {
  return [
    moveUp(position),
    moveLeft(position),
    moveDown(position),
    moveRight(position),
  ].filter( dir => {
    if (!maze[dir.y]) return false
    if (!maze[dir.y][dir.x]) return false
    return maze[dir.y][dir.x] === 'ほ'
  })
}

const selectDirection = (maze, position) => {
  return searchAround(maze, position).pop()
}

const recursiveFillMaze = (maze, position = { x: 0, y: 0 }) => {
  return maze
}

// let testText = '黒猫列車はお客様第一'
let testText = '銀河を繋ぐ黒猫列車、本日ひとりめのお客様がご乗車ですっ'
let testArray = [...testText]

const fillAGrid = (maze, road, position = { x: 0, y: 0 }) => {
  if (road.length === 0) {
    return maze
  } else {
    maze[position.y][position.x] = road.shift()
    return fillAGrid(maze, road, selectDirection(maze, position))
  }
}

const toMaze = arr => {
	return arr.map(x => x.join(''))
}

// console.log((getPrimeFactors(countMazeGrid(text, cipher)).permutation()))
// console.log(uniq(getPrimeFactors(countMazeGrid(text, cipher)).permutation(), [].join))

// console.log(
//   '',
//   [...new Array(8).keys()].map(i => { return i + 1 }).join(' '),
//   [...new Array(3).keys()].map(i => { return i + 9 }).join(''),
// );

const aspect = sortAsc(selectedAspectPairs(calculateMazeAspect(uniq(getPrimeFactors(
  countMazeGrid(text, cipher)
  // 108
).permutation(), [].join))))

const result = fillArray(generateEmptyArray(aspect))
// console.log(result[0]);
const resultCopy = result.map(x => x)
const nyan = fillAGrid(resultCopy, testArray)

toMaze(nyan).forEach( (x,i) => {
	console.log(x, i+1);
})
