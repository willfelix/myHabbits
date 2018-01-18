class HomeController < ApplicationController

	def index
		@days = Day.all
		@hours = Hour.all
	end

	def all
	end

	def destroy
	end

	def update
	end

	def create
		@schedule = Habbit.new(schedule_params)

		respond_to do |format|
			if @palestrante.save
				format.html { redirect_to palestrante_url(@palestrante), notice: 'Palestrante cadastrado. Equipe RH Aberto agradece :)' }
				format.json { render :show, status: :created, location: @palestrante }
			else
				format.html { render :index }
				format.json { render json: @palestrante.errors, status: :unprocessable_entity }
			end
		end
	end

	private

	def schedule_params
		params[:schedule].permit!
	end

end
