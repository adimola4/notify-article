class SourceInitializer
  def initialize(source)
    @source = source
    @doc = ""
  end

  def run
    @doc = DocParser.new(@source.website_url).run
    channel = @doc.search("channel")
    desc = channel.xpath("description").inner_html.to_s.strip
    if desc == ""
      desc = "0"
    end

    img = channel.search("image").xpath("url").inner_html.to_s.strip
    if img == ""
      img = "none"
    end
    @source.attributes = {
      title: channel.xpath("title").inner_html.to_s.strip || channel.search("image").xpath("title").inner_html.to_s.strip || channel.search("media").xpath("title").inner_html.to_s.strip || "N/A",
      description: desc,
      image_url: img,
    }

    @source
  end
end
