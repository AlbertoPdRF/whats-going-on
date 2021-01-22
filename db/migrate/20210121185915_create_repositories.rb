class CreateRepositories < ActiveRecord::Migration[6.1]
  def change
    create_table :repositories do |t|
      t.references :user, null: false, foreign_key: true
      t.string :owner, null: false, default: ""
      t.string :repo, null: false, default: ""
      t.string :url, null: false, default: ""

      t.timestamps
    end
  end
end
