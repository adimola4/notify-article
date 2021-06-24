# frozen_string_literal: true

class Api::V1::SourcesController < ActionController::API
  require_relative("../../../services/source_initializer")

  def index
    @sources = Source.all

    @res = []
    @sources.each do |source|
      @articles = []
      source.articles.each do |article|
        p article.published_date
        @articles << {
          'articleId': article.id,
          'title': article.title,
          'description': article.description,
          'original_url': article.original_url,
          'image_url': article.image_url,
          'published_date': article.published_date,
          'sourceId': source.id,
          'source_title': source.title,
        }
      end
      @res << {
        'sourceId': source.id,
        'title': source.title,
        'website_url': source.website_url,
        'description': source.description,
        'image_url': source.image_url,
        'articles': @articles,
      }
    end
    render json: @res
  end

  def show
    @source = Source.find(params[:id])
    @res = []
    @articles = []
    @source.articles.each do |article|
      @articles << {
        'articleId': article.id,
        'title': article.title,
        'description': article.description,
        'original_url': article.original_url,
        'image_url': article.image_url,
        'published_date': article.published_date,
        'sourceId': @source.id,
      }
    end
    # ActionCable.server.broadcast "articles", { title: "New things!", body: @articles }
    @res << {
      'sourceId': source.id,
      'title': source.title,
      'website_url': source.website_url,
      'description': source.description,
      'image_url': source.image_url,
      'articles': @articles,
    }
    render json: @res
  end

  private

  def source_params
    params
      .require(:source)
      .permit(:website_url, :title, :description, :image_url)
  end
end
