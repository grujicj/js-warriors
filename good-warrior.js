window.onload = init;

function init(){
    //global array
    var warriors = [];
    
    var valid_allegiances = ["Khorne", "Tzeentch", "Slaanesh", "Nurgle"];
    var valid_armored = ["Yes", "No"];
    var valid_weapons = ["Chainsword", "Magic", "Corruption", "Bolt Rifle", "Plasma Cannon"];
    
    document.getElementById("add_warrior").onclick = addWarrior;
    document. getElementById("deploy_squad").onclick = deploySquad;
    document. getElementById("gen_random_warrior").onclick = getRandomWarrior;
    
    function addWarrior(){
        var allegiance_text = document.getElementById("allegiance").value;
		var armored_text = document.getElementById("armored").value;
		var weapon1_text = document.getElementById("weapon1").value;
		var weapon2_text = document.getElementById("weapon2").value;
        
        var weapons = [];
        if(weapon1_text != "")
            weapons.push(weapon1_text);
        if(weapon2_text != "")
            weapons.push(weapon2_text);
        var ret = checkWarriorConstraints(allegiance_text, armored_text, weapons);
        
        if(ret == ""){
            warriors.push(new Warrior(allegiance_text, armored_text, weapons));
        }
        else{
            alert(ret);
        }

    }
    
    function checkWarriorConstraints(allegiance, armored, weapons){
        var alert_string = "";
        
        if(!valid_allegiances.includes(allegiance)){
            alert_string += "Invalid allegiance " + allegiance + "\n";
        }
        
        if(!valid_armored.includes(armored)){
            alert_string += "Armored must be Yes or No \n";
        }
        
        if(weapons.length == 0){
            alert_string += "Must have at least one weapon \n";
        }
        
        /* for(var i = 0; i < weapons.length; i++){
            if(!valid_weapons.includes(weapons[i])){
                alert_string += "Weapon type must be one of " + valid_weapons + "\n";
            }
        } */
        
        if(!weapons.every(function (w) {return valid_weapons.includes(w);})){
            alert_string += "Weapon type must be one of " + valid_weapons + "\n";
        }
        
        if(allegiance != "Tzeentch" && weapons.includes("Magic")){
            alert_string += "Only Tzeentch can use Magic\n"
        }
        
        if(allegiance == "Khorne" && weapons.every(function(w) {return w == "Chainsword";})){
            alert_string += "Khorne warriors must use Chainswords\n";
        }
        
        /* if(allegiance == "Khorne"){//Same thing as the one above
            for(var i = 0; i < warriors.length; i++){
                if(weapons[i] == "Chainsword"){
                    alert_string += "Khorne warriors must use Chainswords\n";
                }
            }
        } */
        
        if(allegiance == "Slaanesh" && armored == "Yes"){
            alert_string += "Slaanesh can't wear armor\n";
        }
        
        if(allegiance == "Nurgle" && !weapons.includes("Corruption")){
            alert_string += "Nurgle must use corruption for at least one weapon\n";
        }
        
        return alert_string;
    }
    
    function Warrior(allegiance, armored, weapons){//constructor
        this.allegiance = allegiance;
        
        if(armored == "Yes"){
            this.armored = true;
        }
        else{
            this.armored = false;
        }
        
        this.weapons = weapons;
        
        this.isArmored = function(){
            if(this.armored){
                return "Yes";
            }
            return "No";
        }
    }
    
    function deploySquad(){
        if(warriors.length >= 3){  
            var squad_table = document.getElementById("warrior_table");
            while(warriors.length){
                var warrior = warriors.pop();
                
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");
                var td4 = document.createElement("td");
                
                td1.innerHTML = warrior.allegiance;
                td2.innerHTML = warrior.isArmored();
                td3.innerHTML = warrior.weapons[0];
                if(warrior.weapons.length == 2){
                    td4.innerHTML = warrior.weapons[1];
                }
                
                var row = document.createElement("tr");
                
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                squad_table.appendChild(row);
            }
        }
        else{
            alert("You must create at least 3 warriors before deploying\n Current warriors: " + warriors.length);
        }
    }
    
    function getRandomWarrior(){
        var allegiance;
        var armored;
        var num_weapons;
        var weapons = [];
        var iterations = 0;
        
        do{
            iterations++;
            allegiance = valid_allegiances[Math.floor(Math.random() * valid_allegiances.length)];
            armored = valid_armored[Math.floor(Math.random() * valid_armored.length)];
            num_weapons = Math.floor(Math.random() * 2 + 1);
            weapons = [];
            for(var i = 0; i < num_weapons; i++){
                weapons.push(valid_weapons[Math.floor(Math.random() * valid_weapons.length)]);
            }
        }while(checkWarriorConstraints(allegiance, armored, weapons) != "")
            
        alert(iterations);
        
        document.getElementById("allegiance").value = allegiance;
		document.getElementById("armored").value = armored;
		document.getElementById("weapon1").value = weapons[0];
        if(weapons == 2)
            document.getElementById("weapon2").value = weapons[1];
        else
            document.getElementById("weapon2").value = "";
    }
}