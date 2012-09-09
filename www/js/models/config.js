var env = "production"
var api_url = function(path) {
  base = {
    "development": "api.ibarcraft.dev:8080",
    "production": "api.ibarcraft.com"
  }
  return "http://" + base[env] + "/" + path;
}

var ibarcraft_url = function(path) {
  base = {
    "development": "localhost:8080",
    "production": "ibarcraft.com"
  }
  return "http://" + base[env] + "/" + path;
}

var client_id = {
  "development": "3b6ba962a0eb0509cf26168f6cec12f2f0bd1c79b09280e344ae5a1d2d388039",
  "production": "253adc42d7e296b1a0c353912296bc71ae5498eed998d7ec81678ce142531bff"
}
client_id = client_id[env];
