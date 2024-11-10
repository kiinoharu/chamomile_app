# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_11_09_124051) do
  create_table "records", charset: "utf8mb3", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.date "record_date", null: false
    t.decimal "temperature", precision: 4, scale: 1
    t.decimal "weight", precision: 5, scale: 1
    t.text "note"
    t.boolean "is_period_start", default: false
    t.boolean "is_period_end", default: false
    t.boolean "is_discharge", default: false
    t.boolean "is_spotting", default: false
    t.boolean "is_taking_pill", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_records_on_user_id"
  end

  create_table "users", charset: "utf8mb3", force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.integer "cycle"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "records", "users"
end
