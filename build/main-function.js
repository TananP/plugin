/**
 * Created by tanan_puengjesada on 24/10/2019 AD.
 */

function openPopUp(id) {
    // console.log("Data ==== " + allData);
    // document.getElementById("popUpContent").innerHTML = `<div><p>Now loading....</p></div>`;
//     var db = firebase.firestore();
//     var docRef = db.collection("Test").doc("100");
//     var allData = {};
//
//     docRef.get().then(function(doc) {
//
//         if (doc.exists) {
//             allData = doc.data();
//             // renderData(allData,id);
//             switch (id) {
//                 case 'tank':
//                     let data = `<div><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p>
// <p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p>
// <p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p>
// <p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p>
// <p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p><p>Tank</p></div>`;
//                     document.getElementById("popUpContent").innerHTML = data ;
//                     break;
//                 case 'valve':
//                     let data1 = `<div><div><p>Valve</p></div></div>`;
//                     document.getElementById("popUpContent").innerHTML = data1 ;
//                     break;
//                 case 'summary':
//                     let data2 = `<div class="pop-up-content"><div><p>Summary</p></div></div>`;
//                     document.getElementById("popUpContent").innerHTML = data2 ;
//                     break;
//             }
//             console.log("Document data:", doc.data());
//         } else {
//             console.log("No such document!");
//         }
//     }).catch(function(error) {
//         console.log("Error getting document:", error);
//     });

    // document.getElementById("popUp").innerHTML = `<button onclick="closePopUp()" class="close-button">&times;</button>
    //             <test-test popUp="tank"></test-test>`;
    document.getElementById("popUp").style.display = "block";

    console.log("Data0 ===== " + localStorage.getItem("key"));
}

function closePopUp() {
    document.getElementById("popUp").style.display = "none";
}

