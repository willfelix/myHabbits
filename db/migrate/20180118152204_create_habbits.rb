class CreateHabbits < ActiveRecord::Migration[5.0]
  def change
    create_table :habbits do |t|
      t.references :day, foreign_key: true
      t.references :hour, foreign_key: true
      t.string :title

      t.timestamps
    end
  end
end
