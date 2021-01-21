# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :provider, null: false, default: ""
      t.string :uid, null: false, default: ""
      t.string :email, null: false, default: ""
      t.string :avatar, null: false, default: ""
      t.string :username, null: false, default: ""

      t.timestamps null: false
    end
  end
end
