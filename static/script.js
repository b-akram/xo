var cells = document.getElementsByClassName("cell")
var char = ["X", "O"]

var color = ["black", "rgb(61, 79, 100)"]

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
        var c = char.shift()
        char.push(c)
        c = color.shift()
        color.push(c)
        count++
        if (count == 9) finish()
    }
}

function finish(){
    console.log("finished");
}