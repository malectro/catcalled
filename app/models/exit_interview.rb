class ExitInterview
  include Mongoid::Document

  belongs_to :participant

  field :text, type: String, default: ''

  def text_html
    text.gsub("\n", "<br />")
  end
end
