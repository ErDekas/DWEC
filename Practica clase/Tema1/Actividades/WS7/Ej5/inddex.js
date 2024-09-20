function sumEveryOther(...args){
    return args.filter((_, index) => index%2===0).reduce((acc, num)=>acc+num,0);
}