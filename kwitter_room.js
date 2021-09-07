
// Your web app's Firebase configuration
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
document.getElementById("user_name").innerHTML="Welcome "+user_name+"!";

function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room_name"
      });
      console.log("room name id added");
      document.getElementById("room_name").value="";
      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("room_name="+Room_names);
                  row = "<div class='room_name' id="+Room_names+" onclick = 'redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
                  document.getElementById("output").innerHTML += row;

                  //End code
            });
      });
}
getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location = "kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}