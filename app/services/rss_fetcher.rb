class RssFetcher
  def initialize(source)
    @source = source
    @doc = ""
  end

  def run
    @doc = DocParser.new(@source.website_url).run

    path = ["item link", "item guid", "entry link[rel=alternate]", "entry link"].detect do |tpath|
      @doc.at(tpath)
    end
    return nil unless path

    node = @doc.at(path)
    article_url = (node.inner_html.presence || node["href"]).to_s.strip
    @feed = []
    i = 1
    @doc.css("item").each do |item|
      url = ""
      if item.xpath("guid").to_s["isPermaLink"] == "isPermaLink" || !item.xpath("guid").nil?

        url = item.xpath("guid").inner_html.to_s.strip
        unless url.include?("http")

          url = item.xpath("link").inner_html.to_s.strip
        end
      else

        url = item.xpath("link").inner_html.to_s.strip
      end
      title = item.xpath("title").inner_html.to_s.strip
      details = get_more_details_from_url(url)
      if title == ""
        title = details["title"]
      end
      image = ""
      begin
        image = item.xpath("media").to_s["url"] || details["image"]
      rescue StandardError => e
        image = details["image"]
      end

      date = item.xpath("pubDate", "published_date", "pubdate").inner_html.to_time
      @feed << {
        "title" => item.xpath("title").inner_html.to_s.strip,
        "description" => item.xpath("description").inner_html.to_s.strip,
        "original_url" => url,
        "published_date" => date,
        "image_url" => image,
      }
    end
    @feed
   end

  def get_more_details_from_url(url)
    @doco = DocParser.new(url).run
    details = { "title" => "", "image" => "" }
    @doco.search("meta").css("meta").each do |item|
      if item.to_s["twitter:title"] == "twitter:title" || item.to_s["og:title"] == "og:title"
        details["title"] = item["content"]
      end
      if item["content"].nil? == false && (item["content"].include? "https://") && (item.to_s["twitter:image"] == "twitter:image" || item.to_s["og:image"] == "og:image")
        details["image"] = item["content"]
      end
    end
    details
  end
end
