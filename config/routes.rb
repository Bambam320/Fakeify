Rails.application.routes.draw do
  resources :artists
  resources :albums
  resources :songs
  resources :playlists
  resources :users
  get '/hello', to: 'application#hello_world'
#add routes here and more and more and more and more and more 
  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
