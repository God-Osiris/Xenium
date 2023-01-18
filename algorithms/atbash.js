const atbashKey = {
    "A": "Z",
    "B": "Y",
    "C": "X",
    "D": "W",
    "E": "V",
    "F": "U",
    "G": "T",
    "H": "S",
    "I": "R",
    "J": "Q",
    "K": "P",
    "L": "O",
    "M": "N",
    "N": "M",
    "O": "L",
    "P": "K",
    "Q": "J",
    "R": "I",
    "S": "H",
    "T": "G",
    "U": "F",
    "V": "E",
    "W": "D",
    "X": "C",
    "Y": "B",
    "Z": "A",
}

module.exports = {
    atbash: function(text){
        const textArray = Array.from(text.toUpperCase())
        for(var i = 0; i < textArray.length; i++){
            if(textArray[i] in atbashKey){
                textArray[i] = atbashKey[textArray[i]]
            } else {
                continue
            }
        }
        const result = textArray.join("")
        return result
    }
}