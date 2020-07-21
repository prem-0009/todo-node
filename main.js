const fs = require('fs');
const file = fs.readFileSync("./todos.csv", "utf-8");
//to edit the csv file

const readline = require('readline');
const interface = readline.createInterface({input: process.stdin, output: process.stdout})



//split csv file to an array and display todos

const newArr=[];
const displayTodos = function(){
    console.clear();
    const arr2d = file.split('\n')
    
    // console.log(arr2d)
    for ( const arr of arr2d){
        newArr.push(arr.split(','))
    
    }

    for(const todo of newArr){
        if ( todo[1]==='uncomplete'){
        console.log(todo[0]+'----'+todo[1]+'✅')
        } else {
            console.log(todo[0]+'----'+todo[1]+'--'+'✖')
        }
    }
    // console.log(newArr)
    return newArr;
}

displayTodos();

const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Mark a todo completed.
4. Mark a todo incomplete.
5. Quit.
`

//user interaction
const handleMenu = function(doIt){
    // console.log(newArr)
    if (doIt === '1'){
        interface.question('Please enter your -todo- list\n', add)
    } 
    else if(doIt ==='2'){
        console.log('display1')
        console.log(display1())
        interface.question('Please pick the one you want to remove\n', remove)
    
    }
    
}

//to add
//don't touch
const userArray = [];//array to add new to do list
const add = function(addToDo){
    userArray.push(addToDo,'incomplete')
    //add new to do list to previous to do list
    newArr.push(userArray);
    console.log('newarr--working array')
    console.log('newArr')
    
    saveTodos();
            
    interface.close();
}

//to save
//don't touch
//join[['hi,there'],['a,c']] to ['hi, there', 'a,c']
const stringArr = [];//array to save , just before sending to csv file
const stringArrShow = [];
const saveTodos = function(){
    //converting ['heelo'] to heelo for csv file
    let i=1;
    for ( arr of newArr){
        stringArrShow.push(i+'. '+arr.toString());
        stringArr.push(arr.toString());
    i++;
    }

    
let displayLines = stringArrShow.join('\n')
    console.log(displayLines);
    //
    let csvLine = stringArr.join('\n')
        
    fs.writeFileSync('./todos.csv', csvLine)
    // console.log('last Array')
    // console.log(csvLine)
}
//for display with number
const display1 = function(){

    let i=1;
    for ( arr of newArr){
        stringArrShow.push(i+'. '+arr.toString());
        stringArr.push(arr.toString());
    i++;
    }

    return stringArrShow.join('').split('\n');
}


const remove = function(index){
    
    for( let i = 0; i < newArr.length; i++){
        if (index = i-1){
            let newArr = newArr.slice(index,1)
        }
    }
    console.log(newArr)
}



interface.question(menu, handleMenu);

