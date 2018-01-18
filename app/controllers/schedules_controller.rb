class SchedulesController < ApplicationController

	def index
		@habits = Habit.all
	end

	def create
		@habbit = Habbit.new(title: params[:reminder])
		@habbit.day = Day.where(name: params[:day]).first
		@habbit.hour = Hour.where(hour: params[:hour]).first

		if @habbit.save
			head :ok
		else
			puts @habbit.errors.full_messages
			head :error
		end
	end

	def destroy
		Habbit.destroy params[:id]
		head :ok
	end

end
