

      // var counter = 0;
      // var right = 0;
      // var wrong = 0;

      var characters = [
        {name: "Obi-Wan Kenobi", image: "0.PNG", points: 120, attackPower: 8, isChar: false, isEnemies: false, isDefender: false},
        {name: "Luke Skywalker", image: "1.PNG", points: 100, attackPower: 5, isChar: false, isEnemies: false, isDefender: false},
        {name: "Darth Sidious", image: "2.PNG", points: 150, attackPower: 15, isChar: false, isEnemies: false, isDefender: false},
        {name: "Darth Maul", image: "3.PNG", points: 180, attackPower: 25, isChar: false, isEnemies: false, isDefender: false}
      ];

      var enemiesArray = [];
      var charArray = [];
      var defenderArray = [];
      
      var bChar = false;
      var bDefender = false;

      function reset() {
        
        
      }

      function populateCharArray() {
        for(var i=0; i<characters.length; i++ ) {
          if(characters[i].isChar) {
            charArray.push(characters[i]);
          }

        };
        $("#crystals").empty();
        console.log("charArray: " + charArray);
        populatePanel(charArray, "#crystals");
      }

      function populateEnemiesArray() {
        for(var i=0; i<characters.length; i++ ) {
          if(characters[i].isEnemies) {
            enemiesArray.push(characters[i]);
          }

        };
        $("#enemies").empty();
        console.log("enemies array: " + enemiesArray);
        // populatePanel(enemiesArray, "#enemies");
        populateEnemeriesPanel();
      }

      function populateDefenderPanel() {
        $("#defender").empty();
        populateEnemeriesPanel();

        for (var i = 0; i < characters.length; i++) {
          
          if(characters[i].isDefender) {
            var container = $('#my-container'),
            temptable = $('<table>');

            var tr = $('<tr>');
            tr.append('<td>' + characters[i].name + '</td>');
            temptable.append(tr);

            var tr2 = $('<tr>');
            var temp = $("<img>");
            temp.attr("src", "assets/images/" + characters[i].image);
            temp.attr("name", characters[i].name);
            temp.attr("points", characters[i].points);
            temp.attr("attackPower", characters[i].attackPower);
            temp.addClass("starWarsChar");
            temp.addClass("defenderBkgColor");
            tr2.append(temp);
            temptable.append(tr2);

            var tr3 = $('<tr>');
            tr3.append('<td>' + characters[i].points + '</td>');
            temptable.append(tr3);

            $("#defender").append(temptable);
          }

    }

  } 

  function createTable() {
    // var container = $('#my-container'),
    // temptable = $('<table>');

    // var tr = $('<tr>');
    // tr.append('<td>' + characters[i].name + '</td>');
    // temptable.append(tr);

    // var tr2 = $('<tr>');
    // var temp = $("<img>");
    // temp.attr("src", "assets/images/" + characters[i].image);
    // temp.attr("name", characters[i].name);
    // temp.attr("points", characters[i].points);
    // temp.attr("attackPower", characters[i].attackPower);
    // temp.attr("isChar", characters[i].isChar);
    // temp.attr("isEnemies", characters[i].isEnemies);
    // temp.attr("isDefender", characters[i].isDefender);
    // temp.addClass("starWarsChar");
    // temp.addClass("enemiesBkgColor");
    // tr2.append(temp);
    // temptable.append(tr2);

    // var tr3 = $('<tr>');
    // tr3.append('<td>' + characters[i].points + '</td>');
    // temptable.append(tr3);
  }

  function populateEnemeriesPanel() {
    $("#enemies").empty();

    for (var i = 0; i < characters.length; i++) {
      
      if(characters[i].isEnemies) {

            var container = $('#my-container'),
            temptable = $('<table>');

            var tr = $('<tr>');
            tr.append('<td>' + characters[i].name + '</td>');
            temptable.append(tr);

            var tr2 = $('<tr>');
            var temp = $("<img>");
            temp.attr("src", "assets/images/" + characters[i].image);
            temp.attr("name", characters[i].name);
            temp.attr("points", characters[i].points);
            temp.attr("attackPower", characters[i].attackPower);
            temp.attr("isChar", characters[i].isChar);
            temp.attr("isEnemies", characters[i].isEnemies);
            temp.attr("isDefender", characters[i].isDefender);
            temp.addClass("starWarsChar");
            temp.addClass("enemiesBkgColor");
            tr2.append(temp);
            temptable.append(tr2);

            var tr3 = $('<tr>');
            tr3.append('<td>' + characters[i].points + '</td>');
            temptable.append(tr3);

            var enemiesFlag = characters[i].isEnemies;

            // append results to table
            $("#enemies").append(temptable);

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

      function populatePanel(tempArray, elementId) {
          for (var i = 0; i < tempArray.length; i++) {
            
            var container = $('#my-container'),
            temptable = $('<table>');

            var tr = $('<tr>');
            tr.append('<td>' + tempArray[i].name + '</td>');
            temptable.append(tr);

            var tr2 = $('<tr>');
            var temp = $("<img>");
            temp.attr("src", "assets/images/" + tempArray[i].image);
            temp.attr("name", tempArray[i].name);
            temp.attr("points", tempArray[i].points);
            temp.attr("attackPower", tempArray[i].attackPower);
            temp.attr("isChar", tempArray[i].isChar);
            temp.attr("isEnemies", tempArray[i].isEnemies);
            temp.attr("isDefender", tempArray[i].isDefender);
            temp.addClass("starWarsChar");
            temp.addClass("charBkgColor");
            tr2.append(temp);
            temptable.append(tr2);

            var tr3 = $('<tr>');
            tr3.append('<td>' + tempArray[i].points + '</td>');
            temptable.append(tr3);

            var enemiesFlag = tempArray[i].isEnemies;
            var defenderFlag = tempArray[i].isDefender;

            console.log("tempArray : " + tempArray[i]);

            // append results to table
            $(elementId).append(temptable);

            $(elementId).on("click", ".starWarsChar", function() {

              if($(this).attr("isDefender") == true) {
                populateDefenderPanel();
              }
              if($(this).attr("isEnemeries") == true) {
                populateEnemeriesPanel();
              }


            });

      }

    }
  var games = {

      
      start: function () {
        // get the 'right' selector. Returns a set of elements found in the DOM 'right'
        // this.$right = document.getElementById('right');
        // get the 'right' selector. Returns a set of elements found in the DOM 'wrong'
        // this.$wrong = document.getElementById('wrong');

        // this.$counter = document.getElementById('counter');

        reset();

      var crystals = $("#crystals");
 

      // Now for the hard part. Creating multiple crystals each with their own unique number value.

      // Next we create a for loop to create crystals for every numberOption.
      populatePanel(characters, "#crystals");

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

        populateEnemeriesPanel();
        // populatePanel(characters, "#enemies");
        populateCharArray();
        

        });
      },
      
  };

  $(document).ready(function() {
  
      games.start();

  });

