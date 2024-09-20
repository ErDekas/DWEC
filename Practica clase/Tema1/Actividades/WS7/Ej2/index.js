function addOnlyNums(...args){
    return args.filter(arg => typeof arg === 'number').reduce((accumulator, currentvalue)=> accumulator + currentvalue, 0);
}