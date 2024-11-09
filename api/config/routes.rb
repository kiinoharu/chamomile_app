Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      get 'ping', to: 'test#ping'
    end
  end
end
