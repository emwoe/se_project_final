import { baseUrl } from "./constants";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const getTopics = (token) => {
  return fetch(`${baseUrl}/topics`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const postTopic = (data, token) => {
  return fetch(`${baseUrl}/topics`, {
    method: "POST",
    body: JSON.stringify({
      _id: data._id,
      topic: data.topic,
      topicResponse: data.topicResponse,
      studyTips: data.studyTips,
    }),
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const deleteTopic = (id, token) => {
  return fetch(`${baseUrl}/topics/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
