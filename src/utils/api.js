import { baseUrl } from "./constants";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const getTopics = () => {
  return fetch(`${baseUrl}/topics`).then(checkResponse);
};

export const postTopic = (data, token) => {
  return fetch(`${baseUrl}/topics`, {
    method: "POST",
    body: JSON.stringify({
      _id: data._id,
      topic: data.userTopic,
      topicResponse: data.topicResponse,
    }),
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
