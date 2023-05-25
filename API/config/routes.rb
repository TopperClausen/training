Rails.application.routes.draw do
  post '/login', to: 'users#login'
  resources :users, only: [:create]
end
