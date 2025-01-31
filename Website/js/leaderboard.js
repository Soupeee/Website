window.onload = function(){
    fetch('path/to/your/leaderboard.json') // Replace with your JSON file path
        .then(response => response.json())
        .then(data => {
            const leaderboardList = document.getElementById("leaderboard-list");
            data.forEach((player) => {
                const playerElem = document.createElement("p");
                playerElem.textContent = `${player.name} - ${player.points} points`;
                leaderboardList.appendChild(playerElem);
            });
        })
        .catch(error => {
            console.error('Error fetching leaderboard data:', error);
        });
}