class AddSourceIdToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :source_id, :integer
  end
end
