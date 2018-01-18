class Day < ApplicationRecord
	has_many :habbits

	def habbits_by_hour(hour)
		habbits.where(hour: hour)
	end
end
