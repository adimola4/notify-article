class RssUpdater
  def initialize
    @feeds = Source.all
  end

  def run
    @feeds.each do |feed|
      if feed.id?
        FetchWorker.perform_async(feed.id)
      else
        logger.info "not found: " + feed.to_s
      end
    end
  end
end
