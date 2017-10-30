function clearList(ul){
  while(ul.firstChild){
          ul.removeChild(ul.firstChild)
        }
}
function generateNumberClick() {
    let digits = document.getElementById("digits").value;


    let max = document.getElementById("max").value;
    
    let url = "https://griffis.edumedia.ca/mad9014/lotto/nums.php";
   // url += "?digits=" + digits+"&max=" + max; 
    
    let data = new FormData();
    data.append("digits", digits);
    data.append("max", max);
    
    
    
    let request = new Request(url, {"method": "Post", "body": data});
fetch(request)
    .then(function(response){
        return response.json();
})
    .then(function(jsonResponse){
    console.log(jsonResponse);
    if (jsonResponse.code !=0){
        alert(jsonResponse.message);
    }else {
        let ul = document.getElementById("num_list");
        clearList(ul);
        let myLotto = jsonResponse.numbers;
        myLotto.forEach(function(num){
            let li = document.createElement("li");
            li.textContent = num;
            ul.appendChild(li);
        })
    }
})
    .catch(function(error){
    
console.log(error);

});
    
  document.getElementById("home").classList.add("hidden");
document.getElementById("list").classList.remove("hidden");
    
}

document.getElementById("btnSend").addEventListener('click', generateNumberClick);

function reset() {
document.getElementById("list").classList.add("hidden");
document.getElementById("home").classList.remove("hidden");
}


document.getElementById("btnBack").addEventListener('click', reset);