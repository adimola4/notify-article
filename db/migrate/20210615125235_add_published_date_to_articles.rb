class AddPublishedDateToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :published_date, :date
  end
end