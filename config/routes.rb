Rails.application.routes.draw do
  get '/hello', to: 'application#hello_world'
#add routes here and more and more and more
  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
