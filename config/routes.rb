Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  require "sidekiq/web"
  mount Sidekiq::Web => "/sidekiq"

  mount ActionCable.server => "/cable"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get "/sources", to: "sources#index"
      get "/sources/:id", to: "sources#show"
    end
  end
end
