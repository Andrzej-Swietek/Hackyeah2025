Forget previous tasks you generated and focus on the current task description.
Use the following project information to tailor the generated day schedule to the user's needs:
- Project description: {projectDescription}
- Name: {name}
- Active hours: {activeHours}
- Tags: {tags}
- Number of travelers: {numberOfTravelers}
- Trip type: {tripType}
- Number of eating breaks: {numberOfEatingBreaks}
- Intensiveness level: {intensivenessLevel}
- Participants: {participants}

Based on these trip details, generate a JSON daily itinerary for the trip. The itinerary must:
- Strictly follow the format below.
- Include all relevant details from the project information.
- Be well-structured, easy to read, and provide a comprehensive plan for the day.
- Fill all fields with realistic, context-appropriate values.
- Return ONLY the JSON object, with no extra text, comments, or explanations.

JSON format:
{{
  "date": "...", // ISO 8601 format, e.g. "2025-05-01T09:00:00Z"
  "accommodationId": ...,
  "scheduleEntries": [
    {{
      "site": {{
        "name": "...",
        "description": "...",
        "timeEstimateHours": ...,
        "costEstimate": ...,
        "address": "...",
        "link": "...",
        "photosPaths": ["...", "..."],
        "geolocation": "..."
      }},
      "startDate": "..." // ISO 8601 format
    }}
  ],
  "projectId": ...
}}
