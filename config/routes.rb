Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks' }

  devise_scope :user do
    get 'sign-in', to: 'devise/sessions#new', as: :new_user_session
    get 'sign-out', to: 'devise/sessions#destroy', as: :destroy_user_session
  end

  resources :repositories

  root 'events#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
