Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'ping', to: 'test#ping'
    end
  end
end
