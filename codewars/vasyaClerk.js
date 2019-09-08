function tickets(peopleInLine){
    // treat the obvious case
    if (peopleInLine[0] > 25) {
        return 'NO';
    }

    // create the cashier, we have only 25 in with the first client
    let c25 = 1;
    let c50 = 0;
    let c100 = 0;

    for (let i=1; i < peopleInLine.length; i++) {
        if (peopleInLine[i] == 25) {
            c25++;
            continue;
        }
        if (peopleInLine[i] == 50 ) {
            if (c25 >= 1) {
                c25--;
                c50++;
                continue;
            } else {
                return 'NO';
            }
        }
        if (peopleInLine[i] == 100 ) {
            // we try in priority to give back
            // the highest bill change
            if (c50 >= 1 && c25 >= 1) {
                c100++;
                c50--;
                c25--;
                continue;
            }
            // let's try with the smaller change
            if (c25 >=3) {
                c25 -= 3;
                c100++;
                continue;
            }
            return 'NO';
        }
    }
    return 'YES';
}

console.log(tickets([25, 25, 50, 50]));
console.log(tickets([25, 100]));

/**
 * 
 * One interesting solution on
 * 
 * https://www.codewars.com/kata/555615a77ebc7c2c8a0000b8/train/javascript
 * 
 * function Clerk(name) {
  this.name = name;
  
  this.money = {
    25 : 0,
    50 : 0,
    100: 0 
  };
  
  this.sell = function(element, index, array) {
    this.money[element]++;

    switch (element) {
      case 25:
        return true;
      case 50:
        this.money[25]--;
        break;
      case 100:
        this.money[50] ? this.money[50]-- : this.money[25] -= 2;
        this.money[25]--;
        break;
    }
    return this.money[25] >= 0;
  };
}

function tickets(peopleInLine){
  var vasya = new Clerk("Vasya");
  return peopleInLine.every(vasya.sell.bind(vasya)) ? "YES" : "NO";
}
 */