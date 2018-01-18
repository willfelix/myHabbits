class HabitsController < ApplicationController

	def index
		@days = Day.all
	end

end
