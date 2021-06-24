class CreateSources < ActiveRecord::Migration[6.1]
  def change
    create_table :sources do |t|
      t.string :title
      t.string :website_url
      t.text :description      
      t.string :image_url
      t.timestamps
    end
  end
end
