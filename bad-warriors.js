/*Jovan Grujic*/
window.onload = init;
function init(){//initialize the program 
    document.getElementById("add_warrior").onclick = checkWarriorConstraints;
    var warriors = []

    function checkWarriorConstraints(){//one function to check if all input values are compatible
		var allegiance = document.getElementById("allegiance").value.toLowerCase();
		var armored = document.getElementById("armored").value.toLowerCase();
		var weapon1 = document.getElementById("weapon1").value.toLowerCase();
		var weapon2 = document.getElementById("weapon2").value.toLowerCase();
		isArmored();
				        
        switch (allegiance){//check if user input for allegiance is correct
            case "khorne" :
                var ready = true;
                break;
            case "slaanesh" :
                ready = true;
                break;
            case "nurgle" :
                ready = true;
                break;
            case "tzeentch" :
                ready = true;
                break;
            default :
                alert("Choose a correct allegiance");
                break;
                ready = false;
        }//allegiance
        
        switch (weapon1){//check if user input for weapon 1 is correct
            case "chainsword" :
                ready = true;
                break;
            case "plasma cannon" :
                ready = true;
                break;
            case "bolt rifle" :
                ready = true;
                break;
            case "magic" :
                ready = true;
                break;
            case "corruption" :
                ready = true;
                break;
            case "" :
                ready = true;
                break;    
            default :
                alert("Choose a correct weapon");
                break;
                ready = false;
        }//weapon1
                
        switch (weapon2){//check if user input for weapon 2 is correct
            case "chainsword" :
                ready = true;
                break;
            case "plasma cannon" :
                ready = true;
                break;
            case "bolt rifle" :
                ready = true;
                break;
            case "magic" :
                ready = true;
                break;             
            case "corruption" :
                ready = true;
                break;
            case "" :
                ready = true;
                break;    
            default :
                alert("Choose a correct weapon");
                break;
                ready = false;
        }//weapon2
        
        if (weapon1 === "" && weapon2 === ""){//check if both weapon input boxes are empty
            alert("Warrior must have at least one weapon");
            throw new Error("Insufficient weapons");
            ready = false;
        }
        else{
            ready = true;
        }//Weapon input
        
        if (allegiance == "khorne" && (weapon1 !== "chainsword" && weapon2 !== "chainsword")){//check if Khorne is carrying chainswords
            alert("Warriors with an allegiance of Khorne can only carry Chainswords");
            ready = false;
        }
        else if (allegiance == "khorne" && ((weapon1 === "chainsword" && weapon2 === "") || (weapon1 === "chainsword" && weapon2 === "chainsword") || (weapon1 === "" && weapon2 === "chainsword"))){
            ready = true;
        }
        else if (allegiance !== "khorne"){
            ready = true;
        }
        else{
            ready = false;
        }//Khorne/Chainsword
        
        if (allegiance === "tzeentch" && (weapon1 === "magic" || weapon2 === "magic")){//Check if magic carrying warrior is in allegiance with Tzeentch
            ready = true;
        }
        else if(allegiance !== "tzeentch" && (weapon1 === "magic" || weapon2 === "magic")){
            alert("Only warriors with an allegiance of Tzeentch can use Magic");
            ready = false;
        }
        else{
            ready = true;
        }//Magic/Tzeentch
        
        if(allegiance === "slaanesh" && armored == "no"){//Check if Slaanesh is armored
            ready = true;
        }
        else if(allegiance === "slaanesh" && armored == "yes"){
            ready = false;
            alert("Warriors with an allegiance to Slaanesh cannot wear armor.");
        }//Slaanesh/Armored
        
        if(allegiance === "nurgle" && (weapon1 === "corruption" || weapon2 === "corruption")){//Check if Nurgle is carrying corruption
            ready = true;
        }
        else if(allegiance === "nurgle" && !(weapon1 === "corruption" || weapon2 === "corruption")){
            ready = false;
        }//Nurgle/Corruption
        
        end();//Upon checking everything, execute store the warrior in the warriors array
        
		function end(){//subfunction for storing the current warrior into warriors array
            if(ready === true){
                var current_warrior = new Warrior(allegiance, armored, weapon1, weapon2);
                warriors.push(current_warrior);
                document.getElementById("deploy_squad").onclick = iterateWarriors;
            }
            else{
                throw new Error("Invalid input");
            }
        }//end
	}
	
    function isArmored(){//check if the warrior is armored
        if (armored.value == "Yes" || armored.value == "yes"){
            return true;
            
        }
        else if (armored.value == "No" || armored.value == "no"){
            return false;
        }
        else {
            alert("Please enter Yes/No in the Armored Box");
            throw new Error("Please enter Yes/No in the Armored Box");
        }
    }//isArmored
	
    function iterateWarriors(){//Make sure there are at least three entries before deploying the squad
        if(warriors.length < 3){
            alert("Please add at least three wariors before deployment");
        }
        else{
            var i = 0;
            while(i < warriors.length){
                deploySquad(warriors[i]);
                i++;
            }
            warriors = [];
        }
    }//iterateWarriors
	
    function deploySquad(warrior){//Populate the table with warriors from the warriors array
        var warrior_table = document.getElementById("warrior_table");
        var row = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        
        td1.innerHTML = warrior.allegiance.charAt(0).toUpperCase() + warrior.allegiance.slice(1);
        td2.innerHTML = warrior.armored.charAt(0).toUpperCase() + warrior.armored.slice(1);
        td3.innerHTML = warrior.weapon1.charAt(0).toUpperCase() + warrior.weapon1.slice(1);
        td4.innerHTML = warrior.weapon2.charAt(0).toUpperCase() + warrior.weapon2.slice(1);
        
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        warrior_table.appendChild(row);
    }//deploySquad
	
    function Warrior(a, b, c, d){//constructor
        this.allegiance = a;
        this.armored = b;
        this.weapon1 = c;
        this.weapon2 = d;
    }//Warrior
}//init
/*Jovan Grujic*/