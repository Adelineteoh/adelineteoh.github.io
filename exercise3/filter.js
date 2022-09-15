function filterCategory(filterSelection, filterBy){
    //filterSelection is Category, filterBy is thing to match//
    let itemsToFilter = Array.from(document.getElementsByClassName("RecipeCardWrapper"))
    for(let listItem of itemsToFilter){
        if(listItem.dataset[filterSelection] === filterBy){
            listItem.style.display = "flex";
        } else{
            listItem.style.display = "none";
        }
    }
}
