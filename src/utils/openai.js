//  This is how openAI calls were set up in previous project
// Everthing will have to be checked when backend is setup

const urlstring = "http://127.0.0.1:8000/user/summary/";
const baseUrl = new URL(urlstring);

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const getEduContent = (data) => {
  baseUrl.searchParams.append("original_text", data);
  return fetch(baseUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};
