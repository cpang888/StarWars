

      var counter = 0;
      // var right = 0;
      var wrong = 0;

      var characters = [
        {name: "Obi-Wan Kenobi", image: "0.PNG", points: 120, attackPower: 8, isChar: false, isEnemies: false, isDefender: false},
        {name: "Luke Skywalker", image: "1.PNG", points: 100, attackPower: 5, isChar: false, isEnemies: false, isDefender: false},
        {name: "Darth Sidious", image: "2.PNG", points: 150, attackPower: 15, isChar: false, isEnemies: false, isDefender: false},
        {name: "Darth Maul", image: "3.PNG", points: 180, attackPower: 25, isChar: false, isEnemies: false, isDefender: false}
      ];

      var enemiesArray = [];
      var charArray = [];
      

      function reset() {
        // counter = 0;
        
        
      }

      // function populateCharacterArray(elementId) {
      //   // counter = 0;
      //   // for(var i=0; i<characters.length; i++ ) {
      //   //   if(characters[i].isEnemies) {
      //   //     charArray.push(characters[i]);
      //   //   }

      //   // };
      //   // console.log("charArray array: " + charArray);
      //   populateEnemiesPanel(characters, elementId);
      // }

      function populateEnemiesArray(elementId) {
        // counter = 0;
        for(var i=0; i<characters.length; i++ ) {
          if(characters[i].isEnemies) {
            enemiesArray.push(characters[i]);
          }

        };
        console.log("enemies array: " + enemiesArray);
        populatePanel(enemiesArray, elementId);
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
            temp.addClass("starWarsChar");
            tr2.append(temp);
            temptable.append(tr2);

            var tr3 = $('<tr>');
            tr3.append('<td>' + tempArray[i].points + '</td>');
            temptable.append(tr3);

            // append results to table
            // $('#enemies').append(temptable);
            $(elementId).append(temptable);

            // charArray.push(tempArray[i]);

      }

    }
  var games = {

      
      start: function () {
        // get the 'right' selector. Returns a set of elements found in the DOM 'right'
        // this.$right = document.getElementById('right');
        // get the 'right' selector. Returns a set of elements found in the DOM 'wrong'
        this.$wrong = document.getElementById('wrong');

        this.$counter = document.getElementById('counter');

        reset();

      var crystals = $("#crystals");
 

      // Now for the hard part. Creating multiple crystals each with their own unique number value.

      // Next we create a for loop to create crystals for every numberOption.
      populatePanel(characters, "#crystals");
      // for (var i = 0; i < characters.length; i++) {

      //     var container = $('#my-container'),
      //     temptable = $('<table>');

      //     var tr = $('<tr>');
      //     tr.append('<td>' + characters[i].name + '</td>');
      //     temptable.append(tr);

      //     var tr2 = $('<tr>');
      //     var temp = $("<img>");
      //     temp.attr("src", "assets/images/" + characters[i].image);
      //     temp.attr("name", characters[i].name);
      //     temp.attr("points", characters[i].points);
      //     temp.attr("attackPower", characters[i].attackPower);
      //     temp.addClass("starWarsChar");
      //     tr2.append(temp);
      //     temptable.append(tr2);

      //     var tr3 = $('<tr>');
      //     tr3.append('<td>' + characters[i].points + '</td>');
      //     temptable.append(tr3);

      //     // append results to table
      //     $('#crystals').append(temptable);

      //     // charArray.push(characters[i]);

      // }

      // This time, our click event applies to every single crystal on the page. Not just one.
      crystals.on("click", ".starWarsChar", function() {

        console.log("name: " + $(this).attr("name"));
        console.log("points: " + $(this).attr("points"));
        console.log("attackPower: " + $(this).attr("attackPower"));

        for(var i=0; i<characters.length; i++ ) {
          if($(this).attr("name") == characters[i].name) {
            console.log("match " + $(this).attr("name"));
            characters[i].isChar = true;
          } else {
            console.log("set enemies flag to true... ");
            characters[i].isEnemies = true;
          }
          console.log(characters);
        };

        // for all the enemies char, move to different area
        populateEnemiesArray("#enemies");
        

        });
      },
      
  };

  $(document).ready(function() {
  
      games.start();

  });

