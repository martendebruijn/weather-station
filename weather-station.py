from dotenv import load_dotenv
import os
import json
import time
import requests

load_dotenv()

api_key = os.getenv("API_KEY")
city = os.getenv("CITY")
latitude = os.getenv("LATITUDE")
longitude = os.getenv("LONGITUDE")

units = "metric"
output_file = "weather_data.json"


def get_weather_data():
    api_url = f"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={api_key}&units={units}"

    try:
        response = requests.get(api_url)
        data = response.json()

        if data["cod"] == 200:
            weather_info = {"city": city, "temperature": data["main"]["temp"]}

            with open(output_file, "w") as file:
                json.dump(weather_info, file, indent=4)
                file.write("\n")

            print(f"Saved weather: {weather_info}")
        else:
            print("Error with fetching weather data")
    except Exception:
        print("Something went wrong...")


if __name__ == "__main__":
    while True:
        get_weather_data()
        time.sleep(900)
