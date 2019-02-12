const nullChecker={
    check(val){
        if(val==null){
            res.json('Please enter all the values');
        }
    }
}


module.exports=nullChecker;