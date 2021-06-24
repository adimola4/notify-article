class Article < ApplicationRecord
  belongs_to :source

  validates :title, presence: { base: "Title can't be blank!" }
  validates :title, length: { maximum: 255 }

  validates :original_url, presence: { base: "Url can't be blank!" }
  validates :original_url, length: { maximum: 255 }
  validates :original_url, uniqueness: true

  validates :source_id, presence: true

  after_save do |article|
    ActionCable.server.broadcast "articles", title: "New article!", body: {
      'articleId': article.id,
      'title': article.title,
      'description': article.description,
      'original_url': article.original_url,
      'image_url': article.image_url,
      'published_date': article.published_date,
      'sourceId': article.source.id,
      'source_title': article.source.title,
    }
  end
end
