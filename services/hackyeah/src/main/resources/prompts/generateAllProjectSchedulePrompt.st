Forget previous tasks you generated and focus on the current task description.
Use the following project information to tailor the generated schedule to the user's needs:
- Project description: {projectDescription}
- Name: {name}
- Active hours: {activeHours}
- Tags: {tags}
- Number of travelers: {numberOfTravelers}
- Trip type: {tripType}
- Number of eating breaks: {numberOfEatingBreaks}
- Intensiveness level: {intensivenessLevel}
- Participants: {participants}
Based on these trip details, generate a JSON array representing the full itinerary for the project. The array must:
- Contain a separate object for each day of the trip.
- Strictly follow the format below for each day.
- Include all relevant details from the project information.
- Be well-structured, easy to read, and provide a comprehensive plan for each day.
- Fill all fields with realistic, context-appropriate values.
- Return ONLY the JSON array, with no extra text, comments, or explanations.
JSON array format:
[
  {{
    "date": "...",
    "accommodationId": ...,
    "scheduleEntries": [
      {{
        "site": {{
          "name": "...",
          "description": "...",
          "timeEstimateHours": ...,
          "costEstimate": ...,
          "address": {{
            "street": "...",
            "city": "...",
            "country": "..."
          }},
          "link": "...",
          "photosPaths": [
            "..."
          ],
          "geolocation": {{
            "latitude": ...,
            "longitude": ...
          }}
        }},
        "startDate": "..." // date + time in ISO 8601 format
      }}
    ],
    "projectId": ...
  }}
  // ... more day objects
]
