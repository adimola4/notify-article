class UpdateWorker
  include Sidekiq::Worker
  sidekiq_options queue: :medium_priority, retry: 3

  def perform
    RssUpdater.new.run
  end
end
