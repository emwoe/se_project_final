const urlstring =
    process.env.NODE_ENV === 'production'
        ? 'https://api.studyhelper.crabdance.com'
        : 'http://localhost:3001'

const baseUrl = new URL(urlstring)

export function checkResponse(res) {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Error: ${res.status}`)
    }
}

export async function fetchTopicDataFromBackend(userTopic) {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: userTopic }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)
        return {
            topic: userTopic,
            topicResponse: data.topicInformation,
            studyTips: data.studyTips,
        }
    } catch (error) {
        console.error('Error fetching data on topic:', error)
    }
}
