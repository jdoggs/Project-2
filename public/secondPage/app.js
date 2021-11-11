window.addEventListener('load',()=> {
    document.getElementById('button-water').addEventListener('click', ()=> {
        let Jugs = document.getElementById('number-glasses');
        let noJugs = Jugs.value;
        Jugs.value = "";

        console.log(noJugs);

        //creating the object 
        let obj = {"number" : noJugs};

        //stringify the object
        let jsonData = JSON.stringify(obj);

        //fetch to route noJugs
        fetch('/noJugs', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});

        //1. make a fetch request of type POST so that we can send the (noGlasses) info to the server
    })

    document.getElementById('get-count').addEventListener('click', ()=> {
        //get info on ALL the water we've had so far
        fetch('/getJugs')
        .then(resp=> resp.json())
        .then(data => {
            document.getElementById('water-info').innerHTML = '';
            console.log(data.data);
            for(let i=0;i<data.data.length;i++) {
                let string = data.data[i].date + " : " + data.data[i].water;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('water-info').appendChild(elt);
            }
        })
    })
})