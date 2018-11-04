cells = document.getElementsByClassName("cell")
char = ["X", "O"]
color = ["black", "rgb(59, 84, 116)"]
conf = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"]
]
line = document.getElementById("win-line")

function init() {
    char = ["X", "O"]
    color = ["black", "rgb(59, 84, 116)"]
    conf = [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"]
    ]
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
    }
    line.style.display = "none"
    line.style.transform = "none"
    start()
}
start()

function start() {
    for (var i = 0; i < cells.length; i++) {
        const element = cells[i];
        element.onclick = function () {
            makeMove(this)
            var best = findBestMove()
            console.log(best);
            if (evaluate()) return;
            makeMove(cells[best.row * 3 + best.col])
            evaluate()
        }
    }
}

function makeMove(elem) {
    var index = elem.getAttribute("data-index")
    elem.onclick = ""
    elem.innerHTML = char[0]
    conf[parseInt(index / 3)][parseInt(index % 3)] = char[0]
    elem.style.color = color[0]
    var c = ""
    char.push(c = char.shift())
    color.push(c = color.shift())
}

function finish(pos) {
    line.style.display = "block"
    line.style.borderColor = color[1]
    for (const key in pos) {
        if (key === "rotate") {
            line.style.transform = "rotate(" + pos.rotate + "deg)"
            continue
        }
        line.style[key] = pos[key] + "%"
    }
    for (var i = 0; i < cells.length; i++) {
        const element = cells[i];
        element.onclick = function () {
            this.onclick = ""
        }
    }
}


function evaluate() {

    for (let index = 0; index < 3; index++) {
        if (conf[index][0] != "_" && conf[index][0] == conf[index][1] && conf[index][1] == conf[index][2]) {
            finish({
                left: 0,
                right: 0,
                top: index * 33 + 31 / 2,
                width: 200

            })
            return conf[index][0] === "X" ? -10 : 10;
        }
    }
    for (let index = 0; index < 3; index++) {
        if (conf[0][index] != "_" && conf[0][index] == conf[1][index] && conf[1][index] == conf[2][index]) {
            finish({
                top: 0,
                bottom: 0,
                left: index * 33 + 31 / 2,
                height: 200
            })
            return conf[0][index] === "X" ? -10 : 10;
        }
    }

    if (conf[0][0] != "_" && conf[0][0] == conf[1][1] && conf[1][1] == conf[2][2]) {
        finish({
            top: 0,
            bottom: 0,
            left: 0,
            rotate: -45,
            height: 200

        })

        return conf[0][0] === "X" ? -10 : 10;

    }

    if (conf[0][2] != "_" && conf[0][2] == conf[1][1] && conf[1][1] == conf[2][0]) {
        finish({
            top: 0,
            bottom: 0,
            right: 0,
            rotate: 45,
            height: 200
        })

        return conf[0][2] === "X" ? -10 : 10;

    }
    return 0
}

function evaluate2() {

    for (let index = 0; index < 3; index++) {
        if (conf[index][0] != "_" &&
            conf[index][0] == conf[index][1] &&
            conf[index][1] == conf[index][2]) {
            return conf[index][0] === "X" ? -10 : 10;
        }
    }
    for (let index = 0; index < 3; index++) {
        if (conf[0][index] != "_" &&
            conf[0][index] == conf[1][index] &&
            conf[1][index] == conf[2][index]) {
            return conf[0][index] === "X" ? -10 : 10;
        }
    }
    if (conf[0][0] != "_" &&
        conf[0][0] == conf[1][1] &&
        conf[1][1] == conf[2][2]) {
        return conf[0][0] === "X" ? -10 : 10;
    }
    if (conf[0][2] != "_" &&
        conf[0][2] == conf[1][1] &&
        conf[1][1] == conf[2][0]) {
        return conf[0][2] === "X" ? -10 : 10;
    }
    return 0
}

function isLeft() {

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (conf[i][j] === "_") return true
        }
    }
    return false
}

function max(a, b) {
    return a > b ? a : b
}

function min(a, b) {
    return a < b ? a : b
}

function minimax(mode, depth) {
    var score = evaluate2()
    if (score != 0) return score
    if (!isLeft()) {
        return 0
    }
    if (mode) {
        var best = -11111
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (conf[i][j] === "_") {
                    conf[i][j] = "O";
                    best = max(best, minimax(0, depth + 1));
                    conf[i][j] = "_";
                }
            }
        }
        return best;
    } else {
        var best = 1000;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (conf[i][j] == "_") {
                    conf[i][j] = "X";
                    best = min(best, minimax(1, depth + 1));
                    conf[i][j] = "_";
                }
            }
        }
        return best;
    }
}

function findBestMove() {
    var bestMove = {
        row: -1,
        col: -1
    }
    var bestVal = -1000
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (conf[i][j] == "_") {
                conf[i][j] = "O";
                var moveVal = minimax(0, 0);
                conf[i][j] = "_";
                if (moveVal > bestVal) {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    return bestMove;
}