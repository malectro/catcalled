class About
  include Mongoid::Document

  field :short, type: String
  field :long, type: String

  def short_html
    short.gsub("\n", "<br />")
  end

  def long_html
    long.gsub("\n", "<br />")
  end
end
