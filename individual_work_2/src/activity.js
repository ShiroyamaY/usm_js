const url = 'https://www.boredapi.com/api/activity/';
/**
 * Fetches a random activity from a specified API endpoint.
 * @returns {Promise<Object>} A promise that resolves with the random activity object.
 * @throws {Error} If there is an error fetching or parsing the activity data.
 */
async function getRandomActivity(){
    const json = await (await fetch(url)).json();
    
    if(!json.error) return json;
    
    throw Error(json.error);
    
}
/**
 * Updates the HTML content with details of a random activity.
 * If an error occurs during fetching or updating, an error message is displayed in the HTML.
 * @returns {Promise<void>} A promise that resolves once the activity is updated in the DOM.
 */
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
/**
 * Sets an interval to update the activity details periodically.
 * @param {number} time - The interval time in milliseconds.
 */
function changeActivityEvery(time){
    setInterval(updateActivity,time);
}

export{
   getRandomActivity,
   updateActivity,
   changeActivityEvery,
}