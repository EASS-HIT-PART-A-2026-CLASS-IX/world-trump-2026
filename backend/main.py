from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI(title="World Cup 2026 API", version="1.0.0")

@app.get("/odds")
def get_odds():
    return load_json("odds.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")


def load_json(filename):
    with open(os.path.join(DATA_DIR, filename)) as f:
        return json.load(f)


teams_data = load_json("teams.json")
venues_data = load_json("venues.json")
matches_data = load_json("matches.json")
usa250_data = load_json("usa250.json")


@app.get("/")
def root():
    return {
        "name": "World Cup 2026 USA API",
        "version": "1.0.0",
        "endpoints": [
            "/teams", "/teams/{id}",
            "/venues", "/venues/{id}",
            "/matches", "/matches/{id}", "/matches/group/{group}",
            "/standings", "/bracket",
            "/usa250", "/trump-quotes"
        ]
    }


@app.get("/teams")
def get_teams():
    return {"count": len(teams_data), "teams": teams_data}


@app.get("/teams/{team_id}")
def get_team(team_id: int):
    team = next((t for t in teams_data if t["id"] == team_id), None)
    if not team:
        return {"error": "Team not found"}, 404
    return team


@app.get("/venues")
def get_venues():
    return {"count": len(venues_data), "venues": venues_data}


@app.get("/venues/{venue_id}")
def get_venue(venue_id: int):
    venue = next((v for v in venues_data if v["id"] == venue_id), None)
    if not venue:
        return {"error": "Venue not found"}, 404
    return venue


@app.get("/matches")
def get_matches(stage: str = None):
    if stage:
        filtered = [m for m in matches_data if m["stage"].lower().startswith(stage.lower())]
        return {"count": len(filtered), "matches": filtered}
    return {"count": len(matches_data), "matches": matches_data}


@app.get("/matches/{match_id}")
def get_match(match_id: int):
    match = next((m for m in matches_data if m["id"] == match_id), None)
    if not match:
        return {"error": "Match not found"}, 404
    return match


@app.get("/matches/group/{group}")
def get_group_matches(group: str):
    filtered = [m for m in matches_data if m.get("group", "").upper().startswith(group.upper())]
    return {"count": len(filtered), "matches": filtered}


@app.get("/standings")
def get_standings():
    groups = {}
    for team in teams_data:
        g = team["group"]
        if g not in groups:
            groups[g] = []
        groups[g].append({
            "id": team["id"],
            "name": team["name"],
            "fifa_code": team["fifa_code"],
            "flag": team["flag"],
            "mp": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "gd": 0, "pts": 0
        })
    result = []
    for group_name in sorted(groups.keys()):
        result.append({"group": group_name, "teams": sorted(groups[group_name], key=lambda t: t["name"])})
    return {"groups": result}


@app.get("/bracket")
def get_bracket():
    knockout_stages = ["Round of 32", "Round of 16", "Quarterfinal", "Semifinal", "Third Place", "Final"]
    bracket = {}
    for stage in knockout_stages:
        bracket[stage] = [m for m in matches_data if m["stage"] == stage]
    return bracket


@app.get("/usa250")
def get_usa250():
    return usa250_data


@app.get("/trump-quotes")
def get_trump_quotes():
    return {"quotes": usa250_data["trump_facts"]}


@app.get("/health")
def health():
    return {"status": "ok"}
