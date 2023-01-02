Rails.application.routes.draw do
  resources :artists
  resources :albums
  resources :songs
  resources :playlists
  resources :users
  get '/hello', to: 'application#hello_world'

  get "spotify_api/search", to: "spotify_api#search"
  get "spotify_api/audio-analysis", to: "spotify_api#audio_analysis"
  get "spotify_api/recommendations", to: "spotify_api#recommendations"
  get "spotify_api/audio-features", to: "spotify_api#audio_features"
  get "spotify_api/connect", to: "spotify_api#connect"
  get "spotify_api/get_user_token", to: 'spotify_api#get_user_token'
  get "callback", to: "spotify_api#callback"

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
