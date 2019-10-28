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

var tail_recursion = function(func) {
    var is_first = true;
    var cont = {};
    var saved_args;
    var _in = function() {
        if (is_first) {
            var args = arguments;
            while (true) {
                is_first = false;
                var result = func.apply(null, args);
                if (result === cont) {
                    args = saved_args;
                    is_first = true;

                } else {
                    is_first = true;
                    return result;
                }
            }
        } else {
            saved_args = arguments;
            return cont;
        }
    };
    return _in;
};

const trampoline = (fn) => {
  return (...args) => {
    let result = fn(...args);
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  };
}

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

const shuffle = arr => {
  let i, j, temp;
  arr = arr.slice();
  i = arr.length;
  if (i === 0) return arr
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

const selectedAspectPairs = arrs => {
  let obj = {}
  arrs.forEach( arr => obj[Math.abs(arr[0] - arr[1])] = arr)
  return obj[Math.min(...Object.keys(obj))]
}

const calculateMazeAspect = arrs => {
  let options = []
  if (arrs.length < 3) return arrs
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
  // before
  // fillにそのままオブジェクトを渡してはダメです
  // return arr.map(x => new Array(x.length).fill({char: 'ほ', blacklist: []}))

  // after
  // fillで埋めたあとにmapでオブジェクトで埋めてあげるといい感じ
	return arr.map(x => [...Array(x.length)].map(_=>({char: 'ほ', blacklist: []})))
};

const generateFilledArray = arr => {
  return [...Array(arr[1])].map(_=>[...Array(arr[0])].map(_=>({char: 'ほ', blacklist: []})))
}

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
    return !(maze[position.y][position.x]['blacklist'].map( x => JSON.stringify(x)).includes(JSON.stringify(dir))) && maze[dir.y][dir.x]['char'] === 'ほ'
    // return maze[dir.y][dir.x]['char'] === 'ほ'
  })
}

const selectDirection = (maze, position) => {
  return shuffle(searchAround(maze, position)).pop()
}

// const testText = '黒猫列車はお客様第一'
const testText = '銀河を繋ぐ黒猫列車、本日ひとりめのお客様がご乗車ですっ'
const testArray = [...testText]

const resetArgs = () => {
  console.log('リセットします');
  return fillAGrid(result, [...text], [] ,{ x: 0, y: 0 })
}

const goBack = (maze, will, position, memory) => {
  console.log('もどります');
  if (memory.length === 0) display(maze);
  console.log(memory);
  const memo = memory.pop()
  console.log(memory, memo);
  maze[memo.y][memo.x]['blacklist'].push(position)
  will.unshift(maze[position.y][position.x]['char'])
  maze[position.y][position.x]['char'] = 'ほ'
  return fillAGrid(maze, will, memo)
}

const fillAGrid = (maze, will, position = { x: 0, y: 0 }, memory = []) => {
  try {
    // if (will.length === 0) return maze
    if (will.length === 0) {
      return maze
    }
    maze[position.y][position.x]['char'] = will.shift()
    
    // ここで一歩もどってブラックリストを作りたい
    if (searchAround(maze, position).length === 0) return goBack(maze, will, position, memory)
    // if (searchAround(maze, position).length === 0) return trampoline(resetArgs())
    memory.push(position)
    if (memory.length === 0) display(maze);
    return fillAGrid(maze, will, selectDirection(maze, position), memory)
  } catch (e) {
    console.error(e);
  }
}

// fillAGrid = tail_recursion(fillAGrid)

const toMaze = arr => {
	return arr.map(x => x.join(''))
}

const display = array => {
  array.forEach( (arr,i) => {
    console.log(
      arr.map((x,i) => x.char).join(''),
      i
    );
  })
}

// const result = fillArray(generateEmptyArray(aspect))
// console.log(result[0]);

const result = fillArray(generateEmptyArray(sortAsc(
  // selectedAspectPairs(calculateMazeAspect(uniq(getPrimeFactors(
  // countMazeGrid(text, cipher)
  // ).permutation(), [].join)))
  [10,10]
)))

const nyan = fillAGrid(result, testArray)

// console.log(typeof nyan);
nyan.forEach( (arr,i) => {
	console.log(
    arr.map((x,i) => x.char).join(''),
    // i
  );
})

// console.log(
//   generateFilledArray([10,10])
// );
