module.exports = {
    railFence: function(text, key, mode) {
        if (mode === 'encrypt') {
          let rail = new Array(key).fill('');
          let row = 0;
          let direction = 1;
          for (let i = 0; i < text.length; i++) {
            rail[row] += text[i];
            if (row === 0) {
              direction = 1;
            } else if (row === key - 1) {
              direction = -1;
            }
            row += direction;
          }
          return rail.join('');
        } else if (mode === 'decrypt') {
          let rail = new Array(key).fill(0).map(() => new Array());
          let index = 0;
          let direction = 1;
          let row = 0;
          for (let i = 0; i < text.length; i++) {
            rail[row][index] = text[i];
            if (row === key - 1) {
              direction = -1;
            } else if (row === 0) {
              direction = 1;
            }
            row += direction;
            index++;
          }
          // get the lengths of each rail
          let railLengths = new Array(key);
          for (let i = 0; i < key; i++) {
            railLengths[i] = rail[i].length;
          }
          // get the original index of each character
          let originalIndex = new Array(text.length);
          let railIndex = new Array(key).fill(0);
          for (let i = 0; i < text.length; i++) {
            let currentRail = 0;
            for (let j = 0; j < key; j++) {
              if (railIndex[j] < railLengths[j]) {
                currentRail = j;
                break;
              }
            }
            originalIndex[i] = rail[currentRail][railIndex[currentRail]];
            railIndex[currentRail]++;
          }
          return originalIndex.join('');
        }
    }
}