
      // create the character array
      var characters = [
        {name: "Obi-Wan Kenobi", image: "0.PNG", points: 120, attackPower: 8, isChar: false, isEnemies: false, isDefender: false},
        {name: "Luke Skywalker", image: "1.PNG", points: 100, attackPower: 5, isChar: false, isEnemies: false, isDefender: false},
        {name: "Darth Sidious", image: "2.PNG", points: 150, attackPower: 20, isChar: false, isEnemies: false, isDefender: false},
        {name: "Darth Maul", image: "3.PNG", points: 180, attackPower: 25, isChar: false, isEnemies: false, isDefender: false}
      ];
      
      // boolean to keep track of the character is the selected character and defender
      var bChar = false;
      var bDefender = false;
      var bGameOver = false;
      var selectedChar;
      var selectedDefender;

      var currentAttackPower = 0;

      var orgPoint = [];
      var orgCharPower;
      // var selectedDefenderPoints;

      // reset all var and panels
      function reset() {
        $("#restartBtn").hide();
        $("#youAttack").text("");
        $("#defenderAttack").text("");
        bChar = false;
        bDefender = false;
        $("#enemies").empty();
        $("#defender").empty();

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

            }
          }
          $("#youAttack").text("");
              
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

          tr2.append(temp);
          temptable.append(tr2);

          var tr3 = $('<tr>');
          tr3.append('<td>' + char.points + '</td>');
          if(char.isChar) {
            temptable.addClass("charBkgColor");
            tr3.addClass("charPoints");
            currentAttackPower = char.attackPower;
            orgCharPoint = char.points;
            orgCharPower = char.attackPower;
          }
          if(char.isDefender) {
            temptable.addClass("defenderBkgColor");
            tr3.addClass("defenderPoints");
            orgDefenderPoint = char.points;
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
            orgPoint[i] = characters[i].points;

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
            
            selectedChar.isChar = false;
            selectedDefender.isDefender = false;
            bGameOver = false;
            
            for (var i = 0; i < characters.length; i++) {
                characters[i].isChar = false;
                characters[i].isEnemies = false;
                characters[i].isDefender = false;
                characters[i].points = orgPoint[i];
                if(selectedChar.name == characters[i].name) {
                  $(".charPoints").html("<div>" + characters[i].points + "</div>");
                  selectedChar.attackPower = orgCharPower;
                }
                if(selectedDefender.name == characters[i].name) {
                  $(".defenderPoints").html("<div>" + characters[i].points + "</div>");
                }
            }
            games.start();
          },
          attack: function () {

            if(bGameOver) return;

            if(!bDefender) {
              $("#youAttack").text("No enemy here.");
              return;
            }

            console.log("selectedChar points: " + selectedChar.points);
            console.log("selectedDefender points: " + selectedDefender.points);

            if(selectedDefender.points < 0) {
              $("#youAttack").text("You have defeated " + selectedDefender.name + ", you can choose to fight anothers enemy.");
              $("#defenderAttack").text("");
              $("#defender").empty();
              bDefender = false;
              selectedDefender.isDefender = false;
              console.log(characters);
            } else {
              console.log("selectedChar name: " + selectedChar.name);
              console.log("electedDefender.attackPower: " + selectedDefender.attackPower);

              selectedChar.points = selectedChar.points - selectedDefender.attackPower;
              selectedDefender.points = selectedDefender.points - selectedChar.attackPower;

              $(".charPoints").html("<div>" + selectedChar.points + "</div>");
              $(".defenderPoints").html("<div>" + selectedDefender.points + "</div>");
              console.log("inside else: selectedChar points: " + selectedChar.points);
              console.log("inside else: selectedDefender points: " + selectedDefender.points);
              
              $("#youAttack").text("You attacked " + selectedDefender.name + " for " + selectedChar.attackPower + " damage.");
              $("#defenderAttack").text(selectedDefender.name + " attacked you back for " + selectedDefender.attackPower + " damage.");
              selectedChar.attackPower = selectedChar.attackPower + currentAttackPower;

              if(selectedChar.points <= 0) {
                $("#youAttack").text("You been defeated... GAME OVER!!!");
                $("#defenderAttack").text("");
                $("#restartBtn").show();
                bGameOver = true;
                console.log("bGameOver: " + bGameOver);
              }
              if(selectedDefender.points < 0) {
                $("#youAttack").text("You have defeated " + selectedDefender.name + ", you can choose to fight anothers enemy.");
                $("#defenderAttack").text("");
                $("#defender").empty();
                
                if($("#enemies").html().length == 0) {
                  $("#youAttack").text("You WON!!! Game Over.");
                  $("#startBtn").show;
                }
                selectedChar.points = selectedChar.points + selectedDefender.attackPower;
                $(".charPoints").html("<div>" + selectedChar.points + "</div>");
                bGameOver = false;
                bDefender = false;
                selectedDefender.isDefender = false;
               
              }
            }
            
          },

          start: function () {
            reset();

            var crystals = $("#crystals");
        
            populateCharPanel();

            // This time, our click event applies to every single crystal on the page. Not just one.
            crystals.on("click", ".starWarsChar", function() {

            if(bChar) return;

            // console.log("name: " + $(this).attr("name"));
            // console.log("points: " + $(this).attr("points"));
            // console.log("attackPower: " + $(this).attr("attackPower"));

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

