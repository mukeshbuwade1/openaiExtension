// Define the data source URL for the API
const API_URL = 'https://api.example.com/answer';

let url = "https://openai-app-mukesh.onrender.com/ai/v1/user/completions";

let options = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
}


// Function to fetch data from the API
async function fetchData(query) {
    // const response = await fetch(`${API_URL}?q=${query}`);
    // const data = await response.json();
    // return data.answer;

    let response = ""
    options.body = JSON.stringify({
        "question": query
    })
    await fetch(url, options).then(async (data) => {
        let a = await data.json()
        response = a
    }).catch(e => {
        console.log(e);
        response = e
    });
    return response
    // return " hey your extension is working fine"
}

// Function to insert answer into search results
function insertAnswer(answer) {
    const answerNode = document.createElement('div');
    answerNode.innerHTML = `<div style="width:336px" class="answer">${answer}</div>`
    const rhsView =  document.querySelector('#rhs');
   
    rhsView.insertBefore(answerNode, rhsView.firstChild)

    // const answerNode = document.createElement('div');
    // answerNode.innerHTML = `<div style="width:336px" class="answer">${answer}</div>`;
    // const searchResults = document.querySelector('#search');
    // const rhsView = document.querySelector('#rhs');
    // if (rhsView) {
    //     rhsView.insertBefore(answerNode, rhsView.firstChild)
    // } else {
    //     alert("rhs not found")
    // }
    // searchResults.insertBefore(answerNode, searchResults.firstChild);
}

// Function to extract query from the search results page
function extractQuery() {
    const searchInput = document.querySelector('input[name="q"]');
    return searchInput.value;
}

// Main function to fetch data and insert answer
async function main() {

    const query = extractQuery();
    const answer = await fetchData(query);
    if (answer?.error) {
        alert(answer?.message ?? "Something went wrong")
    } else {
        insertAnswer(answer?.data.answer[0].text)
    }

}

// Call the main function when the page has finished loading
main()
// window.addEventListener('load', main);
// alert("working")
