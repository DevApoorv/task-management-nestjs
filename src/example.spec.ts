function addNumbers(num1,num2){
    return num1+num2;
}

describe('add numbers test', ()=>{
    it('adds two numbers',()=>{
        expect(addNumbers(2,2)).toEqual(4);
    });
});