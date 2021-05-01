//swaps "value" between "dig1" and "dig2"
const swapNumbers = (value, dig1, dig2) => {
    if (value == dig1) return dig2;
    else if (value == dig2) return dig1;
    
    return value;
}

//calculates the number of first lucky number with the number of digits equal to "digitNumber"
const calculateNindex = (digitNumber) => {
    let total = 0;
    
    for (let i=0; i<digitNumber; i++) total = total+Math.pow(2,i);

    return total;
}

//finds N-th lucky number
const findLuckyNumber = (N) => {
    let digitsNumber = 1; //the number of lucky number's digits
    let sum = N; //auxiliary variable - defines which in sequence is the wanted lucky number
    const digit1 = "4"; //first of lucky digits
    const digit2 = "7"; //the other of lucky digits

    //defining "digitsNumber"
    while (sum-Math.pow(2,digitsNumber) > 0) {
        sum = sum - Math.pow(2,digitsNumber);
        digitsNumber++;
    }

    const whichNumber = sum; //auxilary variable - defines which in sequence of "digitsNumber" luckyNumbers is the wanted lucky number

    //array containing consecutive digits of lucky number
    let luckyNumber = new Array(digitsNumber);
    luckyNumber.fill(digit1,0,digitsNumber);

    //calculating the wanted lucky number
    if (whichNumber > 1) {
        for (let i=0; i<digitsNumber; i++) {
            if ((Math.floor((whichNumber-1)/Math.pow(2,i))%2) == 0) luckyNumber[i] = digit1;
            else luckyNumber[i] = digit2; 
        }
    }

    return luckyNumber;
}

//finds minimum lucky number that has the sum of digits equal to "sum"
const myLuckyNumber = (sum) => {
    const minDigitNumber = Math.ceil(sum/7); //minimum number of digits of lucky number that has the sum of digits equal to "sum"
    const maxDigitNumber = Math.ceil(sum/4); ////maximum number of digits of lucky number that has the sum of digits equal to "sum"
    let nextLuckyNumber; //auxilary variable - contains subsequent numbers to be checked 
    let sumOfDigits = 0; //auxilary variable - contains sum of digits of lucky number
    let length; //auxilary variable - contains length of lucky number
    
    let numberOfLuckyNumber; //number of the subsequent lucky number

    //finding if any luckynumber with number of digits between "minDigitNumber" and "maxDigitNumber" meets the requirements
    for (let dig=minDigitNumber; dig<=maxDigitNumber; dig++)
    {
        numberOfLuckyNumber = calculateNindex(dig);
        sumOfDigits = 0;

        while (sum > sumOfDigits) {
            nextLuckyNumber = findLuckyNumber(numberOfLuckyNumber);
            length = nextLuckyNumber.length;
            sumOfDigits = 0;
    
            for (let i=0; i<length; i++) sumOfDigits = sumOfDigits+parseInt(nextLuckyNumber[i]);
    
            if (sum == sumOfDigits) return (nextLuckyNumber.reverse().join(""));
            numberOfLuckyNumber++;
        }
    }

    return "-1"; 
}

console.log(myLuckyNumber(100));

/*
---LUCKY NUMBERS---
subsequent lucky numbers:
1:  4
2:  7
3:  44
4:  47
5:  74
6:  77
7:  444
8:  447
9:  474
10: 477
11: 744
12: 747
13: 774
14: 777
15: 4444
16: 4447
17: 4474
18: 4477
19: 4744
20: 4747
21: 4774
22: 4777
23: ...

1 digit - 2 numbers (2^1)
2 digits - 4 numbers (2^2)
3 digits - 8 numbers (2^3)
4 digits - 16 numbers (2^4)
5 digits - ...
---LUCKY NUMBERS---
*/