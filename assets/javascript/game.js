
      var characters = [
        {name: "Obi-Wan Kenobi", image: "0.PNG", points: 120, attackPower: 8, isChar: false, isEnemies: false, isDefender: false},
        {name: "Luke Skywalker", image: "1.PNG", points: 100, attackPower: 5, isChar: false, isEnemies: false, isDefender: false},
        {name: "Darth Sidious", image: "2.PNG", points: 150, attackPower: 15, isChar: false, isEnemies: false, isDefender: false},
        {name: "Darth Maul", image: "3.PNG", points: 180, attackPower: 25, isChar: false, isEnemies: false, isDefender: false}
      ];
      
      var bChar = false;
      var bDefender = false;

      function reset() {
        
        
      }

      function populateDefenderPanel() {
          $("#defender").empty();
          populateEnemeriesPanel();

          for (var i = 0; i < characters.length; i++) {
        
            if(characters[i].isDefender) {
              createTable(characters[i], "#defender");
            }

          }

      } 

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

          // populate picture border color
          if(char.isEnemies)
          temp.addClass("enemiesBkgColor");
          if(char.isDefender)
            temp.addClass("defenderBkgColor");
          if(char.isChar)
            temp.addClass("charBkgColor");

          tr2.append(temp);
          temptable.append(tr2);

          var tr3 = $('<tr>');
          tr3.append('<td>' + char.points + '</td>');
          temptable.append(tr3);

          $(elementId).append(temptable);
      }

      function populateEnemeriesPanel() {
          $("#enemies").empty();

          for (var i = 0; i < characters.length; i++) {
            
            if(characters[i].isEnemies) {

                createTable(characters[i], "#enemies");

                var enemiesFlag = characters[i].isEnemies;

                $("#enemies").on("click", ".starWarsChar", function() {

                  if(bDefender) return;

                  if(enemiesFlag) {
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

                  populateDefenderPanel();

                });

            }
          }
      }

      function populateCharPanel() {
        
        $("#crystals").empty();

        for (var i = 0; i < characters.length; i++) {
          if(!bChar) {
          
            createTable(characters[i], "#crystals");

            $(crystals).on("click", ".starWarsChar", function() {

              if($(this).attr("isDefender") == true) {
                populateDefenderPanel();
              }
              if($(this).attr("isEnemeries") == true) {
                populateEnemeriesPanel();
              }


            });
          } else {
            if(characters[i].isChar) {
              createTable(characters[i], "#crystals");

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
      }
   
      var games = {
          
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

      });

