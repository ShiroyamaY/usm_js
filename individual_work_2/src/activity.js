const url = 'https://www.boredapi.com/api/activity/';

async function getRandomActivity(){
    const json = await (await fetch(url)).json();
    
    if(!json.error) return json;
    
    throw Error(json.error);
    
}

async function updateActivity(){
    const activity  = document.querySelector('#activity');
    let randActivity;
    try{
        randActivity = await getRandomActivity();
    }catch(error){
        activity.innerHTML = "К сожалению, произошла ошибка";
        return;
    }
   
    activity.innerHTML = `
        <div class="activity activity-link">
            <span class="activity-text">Do activity:</span> ${randActivity.activity}</h3>
        </div>
        <div class="activity activity-type">
            <span class="activity-text">Type: </span>${randActivity.type}
        </div>
        <div class="activity activity-participants">
            <span class="activity-text">Participants: </span>${randActivity.participants}
        </div>
        <div class="activity activity-price">
            <span class="activity-text">Price: </span>${randActivity.price}
        </div>
        <div class="activity activity-accesibility">
            <span class="activity-text">Accesibility: </span>${randActivity.accessibility}
        </div>
    `;
}

function changeActivityAfter(time){
    setInterval(updateActivity,time);
}

export{
   getRandomActivity,
   updateActivity,
   changeActivityAfter,
}