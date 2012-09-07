var env = "development"
var api_url = function(path) {
  base = ""
  if (env == "development") {
    base = "api.ibarcraft.dev:8080"
  } else {
    base = "api.ibarcraft.com"
  }
  return "http://" + base + "/" + path;
}

var ibarcraft_url = function(path) {
  base = ""
  if (env == "development") {
    base = "localhost:8080"
  } else {
    base = "ibarcraft.com"
  }
  return "http://" + base + "/" + path;
}

var client_id = ""
if (env == "development") {
  client_id = "3b6ba962a0eb0509cf26168f6cec12f2f0bd1c79b09280e344ae5a1d2d388039"
} else {
  client_id = "253adc42d7e296b1a0c353912296bc71ae5498eed998d7ec81678ce142531bff"
}
