class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :original_url
      t.string :description
      t.string :image_url
      
      t.timestamps
    end
  end
end
