function squareAndSum(...args){
    return args.map(arg => arg**2).reduce((acc, num) => acc + num, 0)
}