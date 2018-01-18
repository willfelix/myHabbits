module ApplicationHelper

	def is_current_menu_active?(menu)
		'mdc-list-item--selected' if menu == controller_name
	end

end
