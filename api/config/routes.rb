Rails.application.routes.draw do
  get 'records/index'
  get 'records/create'
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  namespace :api do
    namespace :v1 do
      resources :records, only: [:index, :show, :create]
    end
  end
end
