class HomeController < ApplicationController

	def index
		@days = Day.all
		@hours = Hour.all
	end

end
