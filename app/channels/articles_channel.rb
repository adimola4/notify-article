class ArticlesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "articles"
  end

  def unsubscribed; end

  def receive(data)
    p data
  end
end
