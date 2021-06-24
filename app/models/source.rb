class Source < ApplicationRecord
  has_many :articles, dependent: :destroy

  validates :title, presence: { base: "Title can't be blank!" }
  validates :title, length: { maximum: 255 }
  validates :website_url, presence: { base: "Url can't be blank!" }
  validates :website_url, length: { maximum: 255 }
  validates :website_url, uniqueness: true

  after_create do |source|
    FetchWorker.perform_async(source.id)
  end

  def get_source_full_details
    source = SourceInitializer.new(url).run
  end

  def self.get_feed(source)
    return if source.nil?

    @articles = RssFetcher.new(source).run

    @articles.each do |article|
      found_article = Article.where("source_id = ? and original_url = ? and published_date = ?", source.id, article["original_url"], article["published_date"].to_time)

      next unless found_article.empty?

      new_article = Article.new(title: article["title"], published_date: article["published_date"].to_time,
                                original_url: article["original_url"], description: article["description"],
                                image_url: article["image_url"], source_id: source.id)
      if new_article.save
        source.articles << new_article
      else
        p new_article.errors
      end
    end
  end
end
