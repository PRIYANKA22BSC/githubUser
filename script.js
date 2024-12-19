const apiurl = "https://api.github.com/users/";

const getuser = async (username) => {
    try {
        const response = await fetch(apiurl + username);
        if (!response.ok) throw new Error(`User not found: ${response.status}`);
        const data = await response.json();

        document.getElementById("left").innerHTML = `
            <img src="${data.avatar_url}" alt="Profile">
            <h3>${data.name || "N/A"}</h3>
            <p>${data.bio || "No bio available."}</p>
            <p><b>Location:</b> ${data.location || "Unknown"}</p>
            <p><b>Followers:</b> ${data.followers}</p>
            <p><b>Following:</b> ${data.following}</p>
        `;

        document.getElementById("mid").innerHTML = `
            <h2>Repositories</h2>
            <p><b>Total Repos:</b> ${data.public_repos}</p>
            <div id="repoList">Loading repositories...</div>
        `;

        const reposResponse = await fetch(data.repos_url);
        const reposData = await reposResponse.json();
        document.getElementById("repoList").innerHTML = reposData.slice(0, 5).map(
            repo => `<p><a href="${repo.html_url}" target="_blank">${repo.name}</a></p>`
        ).join("");

        document.getElementById("right").innerHTML = `
            <h2>Additional Info</h2>
            <p><b>Profile:</b> <a href="${data.html_url}" target="_blank">View Profile</a></p>
            <p><b>Type:</b> ${data.type}</p>
            <p><b>Created At:</b> ${new Date(data.created_at).toLocaleString()}</p>
            <p><b>Updated At:</b> ${new Date(data.updated_at).toLocaleString()}</p>
        `;
    } catch (error) {
        alert("Error fetching user. Please check the username.");
    }
};

const searchFunction = () => {
    const username = document.getElementById("searchInput").value.trim();
    if (username) getuser(username);
    else alert("Please enter a GitHub username.");
};
