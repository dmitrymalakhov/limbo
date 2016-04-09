Skills::Application.routes.draw do
  match 'cities' => 'application#cities'

  root :to => 'application#index'
end
