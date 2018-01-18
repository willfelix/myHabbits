Rails.application.routes.draw do
	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

	root to: 'home#index'

	get 'schedules' => 'schedules#index'
	post 'schedules' => 'schedules#create'
	delete 'schedule/:id' => 'schedules#destroy', :as => :schedule

end
