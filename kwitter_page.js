var firebaseConfig = {
      apiKey: "AIzaSyA424qgqxKPjXx6BP4cGRjoF81Hlt1umpw",
      authDomain: "kwitter-8ebb2.firebaseapp.com",
      databaseURL: "https://kwitter-8ebb2-default-rtdb.firebaseio.com",
      projectId: "kwitter-8ebb2",
      storageBucket: "kwitter-8ebb2.appspot.com",
      messagingSenderId: "359773574006",
      appId: "1:359773574006:web:0d1fe84f0a7af6077e6057"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function sent() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;

                        //Start code

                        console.log("msg id=" + firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];

                        name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updated_like(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;

                        //End code
                  }
            });
      });
}
getData();

function updated_like(message_id) {
      console.log("like_button_message id=" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log("updated likes=" + updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
