//  This is how openAI calls were set up in previous project
// Everthing will have to be checked when backend is setup

const urlstring = "http://localhost:3001/api/query";
const baseUrl = new URL(urlstring);

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export async function fetchTopicDataFromBackend(userTopic) {
  try {
    const response = await fetch("http://localhost:3001/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: userTopic }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.topicResponse);
    return data.topicResponse;
  } catch (error) {
    console.error("Error fetching data on topic:", error);
  }
}
