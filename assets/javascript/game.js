
      // create the character array
      var characters = [
        {name: "Obi-Wan Kenobi", image: "0.PNG", points: 120, attackPower: 8, isChar: false, isEnemies: false, isDefender: false},
        {name: "Luke Skywalker", image: "1.PNG", points: 100, attackPower: 5, isChar: false, isEnemies: false, isDefender: false},
        {name: "Darth Sidious", image: "2.PNG", points: 150, attackPower: 15, isChar: false, isEnemies: false, isDefender: false},
        {name: "Darth Maul", image: "3.PNG", points: 180, attackPower: 25, isChar: false, isEnemies: false, isDefender: false}
      ];
      
      // boolean to keep track of the character is the selected character and defender
      var bChar = false;
      var bDefender = false;
      var selectedChar;
      var selectedDefender;
      // var selectedCharPoints;
      var currentAttackPower = 0;
      // var selectedDefenderPoints;

      // reset all var and panels
      function reset() {
        $("#restartBtn").hide();
        $("#youAttack").text("");
        $("#defenderAttack").text("");
      }

      // populate the defender panel
      function populateDefenderPanel() {
          // first empty the panel
          $("#defender").empty();
          // call function to re-populate the enemies panel
          populateEnemeriesPanel();
          // populate the defender panel
          for (var i = 0; i < characters.length; i++) {
        
            if(characters[i].isDefender) {
              // create the table which contains the character name, picture and points
              createTable(characters[i], "#defender");
              selectedDefender = characters[i];
              selectedCharPoints = characters[i].points;
            }
          }
      } 

      // dynamically create table which contains the character name, picture and points etc...
      // char: is one of the object in characters[]
      // elementID: the id of the panel in HTML
      function createTable(char, elementId) {
          var container = $('#my-container'),
          temptable = $('<table>');

          var tr = $('<tr>');
          tr.append('<td>' + char.name + '</td>');
          temptable.append(tr);

          var tr2 = $('<tr>');
          var temp = $("<img>");
          temp.attr("src", "assets/images/" + char.image);
          temp.attr("name", char.name);
          temp.attr("points", char.points);
          temp.attr("attackPower", char.attackPower);
          temp.attr("isChar", char.isChar);
          temp.attr("isEnemies", char.isEnemies);
          temp.attr("isDefender", char.isDefender);
          temp.addClass("starWarsChar");

          // populate picture border color based on the flag
          if(char.isEnemies)
            temptable.addClass("enemiesBkgColor");
          // if(char.isDefender)
          //   temptable.addClass("defenderBkgColor");
          // if(char.isChar) {
          //   temptable.addClass("charBkgColor");
          // }
          tr2.append(temp);
          temptable.append(tr2);

          var tr3 = $('<tr>');
          tr3.append('<td>' + char.points + '</td>');
          if(char.isChar) {
            temptable.addClass("charBkgColor");
            tr3.addClass("charPoints");
            currentAttackPower = char.attackPower;
          }
          if(char.isDefender) {
            temptable.addClass("defenderBkgColor");
            tr3.addClass("defenderPoints");
          }
            
          temptable.append(tr3);
          
          $(elementId).append(temptable);
      }

      function populateEnemeriesPanel() {
          $("#enemies").empty();

          for (var i = 0; i < characters.length; i++) {
            
            if(characters[i].isEnemies) {
                createTable(characters[i], "#enemies");

                var enemiesFlag = characters[i].isEnemies;
                // handle onClick event
                $("#enemies").on("click", ".starWarsChar", function() {

                  // if defender character has been selected, return
                  if(bDefender) return;

                  if(enemiesFlag) {
                    // populate the flags isDefender and isEnemies 
                    for(var i=0; i<characters.length; i++ ) {
                      if($(this).attr("name") == characters[i].name) {
                        console.log("match " + $(this).attr("name"));
                        characters[i].isDefender = true;
                        characters[i].isEnemies = false;
                        bDefender = true;
                      } 
                      console.log(characters);
                    };
                  }
                  // players selects a defender, populate the panel
                  populateDefenderPanel();
                });

            }
          }
      }

      function populateCharPanel() {
        
        $("#crystals").empty();

        for (var i = 0; i < characters.length; i++) {
          if(!bChar || characters[i].isChar) {
            // this is the initial scenario OR when user selects the 
            // the character
            createTable(characters[i], "#crystals");
            selectedChar = characters[i];

            $(crystals).on("click", ".starWarsChar", function() {

              if($(this).attr("isDefender") == true) {
                populateDefenderPanel();
              }
              if($(this).attr("isEnemeries") == true) {
                populateEnemeriesPanel();
              }
            });
          }
          
        }
      }
   
      var games = {
          
          restart: function () {
            reset();
          },
          attack: function () {
            if(selectedChar.points > 0) {
              console.log("selectedChar name: " + selectedChar.name);
              
              selectedChar.points = selectedChar.points - selectedDefender.attackPower;
              selectedDefender.points = selectedDefender.points - selectedChar.attackPower;

              $(".charPoints").html("<div>" + selectedChar.points + "</div>");
              $(".defenderPoints").html("<div>" + selectedDefender.points + "</div>");
              console.log("selectedChar points: " + selectedChar.points);
              console.log("selectedChar points: " + selectedDefender.points);
            
              $("#youAttack").text("You attacked " + selectedChar.name + " for " + selectedChar.attackPower + " damage.");
              $("#defenderAttack").text(selectedDefender.name + " attacked you back for " + selectedDefender.attackPower + " damage.");
              selectedChar.attackPower = selectedChar.attackPower + currentAttackPower;
            } else {
              $("#youAttack").text("You been defeated... GAME OVER!!!");
              $("#defenderAttack").text("");
              $("#restartBtn").show();
            }
          },

          start: function () {
            reset();

            var crystals = $("#crystals");
        
            populateCharPanel();

            // This time, our click event applies to every single crystal on the page. Not just one.
            crystals.on("click", ".starWarsChar", function() {

            if(bChar) return;

            console.log("name: " + $(this).attr("name"));
            console.log("points: " + $(this).attr("points"));
            console.log("attackPower: " + $(this).attr("attackPower"));

            for(var i=0; i<characters.length; i++ ) {
              if($(this).attr("name") == characters[i].name) {
                console.log("match " + $(this).attr("name"));
                characters[i].isChar = true;
                bChar = true;
              } else {
                console.log("set enemies flag to true... ");
                characters[i].isEnemies = true;
              }
              console.log(characters);
            };

            // for all the enemies char, move to different area
            populateCharPanel();
            populateEnemeriesPanel();

            });
          },
          
      };

      $(document).ready(function() {
          games.start();
          $("#attackBtn").click(games.attack);
          $("#restartBtn").click(games.restart);
      });

