# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false, default: ""
      t.string :encrypted_password, null: false, default: ""
      t.integer :cycle

      t.timestamps null: false
    end
  end
end
