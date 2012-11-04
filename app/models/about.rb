class About
  include Mongoid::Document

  field :short, type: String
  field :long, type: String
  field :tumblr, type: Boolean
  field :tumblr_post_id, type: String

  def short_html
    short.gsub("\n", "<br />")
  end

  def long_html
    long.gsub("\n", "<br />")
  end
end
