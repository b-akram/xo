var cells = document.getElementsByClassName("cell")
var char = ["X", "O"]

var color = ["black", "rgb(59, 84, 116)"]

var conf = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"]
]

var count = 0

for (var i = 0; i < cells.length; i++) {
    const element = cells[i];
    element.onclick = function () {
        var index = this.getAttribute("data-index")
        this.onclick = ""
        this.innerHTML = char[0]
        conf[parseInt(index / 3)][parseInt(index % 3)] = char[0]
        this.style.color = color[0]
        var c = ""
        char.push(c =char.shift())
        color.push(c = color.shift())
        evaluate()
        // if (evaluate()) finish()

    }
}

function finish(pos) {
    var line = document.getElementById("win-line")
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