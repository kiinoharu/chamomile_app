Rails.application.routes.draw do
  get 'records/index'
  get 'records/create'
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  namespace :api do
    namespace :v1 do
      resources :records, only: [:index, :create, :show, :update] do
        collection do
          get 'find', to: 'records#show_by_date' # record_dateとuser_idで検索する独自のエンドポイント
          post :create_or_update # POST /api/v1/records/create_or_update
          get :last_period
        end
      end
      resources :announcements, only: [:index]
      resources :users, only: [:show, :update] do
        collection do
          get :me
        end
      end
    end
  end
end