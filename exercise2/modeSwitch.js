let IsDarkMode = false;

/*document.getElementById("bio").style.backgroundColor="red";*/

function switchModes(){
    if(IsDarkMode === false){
        document.documentElement.style.setProperty("--col-01", "#f6b5f5");
        document.documentElement.style.setProperty("--col-02", "#570033");
        document.getElementById("modeButton").innerHTML = "Light Mode";
        document.documentElement.style.setProperty("--dark-mode", "--light-mode");
        IsDarkMode = true;
    } else {
        document.documentElement.style.setProperty("--col-01", "#570033");
        document.documentElement.style.setProperty("--col-02", "#f6b5f5");
        document.getElementById("modeButton").innerHTML = "Dark Mode";
        document.documentElement.style.setProperty("--light-mode", "--dark-mode");
        IsDarkMode = false;
    }
}
