class CreateRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :records do |t|
      t.references :user, null: false, foreign_key: true
      t.date :record_date, null: false
      t.decimal :temperature, precision: 4, scale: 1
      t.decimal :weight, precision: 5, scale: 1
      t.text :note
      t.boolean :is_period_start, default: false
      t.boolean :is_period_end, default: false
      t.boolean :is_discharge, default: false
      t.boolean :is_spotting, default: false
      t.boolean :is_taking_pill, default: false

      t.timestamps
    end
  end
end
