class InputValidator {
    static isEmpty(val){
        if(val === null || val === ''){
            return true;
        }
        return false;
    } 

    static equal(first,second){
        if(first === second){
            return true;
        }
        return false;
    }
}