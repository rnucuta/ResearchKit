window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const clickData = urlParams.get('input');
    let api_key="";


    await fetch('https://3hi4qz2p1m.execute-api.us-east-2.amazonaws.com/final_chatgpt_api', {
			method: 'post',
		})
		.then(response => response.text())
		.then(data => {
			api_key=String(JSON.parse(data).message);
			//use keys
		});

    let allowed=true;
    fetch('https://api.openai.com/v1/moderations', {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+api_key
        },
        body: JSON.stringify({
            "input": ""+decodeURI(clickData)
        })
    }).then(function (response) {   
    // The API call was successful!
        return response.json();
    }).then(function (data) {
        // This is the JSON from our response
        if(data.results[0].flagged){
            allowed=false;
            document.getElementById("links").innerHTML = "This content was flagged by moderation policy.";
        }
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });

    document.getElementById("input").innerHTML = "Explain " + "'" + decodeURI(clickData) + "'";
    
    if (allowed){
        fetch('https://api.openai.com/v1/chat/completions', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+api_key
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": "Give me the top ten website links to learn about " + "'" + decodeURI(clickData) + "' with HTML <ol> and <a> tags"}]
            })
        }).then(function (response) {   
        // The API call was successful!
            return response.json();
        }).then(function (data) {
            // This is the JSON from our response
            //console.log(data.choices[0].message.content);
            document.getElementById("links").innerHTML = data.choices[0].message.content;
        }).catch(function (err) {
            // There was an error
            document.getElementById("links").innerHTML = "There was an error";
            console.warn('Something went wrong.', err);
        });



        fetch('https://api.openai.com/v1/chat/completions', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+api_key
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": "Explain or tell me what is " + "'" + decodeURI(clickData) + "'"}]
            })
        }).then(function (response) {
        // The API call was successful!
            return response.json();
        }).then(function (data) {
            // This is the JSON from our response
            //console.log(data.choices[0].message.content);
            document.getElementById("result").innerHTML = data.choices[0].message.content;
        }).catch(function (err) {
            // There was an error
            document.getElementById("result").innerHTML = "There was an error";
            console.warn('Something went wrong.', err);
        });
    }
}